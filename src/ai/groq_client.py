import logging
from groq import Groq
from src.config import Config

logger = logging.getLogger(__name__)

class GroqClient:
    """Client for interacting with Groq API."""
    
    def __init__(self):
        """Initialize Groq client."""
        self.client = Groq(api_key=Config.GROQ_API_KEY)
        # Using Llama 3.3 70B for high quality responses
        self.model = "llama-3.3-70b-versatile"
        logger.info("✅ Groq client initialized")
    
    async def generate_content(self, prompt: str) -> str:
        """Generate content using Groq."""
        try:
            logger.info(f"Generating content with prompt: {prompt[:50]}...")
            
            completion = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=4096,
                top_p=1,
                stream=False,
                stop=None,
            )
            
            return completion.choices[0].message.content
            
        except Exception as e:
            logger.error(f"Error generating content: {e}")
            return f"Error generating content: {str(e)}"

    async def research_topic(self, topic: str) -> str:
        """Research a topic and provide a summary."""
        prompt = (
            f"Please research and analyze the following topic: '{topic}'. "
            f"Provide a comprehensive summary in Russian language. "
            f"Structure the response with clear headings and bullet points. "
            f"Focus on key facts, current trends, and important details."
        )
        return await self.generate_content(prompt)

    async def optimize_image_prompt(self, prompt: str) -> str:
        """Optimize a prompt for image generation."""
        optimization_prompt = (
            f"Enhance the following image prompt to make it more descriptive and suitable for an AI image generator. "
            f"Keep it in English. Focus on visual details, lighting, style, and mood. "
            f"Original prompt: '{prompt}'"
            f"Return ONLY the enhanced prompt, nothing else."
        )
        return await self.generate_content(optimization_prompt)
