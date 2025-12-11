const cron = require('node-cron');
const { sendMessage } = require('./src/bot');
const { generateDailyMessage } = require('./src/content');

console.log("🚀 Daily KPI Assistant is running...");
console.log("⏰ Schedule: Monday to Friday at 8:40 AM");

// Schedule: 40 minutes, 8 hours, every day of month, every month, Mon-Fri
// '40 8 * * 1-5'
cron.schedule('40 8 * * 1-5', async () => {
    console.log("⏰ Triggering daily message...");
    const message = await generateDailyMessage();
    await sendMessage(message);
}, {
    timezone: "Asia/Seoul" // Setting timezone to KST
});

// Keep process alive
process.on('SIGINT', () => {
    console.log("🛑 String scheduler...");
    process.exit();
});
