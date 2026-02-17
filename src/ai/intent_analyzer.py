import json
import logging
from typing import Dict, Any, Optional, List
from src.ai.groq_client import GroqClient
from src.ai.kit_loader import KitLoader

logger = logging.getLogger(__name__)

class IntentAnalyzer:
    """Analyzes user messages to determine intent, including Antigravity Kit specialist agents."""
    
    def __init__(self, groq_client: GroqClient):
        """Initialize intent analyzer.
        
        Args:
            groq_client: Groq client for LLM calls
        """
        self.groq = groq_client
        self.kit = KitLoader()
        logger.info("✅ Intent Analyzer initialized with Antigravity Kit support")
        
    async def analyze(self, text: str) -> Dict[str, Any]:
        """Analyze text to determine intent.
        
        Returns:
            Dict with 'intent' and 'args'
        """
        # Get dynamic list of agents from the kit
        agent_names = self.kit.get_agent_names()
        agents_list = "\n".join([f"- '{name}': Specialized Antigravity Kit agent." for name in agent_names])
        
        prompt = (
            f"Analyze the following user message and classify it into one of these intents:\n"
            f"--- Standard Intents ---\n"
            f"1. 'research': User wants to find information, analyze a topic, or learn something.\n"
            f"2. 'create_post': User wants to write a social media post, channel post, or content.\n"
            f"3. 'generate_image': User wants to generate, draw, or create an image/picture.\n"
            f"4. 'chat': General conversation, greeting, or questions not fitting above.\n\n"
            f"--- Specialized Antigravity Kit Agents ---\n"
            f"{agents_list}\n\n"
            f"User Message: '{text}'\n\n"
            f"Return ONLY a JSON object with two keys:\n"
            f"- 'intent': One of the intent names or agent names above.\n"
            f"- 'args': The core topic or argument extracted from the message.\n"
            f"Do not return markdown formatting, just the raw JSON string."
        )
        
        try:
            response = await self.groq.generate_content(prompt)
            # Clean up potential markdown code blocks
            response = response.replace('```json', '').replace('```', '').strip()
            result = json.loads(response)
            
            # Validate intent exists in either list
            intent = result.get('intent', 'chat')
            if intent not in (['research', 'create_post', 'generate_image', 'chat'] + agent_names):
                result['intent'] = 'chat'
                
            return result
        except Exception as e:
            logger.error(f"Error analyzing intent: {e}")
            # Fallback to chat
            return {"intent": "chat", "args": text}
