"""Base command handler for the bot."""
from abc import ABC, abstractmethod
from typing import Optional, List
from telethon.events import NewMessage
from src.utils.logger import setup_logger

logger = setup_logger(__name__)


class Command(ABC):
    """Base class for bot commands."""
    
    def __init__(self, name: str, description: str, usage: str):
        """Initialize command.
        
        Args:
            name: Command name (without /)
            description: Command description
            usage: Usage example
        """
        self.name = name
        self.description = description
        self.usage = usage
    
    def matches(self, message: str) -> bool:
        """Check if message matches this command.
        
        Args:
            message: Message text
            
        Returns:
            True if message is this command
        """
        return message.strip().startswith(f'/{self.name}')
    
    def parse_args(self, message: str) -> str:
        """Parse command arguments from message.
        
        Args:
            message: Full message text
            
        Returns:
            Arguments string (everything after command)
        """
        # Remove command name and strip
        args = message.strip()[len(f'/{self.name}'):].strip()
        return args
    
    @abstractmethod
    async def execute(self, event: NewMessage.Event, args: str):
        """Execute the command.
        
        Args:
            event: Telegram event
            args: Command arguments
        """
        pass
    
    def get_help_text(self) -> str:
        """Get formatted help text for this command.
        
        Returns:
            Help text
        """
        return f"/{self.name} - {self.description}\n<i>Пример: {self.usage}</i>"


class CommandRegistry:
    """Registry for managing bot commands."""
    
    def __init__(self):
        """Initialize command registry."""
        self.commands: List[Command] = []
        logger.info("Command registry initialized")
    
    def register(self, command: Command):
        """Register a command.
        
        Args:
            command: Command instance
        """
        self.commands.append(command)
        logger.info(f"Registered command: /{command.name}")
    
    def find_command(self, message: str) -> Optional[Command]:
        """Find matching command for a message.
        
        Args:
            message: Message text
            
        Returns:
            Matching command or None
        """
        for command in self.commands:
            if command.matches(message):
                return command
        return None
    
    def get_all_commands(self) -> List[Command]:
        """Get all registered commands.
        
        Returns:
            List of commands
        """
        return self.commands
