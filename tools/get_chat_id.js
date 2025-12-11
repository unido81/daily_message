require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token || token === 'YOUR_BOT_TOKEN_HERE') {
  console.error("❌ Error: TELEGRAM_BOT_TOKEN is missing in .env file.");
  console.log("👉 Please create a bot with @BotFather and paste the token into .env");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Bot is polling... Please send a message to your bot on Telegram now!");

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from.username || msg.from.first_name;
  
  console.log(`\n✅ Message received from ${user}!`);
  console.log(`🆔 Your Chat ID is: ${chatId}`);
  console.log(`\n👉 Copy this ID and paste it into your .env file as TELEGRAM_CHAT_ID=${chatId}`);
  
  bot.stopPolling();
  process.exit(0);
});
