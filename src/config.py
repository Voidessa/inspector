"""Configuration management for Telegram Content Agent."""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Config:
    """Application configuration."""
    
    # Base directory
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Telegram credentials
    TELEGRAM_API_ID = os.getenv('TELEGRAM_API_ID')
    TELEGRAM_API_HASH = os.getenv('TELEGRAM_API_HASH')
    TELEGRAM_PHONE = os.getenv('TELEGRAM_PHONE')
    
    # Google AI API key
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
    
    # Groq API
    GROQ_API_KEY = os.getenv('GROQ_API_KEY')
    
    # Bot Settings
    BOT_LANGUAGE = os.getenv('BOT_LANGUAGE', 'ru')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    
    # Application constants
    APP_NAME = 'Telegram Content Agent'
    APP_VERSION = '1.0.0'
    SESSION_NAME = 'content_agent'
    
    # Data directories
    DATA_DIR = 'data'
    IMAGES_DIR = os.path.join(DATA_DIR, 'images')
    
    @classmethod
    def get_system_prompt(cls) -> str:
        """Load system prompt from file."""
        try:
            prompt_path = os.path.join(cls.BASE_DIR, 'data', 'system_prompt.txt')
            if os.path.exists(prompt_path):
                with open(prompt_path, 'r', encoding='utf-8') as f:
                    return f.read()
            return ""
        except Exception as e:
            return f"Error loading system prompt: {e}"

    @classmethod
    def validate(cls):
        """Validate required configuration."""
        missing = []
        
        if not cls.TELEGRAM_API_ID:
            missing.append('TELEGRAM_API_ID')
        if not cls.TELEGRAM_API_HASH:
            missing.append('TELEGRAM_API_HASH')
        if not cls.TELEGRAM_PHONE:
            missing.append('TELEGRAM_PHONE')
        if not cls.GROQ_API_KEY:
            missing.append('GROQ_API_KEY')
        
        if missing:
            raise ValueError(
                f"Missing required environment variables: {', '.join(missing)}\n"
                f"Please check your .env file."
            )
        
        return True
    
    @classmethod
    def ensure_directories(cls):
        """Create necessary directories if they don't exist."""
        os.makedirs(cls.DATA_DIR, exist_ok=True)
        os.makedirs(cls.IMAGES_DIR, exist_ok=True)
