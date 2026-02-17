"""Create post command - full post creation with research, text, and image."""
from telethon.events import NewMessage
from src.commands.base import Command
from src.ai.groq_client import GroqClient
from src.ai.image_generator import ImageGenerator
from src.utils.formatters import add_header, truncate
from src.config import Config


class CreatePostCommand(Command):
    """Create a post command."""
    
    def __init__(self, groq_client: GroqClient, image_gen: ImageGenerator):
        """Initialize create post command.
        
        Args:
            groq_client: Groq AI client
            image_gen: Image generator
        """
        super().__init__(
            name='create_post',
            description='Создать пост на тему',
            usage='/create_post Тема поста'
        )
        self.groq = groq_client
        self.image_gen = image_gen
    
    async def execute(self, event: NewMessage.Event, args: str):
        """Create a complete post."""
        if not args:
            await event.respond(
                "❌ <b>Ошибка:</b> Укажите тему поста\n\n"
                f"<i>Пример: {self.usage}</i>",
                parse_mode='html'
            )
            return
        
        # Send status message
        status_msg = await event.respond(
            f"📝 Создаю пост на тему: <b>{args}</b>\n\n"
            "<i>Шаг 1/3: Исследование темы...</i>",
            parse_mode='html'
        )
        
        try:
            # 1. Research
            research = await self.groq.research_topic(args)
            
            # 2. Write Post
            await status_msg.edit(
                f"📝 Создаю пост на тему: <b>{args}</b>\n\n"
                "<i>Шаг 2/3: Написание текста...</i>",
                parse_mode='html'
            )
            
            # Load system prompt
            system_prompt = Config.get_system_prompt()
            
            prompt = (
                f"{system_prompt}\n\n"
                f"TASK: Based on the following research, write an engaging Telegram post about '{args}'. "
                f"Use emojis, clear structure, and a call to action. "
                f"Research: {research}"
            )
            post_text = await self.groq.generate_content(prompt)
            post_text = truncate(post_text, max_length=1000)
            
            # 3. Generate Image
            await status_msg.edit(
                f"📝 Создаю пост на тему: <b>{args}</b>\n\n"
                "<i>Шаг 3/3: Создание изображения...</i>",
                parse_mode='html'
            )
            
            image_prompt = await self.groq.optimize_image_prompt(args)
            image_path = await self.image_gen.generate_image(image_prompt)
            
            # 4. Send Result
            await status_msg.delete()
            
            await event.client.send_file(
                event.chat_id,
                image_path,
                caption=post_text,
                parse_mode='markdown'
            )
            
        except Exception as e:
            await status_msg.edit(f"❌ Ошибка: {str(e)}")
