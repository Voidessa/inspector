"""Publish command - publish content to channels and groups."""
from telethon.events import NewMessage
from telethon.errors import ChatWriteForbiddenError, ChannelPrivateError
from src.commands.base import Command
from src.telegram_client import TelegramClientWrapper


class PublishCommand(Command):
    """Publish content to a channel or group."""
    
    def __init__(self, telegram_client: TelegramClientWrapper):
        """Initialize publish command.
        
        Args:
            telegram_client: Telegram client wrapper
        """
        super().__init__(
            name='publish',
            description='Опубликовать контент в канал или группу',
            usage='/publish @mychannel Текст поста (или ответ на пост)'
        )
        self.client = telegram_client
    
    async def execute(self, event: NewMessage.Event, args: str):
        """Publish content to a channel/group."""
        # Parse target channel
        args_parts = args.split(maxsplit=1)
        
        if not args_parts:
            await event.respond(
                "❌ <b>Ошибка:</b> Укажите канал для публикации\n\n"
                f"<i>Пример: {self.usage}</i>",
                parse_mode='html'
            )
            return
        
        target = args_parts[0]
        
        # Get content
        content = None
        media = None
        
        # Check if this is a reply to a message
        if event.is_reply:
            replied_msg = await event.get_reply_message()
            content = replied_msg.text or ""
            if replied_msg.media:
                media = replied_msg.media
        else:
            # Use text from command args
            if len(args_parts) > 1:
                content = args_parts[1]
            else:
                await event.respond(
                    "❌ <b>Ошибка:</b> Укажите текст поста или ответьте на сообщение\n\n"
                    f"<i>Пример: {self.usage}</i>",
                    parse_mode='html'
                )
                return
        
        if not content:
            await event.respond(
                "❌ <b>Ошибка:</b> Контент для публикации пустой",
                parse_mode='html'
            )
            return
        
        # Confirmation
        confirm_msg = await event.respond(
            f"📤 <b>Публикация поста</b>\n\n"
            f"<b>Канал:</b> {target}\n"
            f"<b>Длина текста:</b> {len(content)} символов\n"
            f"<b>Изображение:</b> {'Да ✅' if media else 'Нет'}\n\n"
            f"<i>Отправляю через 3 секунды...</i>\n"
            f"<i>(Если нужно отменить, удалите это сообщение)</i>",
            parse_mode='html'
        )
        
        # Wait for confirmation (3 seconds)
        import asyncio
        await asyncio.sleep(3)
        
        try:
            # Try to get the confirmation message (if deleted, abort)
            try:
                await confirm_msg.get_message()
            except:
                await event.respond("❌ <b>Публикация отменена</b>", parse_mode='html')
                return
            
            # Get target entity
            try:
                entity = await self.client.get_entity(target)
            except Exception as e:
                await confirm_msg.delete()
                await event.respond(
                    f"❌ <b>Ошибка:</b> Не удалось найти канал {target}\n\n"
                    f"<i>Убедитесь, что канал существует и вы в нем состоите</i>",
                    parse_mode='html'
                )
                return
            
            # Publish
            if media:
                await self.client.client.send_file(
                    entity,
                    media,
                    caption=content,
                    parse_mode='html'
                )
            else:
                await self.client.send_message(entity, content, parse_mode='html')
            
            # Success
            await confirm_msg.delete()
            await event.respond(
                f"✅ <b>Пост успешно опубликован в {target}!</b>",
                parse_mode='html'
            )
            
        except ChatWriteForbiddenError:
            await confirm_msg.delete()
            await event.respond(
                f"❌ <b>Ошибка:</b> Нет прав для публикации в {target}\n\n"
                f"<i>Вы должны быть администратором канала</i>",
                parse_mode='html'
            )
        except ChannelPrivateError:
            await confirm_msg.delete()
            await event.respond(
                f"❌ <b>Ошибка:</b> Канал {target} приватный или не существует",
                parse_mode='html'
            )
        except Exception as e:
            await confirm_msg.delete()
            await event.respond(
                f"❌ <b>Ошибка при публикации:</b>\n{str(e)}",
                parse_mode='html'
            )
