"""Generate image command - create images from descriptions."""
from telethon.events import NewMessage
from src.commands.base import Command
from src.ai.image_generator import ImageGenerator
from src.ai.groq_client import GroqClient


class GenerateImageCommand(Command):
    """Generate image command."""
    
    def __init__(self, image_generator: ImageGenerator, groq_client: GroqClient):
        """Initialize command.
        
        Args:
            image_generator: Image generator instance
            groq_client: Groq AI client
        """
        super().__init__(
            name='generate_image',
            description='Сгенерировать изображение по описанию',
            usage='/generate_image Описание картинки'
        )
        self.image_gen = image_generator
        self.groq = groq_client
    
    async def execute(self, event: NewMessage.Event, args: str):
        """Generate an image."""
        if not args:
            await event.respond(
                "❌ <b>Ошибка:</b> Укажите описание изображения\n\n"
                f"<i>Пример: {self.usage}</i>",
                parse_mode='html'
            )
            return
        
        # Send "working" message
        status_msg = await event.respond(
            f"🎨 Создаю изображение: <b>{args}</b>\n\n"
            "<i>Генерация может занять 10-30 секунд...</i>",
            parse_mode='html'
        )
        
        try:
            # Optimize prompt
            await status_msg.edit(
                f"🎨 Создаю изображение: <b>{args}</b>\n\n"
                "<i>Оптимизирую промпт...</i>",
                parse_mode='html'
            )
            
            optimized_prompt = await self.groq.optimize_image_prompt(args)
            
            # Generate image
            await status_msg.edit(
                f"🎨 Создаю изображение: <b>{args}</b>\n\n"
                "<i>Генерирую изображение...</i>",
                parse_mode='html'
            )
            
            image_path = await self.image_gen.generate_for_topic(args, optimized_prompt)
            
            # Send image
            await status_msg.delete()
            await event.respond(
                file=image_path,
                message=f"✅ <b>Изображение создано</b>\n\n<i>Тема: {args}</i>",
                parse_mode='html'
            )
            
        except Exception as e:
            await status_msg.delete()
            await event.respond(
                f"❌ <b>Ошибка при генерации изображения:</b>\n{str(e)}",
                parse_mode='html'
            )
