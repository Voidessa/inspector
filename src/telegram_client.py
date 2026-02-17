"""Telegram client wrapper using Telethon."""
from telethon import TelegramClient, events
from telethon.tl.types import InputPeerChannel, InputPeerChat, User
from typing import Optional, Union
import os

from src.config import Config
from src.utils.logger import setup_logger

logger = setup_logger(__name__)


class TelegramClientWrapper:
    """Wrapper for Telethon client with helper methods."""
    
    def __init__(self):
        """Initialize Telegram client."""
        self.client = TelegramClient(
            Config.SESSION_NAME,
            int(Config.TELEGRAM_API_ID),
            Config.TELEGRAM_API_HASH
        )
        self.me: Optional[User] = None
    
    async def start(self):
        """Start and authenticate the client."""
        logger.info("Starting Telegram client...")
        
        await self.client.start(phone=Config.TELEGRAM_PHONE)
        self.me = await self.client.get_me()
        
        logger.info(f"✅ Logged in as: {self.me.first_name} (@{self.me.username})")
        return self
    
    async def stop(self):
        """Stop the client."""
        logger.info("Stopping Telegram client...")
        await self.client.disconnect()
    
    async def send_message(
        self, 
        entity: Union[str, int], 
        message: str, 
        file: Optional[str] = None,
        parse_mode: str = 'html'
    ):
        """Send a message to an entity.
        
        Args:
            entity: Username, phone number, or entity ID
            message: Message text
            file: Optional file path to send
            parse_mode: Parse mode for message formatting
            
        Returns:
            Sent message
        """
        try:
            # Split long messages
            if len(message) > 4096:
                logger.info("Message too long, splitting...")
                # Simple splitting by length (can be improved to split by newline)
                chunk_size = 4000
                chunks = [message[i:i+chunk_size] for i in range(0, len(message), chunk_size)]
                
                last_msg = None
                for i, chunk in enumerate(chunks):
                    # Add page number if multiple chunks
                    if len(chunks) > 1:
                        chunk += f"\n\n<i>(Часть {i+1}/{len(chunks)})</i>"
                    
                    last_msg = await self.client.send_message(
                        entity,
                        chunk,
                        file=file if i == len(chunks) - 1 else None, # Send file only with last chunk
                        parse_mode=parse_mode
                    )
                return last_msg
            else:
                return await self.client.send_message(
                    entity,
                    message,
                    file=file,
                    parse_mode=parse_mode
                )
        except Exception as e:
            logger.error(f"Failed to send message: {e}")
            raise
    
    async def send_photo(
        self,
        entity: Union[str, int],
        photo: str,
        caption: str = "",
        parse_mode: str = 'html'
    ):
        """Send a photo to an entity.
        
        Args:
            entity: Username, phone number, or entity ID
            photo: Photo file path
            caption: Photo caption
            parse_mode: Parse mode for caption formatting
            
        Returns:
            Sent message
        """
        try:
            return await self.client.send_file(
                entity,
                photo,
                caption=caption,
                parse_mode=parse_mode
            )
        except Exception as e:
            logger.error(f"Failed to send photo: {e}")
            raise
    
    async def get_entity(self, identifier: Union[str, int]):
        """Get entity by username or ID.
        
        Args:
            identifier: Username (with or without @) or entity ID
            
        Returns:
            Entity object
        """
        try:
            return await self.client.get_entity(identifier)
        except Exception as e:
            logger.error(f"Failed to get entity {identifier}: {e}")
            raise
    
    async def get_saved_messages(self):
        """Get 'Saved Messages' chat.
        
        Returns:
            Saved Messages entity
        """
        return await self.get_entity('me')
    
    def add_event_handler(self, callback, event):
        """Add event handler to client.
        
        Args:
            callback: Callback function
            event: Event type
        """
        self.client.add_event_handler(callback, event)
    
    async def run_until_disconnected(self):
        """Run the client until disconnected."""
        await self.client.run_until_disconnected()
