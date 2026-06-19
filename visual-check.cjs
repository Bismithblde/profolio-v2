const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'desktop-3s.png', fullPage: false });
  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const letters = Array.from(document.querySelectorAll('.hero-word span')).slice(0, 5).map((el) => {
      const s = getComputedStyle(el);
      return { text: el.textContent, color: s.color, opacity: s.opacity, transform: s.transform };
    });
    const h1Style = h1 ? getComputedStyle(h1) : null;
    return {
      h1Text: h1?.textContent,
      h1Rect: h1?.getBoundingClientRect().toJSON(),
      h1Color: h1Style?.color,
      h1Opacity: h1Style?.opacity,
      h1Transform: h1Style?.transform,
      letters,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'projects-3s.png', fullPage: false });
  await browser.close();
})();
