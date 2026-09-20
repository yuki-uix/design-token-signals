// Requires Playwright and its Chromium. Run against a local static server.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');

(async () => {
  const base = new URL(process.argv[2] || 'http://127.0.0.1:4200');
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch();
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'reading-case-'));
  const errors = [];
  const results = [];
  const near = (actual, expected, label) => assert(Math.abs(actual - expected) < 0.1, `${label}: ${actual} vs ${expected}`);
  try {
    const page = await browser.newPage({ deviceScaleFactor: 1, javaScriptEnabled: false });
    page.on('pageerror', error => errors.push(error.message));
    for (const viewport of [{ width: 1440, height: 1100 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      const response = await page.goto(new URL('conflicts/case-01/', base).href);
      assert(response.ok(), 'Case page must load');
      const panels = await page.locator('.case-panel').evaluateAll(elements => elements.map(el => {
        const card = el.querySelector('.reading-card');
        const copy = el.querySelector('.reading-copy');
        const title = el.querySelector('.reading-title');
        const paragraphs = [...copy.querySelectorAll('p')];
        const style = getComputedStyle(copy);
        const titleStyle = getComputedStyle(title);
        const cardStyle = getComputedStyle(card);
        return {
          variant: el.dataset.case,
          text: copy.textContent.replace(/\s+/g, ' ').trim(),
          title: title.textContent,
          fontSize: parseFloat(style.fontSize),
          lineHeight: parseFloat(style.lineHeight),
          titleLineHeight: parseFloat(titleStyle.lineHeight),
          titleFontSize: parseFloat(titleStyle.fontSize),
          paragraphGaps: paragraphs.slice(1).map((p, i) => p.getBoundingClientRect().top - paragraphs[i].getBoundingClientRect().bottom),
          bodyHeight: copy.getBoundingClientRect().height,
          bodyWidth: copy.getBoundingClientRect().width,
          controlled: {
            fontFamily: style.fontFamily, fontWeight: style.fontWeight,
            color: style.color, background: cardStyle.backgroundColor,
            radius: cardStyle.borderRadius, padding: cardStyle.padding,
            border: cardStyle.border, titleFont: titleStyle.fontFamily,
            titleSize: titleStyle.fontSize, titleWeight: titleStyle.fontWeight,
          },
        };
      }));
      assert.deepEqual(panels.map(p => p.variant), ['before', 'after', 'counterexample']);
      for (const [i, panel] of panels.entries()) {
        assert.equal(panel.text, panels[0].text, 'Body copy must be identical');
        assert.equal(panel.title, panels[0].title, 'Titles must be identical');
        assert.deepEqual(panel.controlled, panels[0].controlled, 'Do not change the controlled styling');
        near(panel.bodyWidth, panels[0].bodyWidth, 'Equal body width');
        near(panel.fontSize, 16, 'Body font size');
        near(panel.lineHeight, i === 0 ? 17.6 : 26.4, 'Body line height');
        assert.equal(panel.paragraphGaps.length, 2);
        panel.paragraphGaps.forEach(gap => near(gap, i === 0 ? 4 : 16, 'Rendered paragraph gap'));
        near(panel.titleLineHeight / panel.titleFontSize, i === 2 ? 1.1 : 1.4, 'Title leading');
      }
      assert(panels[1].bodyHeight > panels[0].bodyHeight, 'Restoring spacing must expose the height tradeoff');
      near(panels[1].bodyHeight, panels[2].bodyHeight, 'Title-only change preserves body height');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'No horizontal overflow');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').getAttribute('href'), '#comparison', 'First focus target is skip link');
      const screenshot = viewport.width === 1440
        ? path.join(root, 'conflicts/case-01/comparison-desktop.png')
        : path.join(temp, 'comparison-mobile.png');
      await page.locator('h1').click(); // Clear focus before the evidence screenshot.
      await page.screenshot({ path: screenshot, fullPage: true });
      results.push({ viewport, measurements: panels.map(({ text, title, controlled, ...values }) => values), screenshot });
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ browser: browser.version(), javaScriptEnabled: false, results, errors }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
