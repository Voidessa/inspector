
"""Main bot application."""
from telethon import events
import os
from src.config import Config
from src.telegram_client import TelegramClientWrapper
from src.ai.groq_client import GroqClient
from src.ai.image_generator import ImageGenerator
from src.ai.web_search import WebSearch
from src.ai.intent_analyzer import IntentAnalyzer
from src.commands.base import CommandRegistry
from src.commands.help import HelpCommand
from src.commands.research import ResearchCommand
from src.commands.generate_image import GenerateImageCommand
from src.commands.create_post import CreatePostCommand
from src.commands.publish import PublishCommand
from src.commands.kit import KitCommand
from src.utils.logger import logger

class ContentAgentBot:
    """Main bot class."""
    
    def __init__(self):
        """Initialize the bot."""
        logger.info("Initializing Content Agent Bot...")
        
        # Initialize components
        self.config = Config()
        self.telegram = TelegramClientWrapper()
        self.groq = GroqClient()
        self.image_gen = ImageGenerator()
        self.web_search = WebSearch(self.groq)
        self.intent_analyzer = IntentAnalyzer(self.groq)
        self.kit = self.intent_analyzer.kit
        self.commands = CommandRegistry()
        
        # Will be set after telegram client starts
        self.my_id = None

        # Register commands
        self._register_commands()
    
    def _register_commands(self):
        """Register available commands."""
        logger.info("Registering commands...")
        self.commands.register(HelpCommand(self.commands))
        self.commands.register(ResearchCommand(self.groq))
        self.commands.register(GenerateImageCommand(self.image_gen, self.groq))
        self.commands.register(CreatePostCommand(self.groq, self.image_gen))
        self.commands.register(PublishCommand(self.telegram))
        self.commands.register(KitCommand(self.kit))
        
        logger.info(f"Registered {len(self.commands.commands)} commands")
    
    async def handle_message(self, event: events.NewMessage.Event):
        """Handle incoming messages with NLU and file support."""
        message = event.message
        text = message.text or ""
        
        # Ignore if not from self in Saved Messages
        if message.sender_id != self.my_id:
            return
        
        # 1. Handle File Uploads
        file_context = ""
        if message.file:
            try:
                # Download file
                path = await message.download_media(file=Config.DATA_DIR)
                
                # Try to read as text
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Limit file content size
                        if len(content) > 20000:
                            content = content[:20000] + "\n...[truncated]"
                        
                        file_context = f"\n\nFile Content ({os.path.basename(path)}):\n{content}"
                        logger.info(f"Processed file: {path}")
                except UnicodeDecodeError:
                    logger.warning(f"Could not read file {path} as text")
                    file_context = f"\n\n[File {os.path.basename(path)} attached but not readable as text]"
                except Exception as e:
                    logger.error(f"Error reading file: {e}")
                
                # Clean up temp file
                # os.remove(path) # Optional: keep or delete
            except Exception as e:
                logger.error(f"Error downloading file: {e}")

        # Combine text and file context
        full_context = text + file_context
        
        if not full_context.strip():
            return

        # 2. Check for Explicit Command
        if text.startswith('/'):
            command_name = text.split()[0]
            command = self.commands.find_command(command_name)
            if command:
                logger.info(f"Executing explicit command: {command_name}")
                args = command.parse_args(text)
                # Append file context to args if it exists
                if file_context:
                    args += file_context
                await command.execute(event, args)
                return

        # 3. Analyze Intent (Natural Language)
        # Send "thinking" status
        status_msg = await event.respond("🧠 <i>Анализирую запрос...</i>", parse_mode='html')
        
        try:
            analysis = await self.intent_analyzer.analyze(full_context)
            intent = analysis.get('intent', 'chat')
            args = analysis.get('args', full_context)
            
            logger.info(f"Detected intent: {intent}, args: {args[:50]}...")
            
            # Map intents to commands
            if intent == 'research':
                command = self.commands.find_command('/research')
                await status_msg.delete()
                await command.execute(event, args)
                
            elif intent == 'create_post':
                command = self.commands.find_command('/create_post')
                await status_msg.delete()
                await command.execute(event, args)
                
            elif intent == 'generate_image':
                command = self.commands.find_command('/generate_image')
                await status_msg.delete()
                await command.execute(event, args)
            
            elif intent in self.kit.get_agent_names():
                # Handle Specialist Agent from the Kit
                await status_msg.edit(f"🤖 <b>{intent.replace('-', ' ').title()}</b> <i>подключается...</i>", parse_mode='html')
                
                # Load context (persona + relevant skills)
                persona = self.kit.load_agent_persona(intent)
                
                # Find relevant skills (heuristic: if intent name or args match skill name)
                all_skills = self.kit.get_skill_names()
                relevant_skills = []
                for skill in all_skills:
                    if skill in intent or skill in args.lower():
                        skill_content = self.kit.load_skill(skill)
                        if skill_content:
                            relevant_skills.append(f"### Skill: {skill}\n{skill_content}")
                
                skills_context = "\n\n".join(relevant_skills)
                full_system_prompt = f"{persona}\n\n{skills_context}\n\nUser Question: {args}"
                
                await status_msg.edit(f"💬 <b>{intent.replace('-', ' ').title()}</b> <i>пишет ответ...</i>", parse_mode='html')
                response = await self.groq.generate_content(full_system_prompt)
                
                await status_msg.delete()
                await self.telegram.send_message(event.chat_id, f"🤖 <b>{intent.replace('-', ' ').title()}</b>:\n\n{response}")

            else: # 'chat' or unknown
                # Handle as general chat
                await status_msg.edit("💬 <i>Пишу ответ...</i>", parse_mode='html')
                
                # Load system prompt from file
                system_prompt = Config.get_system_prompt()
                if not system_prompt:
                    # Fallback if file is empty or missing
                    system_prompt = (
                        "You are a helpful AI assistant in Telegram. "
                        "Answer the user's message naturally and concisely. "
                        "If the user provided a file, analyze it as requested. "
                        "Use Telegram HTML formatting (<b>, <i>, <code>) where appropriate."
                    )
                
                response = await self.groq.generate_content(f"{system_prompt}\n\nUser: {full_context}")
                
                await status_msg.delete()
                await self.telegram.send_message(event.chat_id, response)
                
        except Exception as e:
            logger.error(f"Error in NLU handler: {e}")
            await status_msg.edit(f"❌ Ошибка: {str(e)}")
    
    async def start(self):
        """Start the bot."""
        logger.info("Starting bot...")
        
        # Start Telegram client
        await self.telegram.start()
        self.my_id = self.telegram.me.id
        
        # Add event handlers
        self.telegram.add_event_handler(
            self.handle_message,
            events.NewMessage(from_users='me')
        )
        
        logger.info("✅ Bot started successfully!")
        logger.info("Send /help to yourself in 'Saved Messages' to see available commands")
        
        # Run until disconnected
        await self.telegram.run_until_disconnected()
    
    async def stop(self):
        """Stop the bot."""
        logger.info("Stopping bot...")
        await self.telegram.stop()
        logger.info("Bot stopped")
