const { sendMessage } = require('../src/bot');
const { generateDailyMessage } = require('../src/content');
require('dotenv').config();

(async () => {
    console.log("🚀 Manually triggering message push...");

    if (!process.env.TELEGRAM_BOT_TOKEN) {
        console.error("❌ Error: TELEGRAM_BOT_TOKEN is missing.");
        process.exit(1);
    }
    if (!process.env.TELEGRAM_CHAT_ID) {
        console.error("❌ Error: TELEGRAM_CHAT_ID is missing.");
        process.exit(1);
    }

    try {
        const message = await generateDailyMessage();
        await sendMessage(message);
        console.log("✅ Done.");
    } catch (error) {
        console.error("❌ Failed to send message:", error);
        process.exit(1);
    }
})();
