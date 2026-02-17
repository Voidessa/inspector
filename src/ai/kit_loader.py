import os
import logging
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)

class KitLoader:
    """Helper to load agents and skills from the .agent directory."""

    def __init__(self, kit_path: str = ".agent"):
        self.kit_path = kit_path
        self.agents_path = os.path.join(kit_path, "agents")
        self.skills_path = os.path.join(kit_path, "skills")

    def get_agent_names(self) -> List[str]:
        """Get a list of all specialist agent names."""
        if not os.path.exists(self.agents_path):
            return []
        
        agents = []
        for file in os.listdir(self.agents_path):
            if file.endswith(".md"):
                agents.append(file.replace(".md", ""))
        return sorted(agents)

    def load_agent_persona(self, agent_name: str) -> Optional[str]:
        """Load the persona (system prompt) for a specific agent."""
        file_path = os.path.join(self.agents_path, f"{agent_name}.md")
        if not os.path.exists(file_path):
            return None
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            logger.error(f"Error loading agent persona {agent_name}: {e}")
            return None

    def get_skill_names(self) -> List[str]:
        """Get a list of all available skill names."""
        if not os.path.exists(self.skills_path):
            return []
        
        skills = []
        for item in os.listdir(self.skills_path):
            item_path = os.path.join(self.skills_path, item)
            if os.path.isdir(item_path) and os.path.exists(os.path.join(item_path, "SKILL.md")):
                skills.append(item)
        return sorted(skills)

    def load_skill(self, skill_name: str) -> Optional[str]:
        """Load the content of a specific skill."""
        file_path = os.path.join(self.skills_path, skill_name, "SKILL.md")
        if not os.path.exists(file_path):
            return None
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            logger.error(f"Error loading skill {skill_name}: {e}")
            return None
