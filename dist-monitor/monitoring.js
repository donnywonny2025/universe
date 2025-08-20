import puppeteer from 'puppeteer';
const HELLO_URL = 'http://localhost:5173/hello.html';
const BROWSER_URL = 'http://127.0.0.1:9222'; // Default remote debugging port
async function runMonitoring() {
    let browser;
    let page;
    try {
        console.log(`🚀 Attempting to connect to Chrome at ${BROWSER_URL}...`);
        browser = await puppeteer.connect({ browserURL: BROWSER_URL });
        console.log('✅ Successfully connected to browser.');
        // Explicitly open a new page to make the action visible
        page = await browser.newPage();
        console.log('📄 New tab opened.');
        console.log(`🛰️  Navigating to ${HELLO_URL}...`);
        await page.goto(HELLO_URL, { waitUntil: 'networkidle2' });
        const headerContent = await page.$eval('h1', (el) => el.textContent);
        if (headerContent === 'Hello World') {
            console.log('✅ Success: Found "Hello World" in the h1 tag.');
        }
        else {
            console.error(`💥 Failure: Expected "Hello World", but found "${headerContent}".`);
        }
        console.log('👀 Pausing for 5 seconds for visual confirmation...');
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    catch (error) {
        console.error('💥 Test failed:', error);
        console.error('\nCould not connect to a running Chrome instance. Please ensure it is running with the remote debugging flag, e.g.:');
        console.error('"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222');
        process.exit(1);
    }
    finally {
        if (page) {
            console.log('🏃 Closing the test tab.');
            await page.close();
        }
        if (browser) {
            await browser.disconnect();
            console.log('🔌 Disconnected from browser.');
        }
    }
}
runMonitoring();
