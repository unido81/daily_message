const axios = require('axios');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

async function sendMessage(text) {
    if (!token || token === 'YOUR_BOT_TOKEN_HERE') {
        console.warn("⚠️ Telegram Bot Token not set. Bot functionality will be disabled.");
        return; // Don't throw, just exit if no token in non-critical path, but here it's critical.
    }

    if (!token) {
        throw new Error("❌ Bot Token not set. Check TELEGRAM_BOT_TOKEN.");
    }

    if (!chatId || chatId === 'YOUR_CHAT_ID_HERE') {
        throw new Error("❌ Chat ID not set. Check TELEGRAM_CHAT_ID.");
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
        });
        console.log("✅ Message sent successfully!");
    } catch (error) {
        console.error("❌ Failed to send message:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        throw error;
    }
}

module.exports = { sendMessage };
