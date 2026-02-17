"""Verification script to check setup and imports."""
import sys
import os
from dotenv import load_dotenv

def check_imports():
    print("Checking imports...")
    try:
        import telethon
        import groq
        import PIL
        from src.config import Config
        from src.bot import ContentAgentBot
        from src.commands.base import CommandRegistry
        print("✅ All imports successful")
        return True
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error during import: {e}")
        return False

def check_env():
    print("\nChecking environment...")
    if not os.path.exists('.env'):
        print("⚠️ .env file not found (this is expected for first run)")
        print("ℹ️ Please copy .env.example to .env and fill in your credentials")
        return False
    
    load_dotenv()
    required = ['TELEGRAM_API_ID', 'TELEGRAM_API_HASH', 'TELEGRAM_PHONE', 'GROQ_API_KEY']
    missing = [key for key in required if not os.getenv(key)]
    
    if missing:
        print(f"❌ Missing environment variables: {', '.join(missing)}")
        return False
    
    print("✅ Environment variables present")
    return True

def main():
    print("🚀 Starting verification...")
    imports_ok = check_imports()
    env_ok = check_env()
    
    if imports_ok:
        print("\n✅ Code structure is valid")
        if not env_ok:
            print("\n⚠️ Next steps:")
            print("1. Copy .env.example to .env")
            print("2. Fill in your API keys")
            print("3. Run 'python main.py'")
    else:
        print("\n❌ Verification failed. Please check dependencies.")

if __name__ == '__main__':
    main()
