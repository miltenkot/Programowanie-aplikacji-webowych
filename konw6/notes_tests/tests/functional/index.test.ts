const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('localhost:8080');
    await page.screenshot({path: 'screen.png'});
    await page.waitForSelector('#inputTitle');
    await page.type('#inputTitle', 'noteTitle');
    await page.type('#inputText', 'kupic mleko');
    await page.click('#submitButton');
    await page.waitForSelector('#0');
    await page.screenshot({path: 'addedNote.png'})
    await browser.close();
})();