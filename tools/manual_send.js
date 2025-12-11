const { sendMessage } = require('../src/bot');
const { generateDailyMessage } = require('../src/content');

(async () => {
    console.log("🚀 Manually triggering message push...");
    const message = await generateDailyMessage();
    await sendMessage(message);
    console.log("✅ Done.");
})();
