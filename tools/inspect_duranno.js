const axios = require('axios');
const iconv = require('iconv-lite');
const fs = require('fs');

(async () => {
    try {
        const response = await axios.get('https://www.duranno.com/qt/view/bible.asp', {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const decoded = iconv.decode(response.data, 'EUC-KR');
        fs.writeFileSync('duranno_dump.html', decoded);
        console.log("✅ Dumped to duranno_dump.html");
    } catch (e) {
        console.error(e.message);
    }
})();
