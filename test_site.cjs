const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function runTest() {
  console.log('Connecting to Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--window-size=1440,900',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  const errors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      errors.push(text);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(err.toString());
  });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // Wait 5 seconds for React & 3D canvas rendering
  console.log('Waiting 5s for 3D scene to initialize...');
  await new Promise((r) => setTimeout(r, 5500));

  console.log('Taking screenshot 1: Pre-Reveal Hero...');
  await page.screenshot({ path: 'public/screenshot_01_covered.png' });

  // Trigger reveal
  console.log('Clicking UNVEIL THE FUTURE...');
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const unveil = btns.find((b) => b.innerText && b.innerText.includes('UNVEIL THE FUTURE'));
    if (unveil) {
      unveil.click();
      return true;
    }
    return false;
  });

  if (clicked) {
    console.log('Unveil clicked successfully! Waiting for unveil animation...');
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: 'public/screenshot_02_revealed.png' });
  }

  // Scroll to Configurator
  console.log('Scrolling to Configurator...');
  await page.evaluate(() => {
    const conf = document.getElementById('configurator');
    if (conf) conf.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/screenshot_03_configurator.png' });

  // Open reservation modal
  console.log('Opening reservation modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const reserve = btns.find((b) => b.innerText && b.innerText.includes('PROCEED TO COMMISSION'));
    if (reserve) reserve.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/screenshot_04_modal.png' });

  await browser.close();

  console.log('\n--- TEST RESULTS ---');
  console.log('Total Console Messages:', consoleLogs.length);
  console.log('Console Errors count:', errors.length);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  } else {
    console.log('SUCCESS: Clean run with zero console errors!');
  }
}

runTest().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
