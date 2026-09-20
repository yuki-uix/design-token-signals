/**
 * conflicts/probe.js — 信号观测探针
 *
 * 用法：在目标页面的 DevTools Console 里粘贴执行，或用 Playwright 的 page.evaluate 运行。
 * 只读取计算样式，不修改页面。
 *
 * 这个探针的每一处护栏都对应 rules.md「测量口径」里的一条，
 * 而那些口径全部来自真实站点上的失败，不是事先设计的。改动前请先读那一节。
 */
(() => {
  const LO = 18, HI = 88;          // 饱和度只在此明度区间内可信（见 rules.md · 饱和度）
  const WARM_THRESHOLD = 6;        // R − B 超过此值才算色温声明（见 R-05）

  const rgb = c => {
    const m = String(c).match(/[\d.]+/g);
    if (!m) return null;
    const [r, g, b] = m.slice(0, 3).map(Number);
    if (m.length > 3 && Number(m[3]) < 0.5) return null;   // 近乎透明的不计入
    return { r, g, b, hex: '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('') };
  };

  const hsl = ({ r, g, b }) => {
    const R = r / 255, G = g / 255, B = b / 255;
    const mx = Math.max(R, G, B), mn = Math.min(R, G, B), d = mx - mn;
    let h = 0;
    if (d) h = mx === R ? 60 * (((G - B) / d) % 6) : mx === G ? 60 * ((B - R) / d + 2) : 60 * ((R - G) / d + 4);
    if (h < 0) h += 360;
    const l = (mx + mn) / 2;
    let s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
    s = Math.min(s, 1);                                    // 浮点误差会算出 >100
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  /** 字体类别：只看第一 family，且必须先排除 sans-serif（见 rules.md · 字体类别） */
  const classifyFont = stack => {
    const first = String(stack).split(',')[0].replace(/["']/g, '').trim();
    if (/sans[-\s]?serif/i.test(first)) return 'sans';
    if (/serif|georgia|times|garamond|playfair|charter|tiempos/i.test(first)) return 'serif';
    if (/mono|code|consol/i.test(first)) return 'mono';
    return 'unknown';                                      // 自定义字体无法按名称判定，不猜
  };

  const buckets = { pill: 0, '0px': 0, '1-4px': 0, '5-12px': 0, '13-24px': 0, '>24px': 0 };
  const saturated = {}, shadows = { hard: 0, soft: 0, samples: [] };
  const fontClasses = {}, weights = [], leadings = [];
  const accentVars = [];

  // accent 优先来源：命名含 accent / primary / brand 的自定义属性
  const rootCs = getComputedStyle(document.documentElement);
  const seen = new Set();
  for (const sheet of [...document.styleSheets]) {
    let rules; try { rules = sheet.cssRules; } catch (e) { continue; }   // 跨域样式表读不到
    for (const r of rules || []) {
      if (!r.style) continue;
      for (const prop of r.style) {
        if (!prop.startsWith('--') || seen.has(prop)) continue;
        seen.add(prop);
        if (!/accent|primary|brand/i.test(prop)) continue;
        const c = rgb(rootCs.getPropertyValue(prop).trim());
        if (c) accentVars.push({ prop, hex: c.hex, ...hsl(c) });
      }
    }
  }

  const isDecorative = el =>
    /svg|canvas|picture|img/i.test(el.tagName) || el.closest('svg, figure, [aria-hidden="true"]');

  for (const el of [...document.querySelectorAll('*')].slice(0, 4000)) {
    const cs = getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    const interactive = tag === 'button' || tag === 'a' || /btn|button|input|select/i.test(String(el.className || ''));

    if (interactive) {
      const raw = cs.borderRadius.split(' ')[0];
      const px = parseFloat(raw) || 0;
      // pill 必须单列：border-radius:9999px 的计算值是 1.67772e+07px（见 rules.md · 圆角）
      if (px > 500 || raw.includes('%')) buckets.pill++;
      else if (px === 0) buckets['0px']++;
      else if (px <= 4) buckets['1-4px']++;
      else if (px <= 12) buckets['5-12px']++;
      else if (px <= 24) buckets['13-24px']++;
      else buckets['>24px']++;
    }

    // 只统计交互控件与内容区，装饰图形不计入（见 rules.md · 统计范围 / R-06）
    if (!isDecorative(el)) {
      for (const prop of ['backgroundColor', 'color', 'borderTopColor']) {
        const c = rgb(cs[prop]); if (!c) continue;
        const H = hsl(c);
        if (H.l >= LO && H.l <= HI && H.s >= 55) {
          const k = `${c.hex} h${H.h} s${H.s} l${H.l}`;
          saturated[k] = saturated[k] || { n: 0, where: new Set() };
          saturated[k].n++;
          saturated[k].where.add(interactive ? 'control' : tag);
        }
      }
    }

    if (/^h[1-6]$|^p$/.test(tag)) {
      const cls = classifyFont(cs.fontFamily);
      fontClasses[cls] = (fontClasses[cls] || 0) + 1;
      if (/^h[1-3]$/.test(tag)) weights.push(parseInt(cs.fontWeight, 10));
      if (tag === 'p') {
        const ratio = parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
        if (isFinite(ratio)) leadings.push(+ratio.toFixed(2));
      }
    }

    const sh = cs.boxShadow;
    if (sh && sh !== 'none') {
      // blur 是第三个长度值，可能写作无单位的 0
      const nums = String(sh).match(/(-?[\d.]+)(px)?/g);
      if (nums && nums.length >= 3) {
        const blur = parseFloat(nums[2]);
        if (blur === 0) { shadows.hard++; if (shadows.samples.length < 3) shadows.samples.push(sh.slice(0, 60)); }
        else if (blur >= 6) shadows.soft++;
      }
    }
  }

  const bg = rgb(getComputedStyle(document.body).backgroundColor);
  const totalRadius = Object.values(buckets).reduce((a, b) => a + b, 0);
  const domBucket = Object.entries(buckets).sort((a, b) => b[1] - a[1])[0] || ['n/a', 0];
  const median = a => a.length ? a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)] : null;

  return {
    url: location.host,
    background: bg ? { ...bg, ...hsl(bg), warmth: bg.r - bg.b, isWarm: bg.r - bg.b > WARM_THRESHOLD } : null,
    radius: {
      buckets,
      dominant: domBucket[0],
      dominantShare: totalRadius ? +(domBucket[1] / totalRadius).toFixed(2) : 0,
      // 占比不足 0.5 说明这个界面本身没有统一形状语言，应先报告再谈冲突（见 rules.md · 圆角）
      hasUnifiedShapeLanguage: totalRadius ? domBucket[1] / totalRadius >= 0.5 : null,
    },
    accentVars,
    saturatedColors: Object.entries(saturated)
      .map(([k, v]) => ({ sig: k, n: v.n, where: [...v.where] }))
      .sort((a, b) => b.n - a.n).slice(0, 6),
    fontClasses,
    headWeightMedian: median(weights),
    bodyLeadingMedian: median(leadings),
    shadows,
    _note: 'accent 不可按频次判定；字体 unknown 时依赖字体类别的规则应跳过而非猜测。',
  };
})()
