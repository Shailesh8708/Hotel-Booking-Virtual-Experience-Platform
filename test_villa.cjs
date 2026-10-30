const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testVilla() {
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

  console.log('Navigating to Villa Aurelia at http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 2000));

  console.log('Taking screenshot 1: Day Theme Hero...');
  await page.screenshot({ path: 'public/villa_01_day_hero.png' });

  // Test Day / Night Toggle
  console.log('Toggling to Night theme...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const themeBtn = btns.find((b) => b.innerText && (b.innerText.includes('Day') || b.innerText.includes('Night')));
    if (themeBtn) themeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  console.log('Taking screenshot 2: Night Theme Hero...');
  await page.screenshot({ path: 'public/villa_02_night_hero.png' });

  // Scroll to Spaces section and select The Kitchen
  console.log('Navigating to Spaces section...');
  await page.evaluate(() => {
    document.getElementById('spaces')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const kitchen = btns.find((b) => b.innerText && b.innerText.includes('The Kitchen'));
    if (kitchen) kitchen.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  console.log('Taking screenshot 3: Spaces section...');
  await page.screenshot({ path: 'public/villa_03_spaces.png' });

  // Scroll to Sunset Experience
  console.log('Navigating to Sunset experience...');
  await page.evaluate(() => {
    document.getElementById('sunset')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Taking screenshot 4: Sunset experience...');
  await page.screenshot({ path: 'public/villa_04_sunset.png' });

  // Open All Photos Gallery Modal
  console.log('Opening All Photos gallery modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const gal = btns.find((b) => b.innerText && b.innerText.includes('Show all photos'));
    if (gal) gal.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  console.log('Taking screenshot 5: All Photos modal...');
  await page.screenshot({ path: 'public/villa_05_gallery.png' });

  // Close gallery modal & Scroll to Booking
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close Gallery"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  await page.evaluate(() => {
    document.getElementById('booking')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Taking screenshot 6: Booking Section...');
  await page.screenshot({ path: 'public/villa_06_booking.png' });

  await browser.close();

  console.log('\n--- VILLA AURELIA TEST RESULTS ---');
  console.log('Total Console Messages:', consoleLogs.length);
  console.log('Console Errors:', errors.length);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  } else {
    console.log('SUCCESS: Flawless execution with ZERO console errors!');
  }
}

testVilla().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

