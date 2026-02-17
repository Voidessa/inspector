"""Text formatting utilities for Telegram messages."""
from typing import Optional


def format_html(text: str, bold: bool = False, italic: bool = False, code: bool = False) -> str:
    """Format text with HTML tags for Telegram.
    
    Args:
        text: Text to format
        bold: Apply bold formatting
        italic: Apply italic formatting
        code: Apply code formatting
        
    Returns:
        Formatted text
    """
    if bold:
        text = f"<b>{text}</b>"
    if italic:
        text = f"<i>{text}</i>"
    if code:
        text = f"<code>{text}</code>"
    return text


def truncate(text: str, max_length: int = 4000, suffix: str = "...") -> str:
    """Truncate text to maximum length.
    
    Args:
        text: Text to truncate
        max_length: Maximum length
        suffix: Suffix to append if truncated
        
    Returns:
        Truncated text
    """
    if len(text) <= max_length:
        return text
    return text[:max_length - len(suffix)] + suffix


def add_header(title: str, emoji: Optional[str] = None) -> str:
    """Create a formatted header.
    
    Args:
        title: Header title
        emoji: Optional emoji to prepend
        
    Returns:
        Formatted header
    """
    if emoji:
        return f"{emoji} <b>{title}</b>\n\n"
    return f"<b>{title}</b>\n\n"


def format_list(items: list, emoji: str = "•") -> str:
    """Format a list of items.
    
    Args:
        items: List items
        emoji: Bullet point emoji
        
    Returns:
        Formatted list
    """
    return "\n".join([f"{emoji} {item}" for item in items])


def format_code_block(code: str, language: str = "") -> str:
    """Format code block for Telegram.
    
    Args:
        code: Code content
        language: Programming language (not used in HTML mode)
        
    Returns:
        Formatted code block
    """
    return f"<pre>{code}</pre>"
