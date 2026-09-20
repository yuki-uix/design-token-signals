// Requires Playwright (with Chromium installed) and ffmpeg on PATH.
// Start the repository's static server, then run:
// node scripts/capture-readme-media.cjs http://127.0.0.1:4200
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');

(async () => {
  const base = new URL(process.argv[2] || 'http://127.0.0.1:4200');
  const root = path.resolve(__dirname, '..');
  const output = path.join(root, 'docs/images');
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'design-token-media-'));
  const browser = await chromium.launch();
  const errors = [];
  const watch = page => page.on('pageerror', error => errors.push(error.message));
  const settle = async page => {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500); // Allow the theme transition to finish.
  };
  try {
    await fs.mkdir(output, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    watch(page);
    const profiles = [
      ['clean-light', 'Clean Light', 'Trust · Professional · Clarity'],
      ['minimal-dark', 'Minimal Dark', 'Precision · Focus · Professional'],
      ['warm-organic', 'Warm Organic', 'Humanity · Warmth · Thoughtful'],
    ];
    const panels = [];
    for (const [theme, label, signal] of profiles) {
      await page.goto(new URL(`demo.html#${theme}`, base).href);
      await page.locator(`body[data-theme="${theme}"]`).waitFor();
      await settle(page);
      // Crop the same hero region from each actual demo; leave its content untouched.
      const png = await page.screenshot({ clip: { x: 0, y: 80, width: 1172, height: 470 } });
      panels.push(`<section><h2>${label}</h2><p>${signal}</p><img alt="${label} demo hero" src="data:image/png;base64,${png.toString('base64')}"></section>`);
    }
    // Only the outer labels/layout are composed; the UI panels are real screenshots.
    const sheet = await browser.newPage({ viewport: { width: 1240, height: 980 }, deviceScaleFactor: 1 });
    await sheet.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>
      *{box-sizing:border-box}body{margin:0;padding:24px;background:#eceef1;color:#17191d;font-family:Arial,sans-serif}
      h1{font-size:24px;margin:0 0 6px}.intro{font-size:15px;margin:0 0 20px;color:#4d5360}
      section{display:grid;grid-template-columns:270px 1fr;grid-template-rows:auto auto;align-content:center;margin:0 0 16px;background:white;border:1px solid #d5d8de;border-radius:10px;overflow:hidden}
      h2{grid-column:1;grid-row:1;align-self:end;font-size:23px;padding:0 24px;margin:0 0 10px}
      section p{grid-column:1;grid-row:2;align-self:start;font-size:15px;line-height:1.5;padding:0 24px;margin:0;color:#4d5360}
      img{display:block;grid-column:2;grid-row:1 / 3;width:100%;height:auto}
    </style><h1>Three profiles. One demo template.</h1><p class="intro">Actual browser captures · theme tokens and profile copy change together.</p>${panels.join('')}</html>`);
    await sheet.locator('img').evaluateAll(imgs => Promise.all(imgs.map(img => img.decode())));
    await sheet.screenshot({ path: path.join(output, 'theme-comparison.png'), fullPage: true });
    await sheet.close();
    await page.close();

    const context = await browser.newContext({
      viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1,
      recordVideo: { dir: temp, size: { width: 1200, height: 800 } },
    });
    const demo = await context.newPage();
    watch(demo);
    await demo.goto(base.href);
    await demo.locator('#theme-search').evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    await demo.evaluate(() => window.scrollBy({ top: -100, behavior: 'instant' }));
    await settle(demo);
    await demo.waitForTimeout(1400);
    await demo.locator('#theme-search').pressSequentially('minimal', { delay: 160 });
    await demo.waitForTimeout(1600);
    await demo.locator('.profile-card:visible[href*="minimal-dark"]').click();
    await demo.locator('body[data-theme="minimal-dark"]').waitFor();
    await settle(demo);
    await demo.waitForTimeout(2200);
    const downloadEvent = demo.waitForEvent('download');
    await demo.locator('#export-signal-btn').click();
    const download = await downloadEvent;
    assert.equal(download.suggestedFilename(), 'minimal-dark.signal.md');
    assert.equal(await download.failure(), null);
    assert.equal(await fs.readFile(await download.path(), 'utf8'),
      await fs.readFile(path.join(root, 'examples/minimal-dark/minimal-dark.signal.md'), 'utf8'));
    await demo.locator('#signal-guide').waitFor();
    await demo.waitForTimeout(3600);
    const video = demo.video();
    await context.close();
    const source = await video.path();
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', source,
      '-filter_complex', '[0:v]fps=8,scale=1000:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3',
      '-loop', '0', path.join(output, 'choose-and-export.gif')]);
    const bytes = (await fs.stat(path.join(output, 'choose-and-export.gif'))).size;
    assert(bytes < 5_000_000, `GIF exceeds 5 MB: ${bytes}`);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ profiles: profiles.map(p => p[0]), gifBytes: bytes,
      downloadMatchesSample: true, browserErrors: errors, temporaryVideo: source }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
