const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const Parser = require('rss-parser');

// User-Agent Header for all requests
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const parser = new Parser({
    headers: { 'User-Agent': USER_AGENT }
});

const dataPath = path.join(__dirname, 'data', 'initial_data.json');
let db = {};

// Load DB
try {
    const rawData = fs.readFileSync(dataPath);
    db = JSON.parse(rawData);
} catch (err) {
    console.error("❌ initial_data.json 로드 실패:", err.message);
}

function getRandomItem(array) {
    if (!array || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

// 1. 오늘의 말씀 (두란노 크롤링 수정됨)
async function getBibleVerse() {
    try {
        const response = await axios.get('https://www.duranno.com/qt/view/bible.asp', {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': USER_AGENT }
        });
        const decodedData = iconv.decode(response.data, 'EUC-KR');
        const $ = cheerio.load(decodedData);

        // 제목 가져오기
        const titleRef = $('.font-size h1 span').text().trim(); // 예: 여호수아 16 : 1~10
        const titleSub = $('.font-size h1 em').text().trim();   // 예: 말씀보다 자신들의...

        // 본문 가져오기 (div.bible 안의 모든 td 텍스트 합치기)
        let verseText = "";
        $('.bible table td').each((i, el) => {
            verseText += $(el).text().trim() + " ";
        });

        // 텍스트 정리 (너무 길면 자름)
        verseText = verseText.trim();
        if (verseText.length > 200) {
            verseText = verseText.substring(0, 200) + "...";
        }

        if (!verseText) throw new Error("본문을 찾을 수 없음");

        return `📖 *오늘의 말씀 (두란노 QT)*\n*${titleRef}* - ${titleSub}\n\n"${verseText}"\n\n[전체 보기](https://www.duranno.com/qt/view/bible.asp)`;
    } catch (error) {
        console.error("말씀 가져오기 실패:", error.message);
        return `📖 *오늘의 말씀*\n말씀을 가져오는 중 오류가 발생했습니다. 두란노 홈페이지를 확인해주세요.`;
    }
}

// 2. 리더십 인사이트 (엄선된 DB 랜덤)
async function getLeadershipInsight() {
    const item = getRandomItem(db.leadership_insights);
    if (!item) return "리더십 콘텐츠가 없습니다.";
    return `💡 *리더십 인사이트*\n[${item.title}](${item.link})\n_팀장님을 위한 추천 콘텐츠입니다._`;
}

// 3. 전문가 & 사업 인사이트 (지식 아티클)
async function getBusinessInsight() {
    const item = getRandomItem(db.business_knowledge);
    if (!item) return `💼 *사업 인사이트*\n준비된 콘텐츠가 없습니다.`;

    return `💼 *전문가 & 사업 인사이트*\n[${item.title}](${item.link})\n_성공적인 사업을 위한 필독 지식_`;
}

// 4. 보안 지식 (지식 아티클)
async function getSecurityTip() {
    const item = getRandomItem(db.security_knowledge);
    if (!item) return `🛡️ *보안 지식*\n준비된 콘텐츠가 없습니다.`;

    return `🛡️ *보안 지식 한 입*\n[${item.title}](${item.link})\n_알아두면 쓸모 있는 필수 보안 지식_`;
}

// 5. AI 활용 지식
async function getAIInsight() {
    const item = getRandomItem(db.ai_knowledge);
    if (!item) return `🤖 *AI 활용 팁*\n준비된 콘텐츠가 없습니다.`;

    return `🤖 *AI 활용 & 교육*\n[${item.title}](${item.link})\n_AI로 업무 효율을 높여보세요!_`;
}

async function generateDailyMessage() {
    const verse = await getBibleVerse();
    const leader = await getLeadershipInsight();
    const business = await getBusinessInsight();
    const ai = await getAIInsight();
    const security = await getSecurityTip();

    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });

    return `🌞 *TEAM LEADER's MORNING BRIEF* 🌞\n📅 ${dateString}\n\n${verse}\n\n${leader}\n\n${business}\n\n${ai}\n\n${security}\n\n오늘도 탁월한 리더십을 응원합니다!`;
}

module.exports = { generateDailyMessage };
