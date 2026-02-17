"""Application entry point."""
import asyncio
import sys
from src.config import Config
from src.bot import ContentAgentBot
from src.utils.logger import setup_logger

logger = setup_logger(__name__)


async def main():
    """Run the application."""
    try:
        # Validate configuration
        logger.info("Validating configuration...")
        try:
            Config.validate()
        except ValueError as e:
            logger.error(str(e))
            sys.exit(1)
        
        # Create and start bot
        bot = ContentAgentBot()
        
        logger.info("Starting application...")
        logger.info("Press Ctrl+C to stop")
        
        await bot.start()
        
    except KeyboardInterrupt:
        logger.info("Application stopped by user")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
