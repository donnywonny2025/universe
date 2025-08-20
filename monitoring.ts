import puppeteer from 'puppeteer';

const APP_URL = 'http://localhost:5173/';
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
    
    console.log(`🛰️  Navigating to ${APP_URL}...`);
    await page.goto(APP_URL, { waitUntil: 'networkidle2' });

    console.log('✅ Successfully navigated to the application.');
    console.log('👀 Pausing for 10 seconds for visual confirmation of the 3D scene...');
    await new Promise(resolve => setTimeout(resolve, 10000));

  } catch (error) {
    console.error('💥 Test failed:', error);
    console.error('\nCould not connect to a running Chrome instance. Please ensure it is running with the remote debugging flag, e.g.:');
    console.error('"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222');
    process.exit(1);
  } finally {
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