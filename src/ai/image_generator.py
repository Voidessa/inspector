"""Image generation using Pollinations.ai."""
import logging
import os
import aiohttp
import time
from datetime import datetime
from pathlib import Path
from src.config import Config
from urllib.parse import quote

logger = logging.getLogger(__name__)


class ImageGenerator:
    """Image generator using Pollinations.ai (Free)."""
    
    def __init__(self):
        """Initialize image generator."""
        Config.ensure_directories()
        logger.info("✅ Image generator initialized (Pollinations.ai)")
    
    async def generate_image(self, prompt: str, output_filename: str = None) -> str:
        """Generate an image from a text prompt using Pollinations.ai.
        
        Args:
            prompt: Text description of the image
            output_filename: Optional filename to save the image to
            
        Returns:
            Path to the generated image file
        """
        try:
            logger.info(f"Generating image with prompt: {prompt[:100]}...")
            
            # Encode prompt for URL
            encoded_prompt = quote(prompt)
            url = f"https://pollinations.ai/p/{encoded_prompt}?width=1024&height=1024&seed={int(time.time())}&model=flux"
            
            # Generate filename if not provided
            if not output_filename:
                timestamp = int(time.time())
                output_filename = f"generated_{timestamp}.png"
            
            # Ensure .png extension
            if not output_filename.endswith('.png'):
                output_filename += '.png'
            
            # Full path
            output_path = os.path.join(Config.DATA_DIR, output_filename)
            
            # Download the image
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    if response.status == 200:
                        content = await response.read()
                        with open(output_path, 'wb') as f:
                            f.write(content)
                        logger.info(f"✅ Image saved to: {output_path}")
                        return output_path
                    else:
                        raise RuntimeError(f"Failed to generate image. Status: {response.status}")
            
        except Exception as e:
            logger.error(f"Failed to generate image: {e}")
            raise
    
    async def generate_for_topic(self, topic: str, optimized_prompt: str = None) -> str:
        """Generate an image for a specific topic.
        
        Args:
            topic: Topic for the image
            optimized_prompt: Pre-optimized prompt (optional)
            
        Returns:
            Path to the generated image
        """
        if optimized_prompt:
            prompt = optimized_prompt
        else:
            # Create a basic prompt if none provided
            prompt = f"High quality, professional image representing: {topic}. Modern, clean, visually appealing."
        
        # Create filename based on topic
        safe_topic = "".join([c if c.isalnum() or c in (' ', '_') else '_' for c in topic])
        safe_topic = safe_topic.replace(' ', '_')[:50]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{safe_topic}_{timestamp}.png"
        
        return await self.generate_image(prompt, filename)
