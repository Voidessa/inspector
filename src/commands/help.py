"""Help command - shows all available commands."""
from telethon.events import NewMessage
from src.commands.base import Command
from src.utils.formatters import add_header, format_list


class HelpCommand(Command):
    """Show help information."""
    
    def __init__(self, command_registry):
        """Initialize help command.
        
        Args:
            command_registry: Command registry instance
        """
        super().__init__(
            name='help',
            description='Показать список команд',
            usage='/help'
        )
        self.registry = command_registry
    
    async def execute(self, event: NewMessage.Event, args: str):
        """Show all available commands."""
        commands = self.registry.get_all_commands()
        
        help_text = add_header("🤖 Доступные команды", "")
        
        for cmd in commands:
            help_text += f"\n{cmd.get_help_text()}\n"
        
        help_text += "\n<i>💡 Отправляйте команды в 'Избранное' (Saved Messages)</i>"
        
        await event.respond(help_text, parse_mode='html')
