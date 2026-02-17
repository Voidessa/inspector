from telethon.events import NewMessage
from src.commands.base import Command
from src.ai.kit_loader import KitLoader

class KitCommand(Command):
    """Command to show available Antigravity Kit components."""
    
    def __init__(self, kit_loader: KitLoader):
        super().__init__(
            name="kit",
            description="Показать доступных специалистов и навыки Antigravity Kit",
            usage="/kit"
        )
        self.kit = kit_loader
        
    async def execute(self, event: NewMessage.Event, args: str):
        """Execute the kit command."""
        agents = self.kit.get_agent_names()
        skills = self.kit.get_skill_names()
        
        response = "🛰 <b>Antigravity Kit</b>\n\n"
        
        response += "🤖 <b>Специалисты:</b>\n"
        for agent in agents:
            response += f"• <code>{agent}</code>\n"
            
        response += "\n🧠 <b>Навыки:</b>\n"
        # Only show many if they are few, or limit
        max_skills = 15
        for skill in skills[:max_skills]:
            response += f"• <i>{skill}</i>\n"
            
        if len(skills) > max_skills:
            response += f"• ... и еще {len(skills) - max_skills} навыков\n"
            
        response += "\n\n<i>Вы можете обратиться к любому специалисту напрямую в чате!</i>"
        
        await event.respond(response, parse_mode='html')
