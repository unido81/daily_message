const Parser = require('rss-parser');
const parser = new Parser();

const feeds = [
    "https://www.hankyung.com/feed/it",
    "https://news.google.com/rss/topics/CAAqJggKIiBkVnmCLhFpZC1rb3JlYW4uZ29vZ2xlYXBpcy5jb20i8gEKLQgpMjQzNjUyMDUQ34W4mMzNx70cGhcLEhRCdXNpbmVzc19Ub3Bfc3RvcmllcxgA?hl=ko&gl=KR&ceid=KR:ko"
];

(async () => {
    console.log("🔍 Testing RSS Feeds...");

    for (const url of feeds) {
        console.log(`\n👉 Trying to fetch: ${url}`);
        try {
            const feed = await parser.parseURL(url);
            console.log(`✅ Success! Title: ${feed.title}`);
            console.log(`📝 First item: ${feed.items[0].title}`);
        } catch (error) {
            console.error(`❌ Failed! Error: ${error.message}`);
        }
    }
})();
