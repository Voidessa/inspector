"""Research command - research a topic and provide summary."""
from telethon.events import NewMessage
from src.commands.base import Command
from src.ai.groq_client import GroqClient
from src.utils.formatters import add_header, truncate
from src.config import Config


class ResearchCommand(Command):
    """Research a topic using AI."""
    
    def __init__(self, groq_client: GroqClient):
        """Initialize research command.
        
        Args:
            groq_client: Groq AI client
        """
        super().__init__(
            name='research',
            description='Исследовать тему и получить анализ',
            usage='/research Тренды AI в 2025'
        )
        self.groq = groq_client
    
    async def execute(self, event: NewMessage.Event, args: str):
        """Research a topic."""
        if not args:
            await event.respond(
                "❌ <b>Ошибка:</b> Укажите тему для исследования\n\n"
                f"<i>Пример: {self.usage}</i>",
                parse_mode='html'
            )
            return
        
        # Send "working" message
        status_msg = await event.respond(
            f"🔍 Исследую тему: <b>{args}</b>\n\n"
            "<i>Это может занять несколько секунд...</i>",
            parse_mode='html'
        )
        
        try:
            # Research the topic
            system_prompt = Config.get_system_prompt()
            # We need to modify research_topic to accept system prompt or prepend it here
            # Since research_topic in GroqClient just takes a topic, we'll modify the prompt inside GroqClient or pass a full prompt here.
            # Let's modify GroqClient.research_topic to be more flexible, OR just construct the prompt here.
            # Actually, GroqClient.research_topic constructs its own prompt. Let's update GroqClient instead to use the system prompt if available.
            # Wait, better to just pass the full prompt to generate_content here if we want full control.
            # But research_topic is a convenience method.
            # Let's just update GroqClient.research_topic to use the system prompt.
            
            # Actually, let's just do it here for now to avoid changing GroqClient signature too much
            # But wait, GroqClient.research_topic hardcodes the prompt.
            # Let's update GroqClient.research_topic to accept an optional system_prompt.
            
            # Re-reading GroqClient code...
            # It has a specific prompt structure.
            # Let's update GroqClient.research_topic in a separate step.
            # For now, let's just call generate_content directly here for maximum control.
            
            prompt = (
                f"{system_prompt}\n\n"
                f"TASK: Research and analyze the following topic: '{args}'. "
                f"Provide a comprehensive summary. "
                f"Focus on key facts, current trends, and important details."
            )
            research = await self.groq.generate_content(prompt)
            
            # Format response
            response = add_header("📚 Результаты исследования", "")
            response += f"<b>Тема:</b> {args}\n\n"
            response += research
            
            # Truncate to avoid Telegram limit (4096 chars)
            response = truncate(response, max_length=4000)
            
            # Delete status message and send result
            await status_msg.delete()
            await event.respond(response, parse_mode='html')
            
        except Exception as e:
            await status_msg.delete()
            await event.respond(
                f"❌ <b>Ошибка при исследовании:</b>\n{str(e)}",
                parse_mode='html'
            )
