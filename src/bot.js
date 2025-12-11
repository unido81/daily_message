const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

let bot;

if (token && token !== 'YOUR_BOT_TOKEN_HERE') {
    bot = new TelegramBot(token, { polling: false }); // We only send messages, so polling is false for the main app
} else {
    console.warn("⚠️ Telegram Bot Token not set. Bot functionality will be disabled.");
}

async function sendMessage(text) {
    if (!bot) {
        console.error("❌ Bot not initialized. Check TELEGRAM_BOT_TOKEN.");
        return;
    }
    if (!chatId || chatId === 'YOUR_CHAT_ID_HERE') {
        console.error("❌ Chat ID not set. Check TELEGRAM_CHAT_ID.");
        return;
    }

    try {
        await bot.sendMessage(chatId, text, { parse_mode: 'Markdown' }); // Using Markdown for formatting
        console.log("✅ Message sent successfully!");
    } catch (error) {
        console.error("❌ Failed to send message:", error.message);
    }
}

module.exports = { sendMessage };
