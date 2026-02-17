import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const { items, total } = await request.json();

        // Format the message
        const orderId = `ORD-${Date.now().toString().slice(-6)}`;
        let message = `🆕 <b>New Order Received</b>\n`;
        message += `🆔 Order ID: <code>${orderId}</code>\n\n`;

        message += `🛒 <b>Items:</b>\n`;
        items.forEach((item: any) => {
            message += `- ${item.name} x${item.quantity} ($${item.price})\n`;
        });

        message += `\n💰 <b>Total: $${total}</b>`;

        // Send to Telegram
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.description || 'Telegram API Error');
        }

        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        console.error('Telegram API Error:', error);
        return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
    }
}
