/**
 * conflicts/probe.js — 信号观测探针
 *
 * 用法：在目标页面的 DevTools Console 里粘贴执行，或用 Playwright 的 page.evaluate 运行。
 * 只读取计算样式，不修改页面。
 *
 * 这里的每一处护栏都对应 rules.md「测量口径」里的一条，而那些口径全部来自
 * 真实站点上的失败，不是事先设计的。改动前请先读那一节。
 */
(() => {
  const LO = 18, HI = 88;      // 饱和度只在此明度区间内可信（rules.md · 饱和度）
  const WARM = 6;              // R − B 超过此值才算色温声明（R-05）
  const HARD_OFFSET = 2;       // 硬阴影至少要有这么多偏移，否则是描边环不是投影（R-09）

  /**
   * 颜色解析：必须光栅化，不能用正则抠数字。
   * 实测 gumroad.com 的链接描边是 oklch(0.872 0.01 258.338)，
   * 朴素正则把 L 当 R、C 当 G、H(258.338) 当 B，产出非法的 '#0100102'，
   * 还伪造出一个 h240 s100 的高饱和幽灵色，直接污染了 accent 识别。
   * 画一个像素再读回 sRGB 字节，对 oklch / lab / color() / hwb 全部正确。
   */
  const _cv = document.createElement('canvas'); _cv.width = _cv.height = 1;
  const _ctx = _cv.getContext('2d', { willReadFrequently: true });
  let unparsedColors = 0;
  /** 双哨兵：两个不同起始值下结果一致，才说明这个颜色值被解析器接受了。
   *  旧写法用「结果是否等于 #000 + 黑色白名单正则」判断，而正则要求逗号，
   *  于是合法的 `rgb(0 0 0)` / `rgba(0 0 0 / 1)` 被误计为无法解析。 */
  const accepted = css => {
    _ctx.fillStyle = '#010203'; _ctx.fillStyle = css; const a = _ctx.fillStyle;
    _ctx.fillStyle = '#040506'; _ctx.fillStyle = css; const b = _ctx.fillStyle;
    return a === b;
  };
  const rgb = css => {
    const v = String(css).trim();
    if (!v || v === 'none' || v === 'transparent') return null;
    try {
      if (!accepted(v)) { unparsedColors++; return null; }
      _ctx.clearRect(0, 0, 1, 1);
      _ctx.fillStyle = v;
      _ctx.fillRect(0, 0, 1, 1);
      const d = _ctx.getImageData(0, 0, 1, 1).data;
      const a = +(d[3] / 255).toFixed(3);
      if (a < 0.05) return null;
      // 半透明色光栅化后 RGB 会被底色稀释，色相饱和度不可信
      return { r: d[0], g: d[1], b: d[2], a, diluted: a < 0.3,
        hex: '#' + [d[0], d[1], d[2]].map(x => x.toString(16).padStart(2, '0')).join('') };
    } catch (e) { unparsedColors++; return null; }
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

  const inBand = H => H.l >= LO && H.l <= HI;

  /** 字体类别：只看第一 family，且必须先排除 sans-serif（rules.md · 字体类别） */
  const classifyFont = stack => {
    const first = String(stack).split(',')[0].replace(/["']/g, '').trim();
    if (/sans[-\s]?serif/i.test(first)) return 'sans';
    if (/serif|georgia|times|garamond|playfair|charter|tiempos/i.test(first)) return 'serif';
    if (/mono|code|consol/i.test(first)) return 'mono';
    return 'unknown';                                      // 自定义字体无法按名称判定，不猜
  };

  /** 顶层逗号拆分：rgba(...) 内部的逗号不能算分隔符 */
  const splitTop = str => {
    const out = []; let depth = 0, cur = '';
    for (const ch of String(str)) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur);
    return out;
  };

  /**
   * 解析单条 box-shadow。
   * 必须先剥掉颜色函数再取长度——否则正则会先命中 rgba() 里的通道值，
   * 把 `rgba(0,0,0,.25) 0 2px 32px 0` 的 blur 读成 0。这是实测抓到的缺陷。
   */
  /** 只取 alpha，纯函数，不依赖 canvas —— 这样 parseShadow 可以在 node 里被测试 */
  const alphaOf = str => {
    const s = String(str);
    const fn = s.match(/(?:rgba|hsla)\(([^)]*)\)/i);
    if (fn) { const parts = fn[1].split(/[,\/]/).map(x => x.trim()).filter(Boolean);
      if (parts.length >= 4) { const a = parts[3];
        return a.endsWith('%') ? parseFloat(a) / 100 : parseFloat(a); } }
    const slash = s.match(/\/\s*([\d.]+%?)\s*\)/);      // 现代语法 rgb(0 0 0 / .4)
    if (slash) return slash[1].endsWith('%') ? parseFloat(slash[1]) / 100 : parseFloat(slash[1]);
    const hex8 = s.match(/#[0-9a-fA-F]{8}\b/);
    if (hex8) return parseInt(hex8[0].slice(7, 9), 16) / 255;
    return 1;
  };

  const parseShadow = part => {
    const lens = String(part)
      .replace(/(rgba?|hsla?|oklch|oklab|lab|lch|hwb|color)\([^)]*\)/g, ' ')
      .replace(/#[0-9a-fA-F]{3,8}/g, ' ')
      .match(/-?[\d.]+(?:px|r?em)?/g) || [];
    const n = lens.map(parseFloat);
    return {
      offsetX: n[0] ?? 0, offsetY: n[1] ?? 0, blur: n[2] ?? 0, spread: n[3] ?? 0,
      alpha: alphaOf(part), inset: /inset/.test(part),
    };
  };

  /**
   * 「控件」与「小形状元素」是两个不同的集合，必须分开：
   *  - onControl 与 radius 用控件集合。旧写法 /btn|button|input|select/ 只匹配 className，
   *    而原生 <input> / <select> / <textarea> 的 className 通常为空，按标签根本进不来；
   *    [role="button"] 也进不来——但它在 CTA 扫描里是被收的，两个口径因此不一致。
   *  - radiusSmallElements 用小形状集合。R-07 明确写的是「按钮、输入框、卡片」，
   *    而卡片不是控件，旧写法把它整个排除在外。
   */
  const CONTROL_SEL = 'button, a, input, select, textarea, [role="button"], [role="link"]';
  const isControl = (el, cls) => {
    try { if (el.matches(CONTROL_SEL)) return true; } catch (e) { /* SVG 等没有 matches */ }
    return /btn|button/i.test(cls);
  };
  /**
   * R-07 的统计口径是「按钮、输入框、卡片」，**不含普通链接**。
   * 复用 isControl 会把每个小 <a> 和 [role="link"] 都算进 radiusSmallElements，
   * 改变圆角分布进而改变 R-07 的结论，所以这里用独立的选择器。
   */
  const SHAPE_SEL = 'button, input, select, textarea, [role="button"]';
  const isSmallShape = (el, cls) => {
    try { if (el.matches(SHAPE_SEL)) return true; } catch (e) { /* SVG 等没有 matches */ }
    return /btn|button|card|tile|panel/i.test(cls);
  };

  const isDecorative = el =>
    /svg|canvas|picture|img/i.test(el.tagName) ||
    el.closest('svg, figure, [aria-hidden="true"], [role="presentation"]');

  const ownText = el => {
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) return true;
    return false;
  };

  const EDGE_PROPS = [
    ['borderTopWidth', 'borderTopColor'], ['borderRightWidth', 'borderRightColor'],
    ['borderBottomWidth', 'borderBottomColor'], ['borderLeftWidth', 'borderLeftColor'],
    ['outlineWidth', 'outlineColor'],
  ];

  const buckets = { pill: 0, '0px': 0, '1-4px': 0, '5-12px': 0, '13-24px': 0, '>24px': 0 };
  const smallBuckets = { ...buckets };        // 只统计按钮/输入框/卡片这类小元素（R-07）
  const colorUse = {};                        // hex -> {roles, tags, area, onControl, onText}
  const shadows = { hard: 0, soft: 0, ring: 0, samples: [] };
  const borders = { thickDark: 0 };
  const gradients = { total: 0, onControl: 0, samples: [] };
  const fontClasses = {}, weights = [], leadings = [];
  const accentVars = [];
  let unreadableSheets = 0;

  // ── accent 第 1 来源：命名含 accent / primary / brand 的自定义属性 ──
  const rootCs = getComputedStyle(document.documentElement);
  const seen = new Set();
  for (const sheet of [...document.styleSheets]) {
    let rules;
    try { rules = sheet.cssRules; } catch (e) { unreadableSheets++; continue; }   // 跨域，静默会掩盖退化
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

  // ── accent 第 2 来源：首屏内面积最大、背景非中性的按钮 ──
  /**
   * 可见性：不能只看尺寸和位置。
   * linear.app 的「Skip to content」跳转链接位于顶部、有尺寸、带品牌色，
   * 旧筛选条件直接把它当成主 CTA——而任何带 skip link 的站点都会中招，
   * 这是系统性偏差，不是偶然。用 elementFromPoint 确认它确实被画在最上层。
   */
  const visible = (el, r) => {
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.1) return false;
    if (r.bottom <= 0 || r.right <= 0 || r.left >= innerWidth || r.top >= innerHeight) return false;
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!hit && (hit === el || el.contains(hit) || hit.contains(el));
  };

  const ctaCandidates = [];
  for (const el of document.querySelectorAll('button, a, [role="button"]')) {
    const r = el.getBoundingClientRect();
    if (r.top > 900 || r.width < 60 || r.height < 24) continue;
    if (!visible(el, r)) continue;
    const c = rgb(getComputedStyle(el).backgroundColor);
    if (!c) continue;
    const H = hsl(c);
    // 明度护栏必须和 colorUsage 用同一道：近黑/近白色的 HSL 饱和度不可信
    // （rgb(1,0,16) 算出来是 100%），否则一个近黑的大按钮能凭假饱和度当上主 CTA。
    if (!inBand(H) || H.s < 15) continue;          // 区间外不判定；中性色不是 accent
    ctaCandidates.push({ area: Math.round(r.width * r.height), hex: c.hex, ...H, text: (el.textContent || '').trim().slice(0, 24) });
  }
  ctaCandidates.sort((a, b) => b.area - a.area);

  for (const el of [...document.querySelectorAll('*')].slice(0, 4000)) {
    const cs = getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    const cls = String(el.className || '');
    const interactive = isControl(el, cls);
    const rect = el.getBoundingClientRect();
    const isSmall = rect.width > 0 && rect.width <= 480 && rect.height <= 120;
    const shape = isSmallShape(el, cls);

    if (interactive || shape) {
      const raw = cs.borderRadius.split(' ')[0];
      const px = parseFloat(raw) || 0;
      // pill 单列：border-radius:9999px 的计算值是 1.67772e+07px（rules.md · 圆角）
      const key = (px > 500 || raw.includes('%')) ? 'pill'
        : px === 0 ? '0px' : px <= 4 ? '1-4px' : px <= 12 ? '5-12px' : px <= 24 ? '13-24px' : '>24px';
      if (interactive) buckets[key]++;
      if (shape && isSmall) smallBuckets[key]++;   // R-07 要的是按钮、输入框、卡片
    }

    // 颜色用量：记录角色、承载标签、可见面积（R-06 靠这三项判定，不靠出现次数）
    if (!isDecorative(el)) {
      const roles = [['backgroundColor', 'bg'], ['color', 'text'], ['borderTopColor', 'border']];
      for (const [prop, role] of roles) {
        const c = rgb(cs[prop]); if (!c) continue;
        const H = hsl(c);
        if (!inBand(H) || H.s < 55) continue;
        if (role === 'text' && !ownText(el)) continue;      // 继承来的文字色不算使用
        if (role === 'border' && parseFloat(cs.borderTopWidth) === 0) continue;
        const k = c.hex;
        colorUse[k] = colorUse[k] || { hex: c.hex, ...H, roles: new Set(), tags: new Set(), rects: [], onControl: 0, n: 0 };
        colorUse[k].roles.add(role);
        colorUse[k].tags.add(tag);
        colorUse[k].n++;
        if (interactive) colorUse[k].onControl++;
        // 收原始矩形；裁剪视口与求并集都放在 coverageOf 里，那是纯函数，可被测试覆盖
        if (role === 'bg' && rect.width > 0 && rect.height > 0)
          colorUse[k].rects.push([rect.left, rect.top, rect.right, rect.bottom]);
      }
    }

    if (/^h[1-6]$|^p$/.test(tag)) {
      const fc = classifyFont(cs.fontFamily);
      fontClasses[fc] = (fontClasses[fc] || 0) + 1;
      if (/^h[1-3]$/.test(tag)) weights.push(parseInt(cs.fontWeight, 10));
      if (tag === 'p') {
        const ratio = parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
        if (isFinite(ratio)) leadings.push(+ratio.toFixed(2));
      }
    }

    // 阴影：排除焦点态（R-09 的误判条款）
    const sh = cs.boxShadow;
    if (sh && sh !== 'none' && !el.matches(':focus, :focus-visible, :focus-within')) {
      for (const part of splitTop(sh)) {
        const p = parseShadow(part);
        if (p.alpha < 0.08) continue;                        // 透明阴影不表达任何语汇
        if (p.blur === 0) {
          if (Math.abs(p.offsetX) >= HARD_OFFSET || Math.abs(p.offsetY) >= HARD_OFFSET) {
            shadows.hard++;
            if (shadows.samples.length < 3) shadows.samples.push(part.trim().slice(0, 56));
          } else shadows.ring++;                             // 0 偏移 0 模糊是描边环，不是硬投影
        } else if (p.blur >= 6) shadows.soft++;
      }
    }

    // R-03 豁免的第二条判据：≥2px 的近黑描边。
    // 文档写的是「border 或 outline」，只查 borderTop 会让 outline-only 的 brutalist 控件
    // 和只在其他边加粗描边的元素漏掉，R-03 于是报出一个本该被豁免抑制的冲突。
    for (const [wProp, cProp] of EDGE_PROPS) {
      if ((parseFloat(cs[wProp]) || 0) < 2) continue;
      if (wProp === 'outlineWidth' && cs.outlineStyle === 'none') continue;
      const ec = rgb(cs[cProp]);
      if (ec && hsl(ec).l <= 20) { borders.thickDark++; break; }   // 同一元素只计一次
    }

    // R-08：渐变，且是否进入 UI 控件
    const bi = cs.backgroundImage;
    if (bi && bi.includes('gradient(')) {
      const stops = (bi.match(/(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8})/g) || []).length;
      if (stops >= 2) {
        gradients.total++;
        if (interactive) gradients.onControl++;
        if (gradients.samples.length < 2) gradients.samples.push(bi.slice(0, 64));
      }
    }
  }

  const bg = rgb(getComputedStyle(document.body).backgroundColor);
  const share = o => { const t = Object.values(o).reduce((a, b) => a + b, 0);
    const d = Object.entries(o).sort((a, b) => b[1] - a[1])[0] || ['n/a', 0];
    return { buckets: o, dominant: d[0], dominantShare: t ? +(d[1] / t).toFixed(2) : 0,
      // 占比不足 0.5 表示这个界面没有统一形状语言，依赖主圆角桶的规则必须先报告这一点
      hasUnifiedShapeLanguage: t ? d[1] / t >= 0.5 : null };
  };
  const median = a => a.length ? a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)] : null;
  const viewport = innerWidth * innerHeight;

  /**
   * 覆盖率 = 视口内并集面积 / 视口面积。
   * 旧实现是「每个元素盒面积直接累加」，既不裁视口也不去重叠：
   * gumroad.com 的 6 个 #ffc900 元素全在首屏之外，真实首屏覆盖率为 0，
   * 旧算法却报 0.513——规则写的是「覆盖首屏可见面积」，测的却完全是另一个量。
   * 这里按 8px 网格求并集，误差上界是一个网格的边长。
   */
  const GRID = 8;
  /** 纯函数，便于在 node 里定点测试：矩形并集面积，按 grid 网格采样 */
  const unionArea = (rects, grid) => {
    if (!rects || !rects.length) return 0;
    const cells = new Set();
    for (const [x1, y1, x2, y2] of rects)
      for (let x = Math.floor(x1 / grid); x < Math.ceil(x2 / grid); x++)
        for (let y = Math.floor(y1 / grid); y < Math.ceil(y2 / grid); y++) cells.add(x + ',' + y);
    return cells.size * grid * grid;
  };
  /** 纯函数：裁进视口 → 求并集 → 除以视口面积 → 定点。四步都在这里，便于定点测试 */
  const clipToViewport = (rects, vw, vh) => (rects || [])
    .map(([x1, y1, x2, y2]) => [Math.max(x1, 0), Math.max(y1, 0), Math.min(x2, vw), Math.min(y2, vh)])
    .filter(([x1, y1, x2, y2]) => x2 > x1 && y2 > y1);
  // 网格向上取整会让铺满视口的矩形略超 1：1512×862 下是 1.00232，定点后成 1.002。
  // 覆盖率按定义不可能超过 1，钳位在这里，不要留给调用方。
  const coverageOf = (rects, vw, vh, grid) =>
    +Math.min(1, unionArea(clipToViewport(rects, vw, vh), grid) / (vw * vh)).toFixed(3);
  const coverage = rects => coverageOf(rects, innerWidth, innerHeight, GRID);

  const accent = accentVars.length ? { ...accentVars[0], source: 'css-var' }
    : ctaCandidates.length ? { ...ctaCandidates[0], source: 'primary-cta' }
    : (() => {
        const onCtl = Object.values(colorUse).filter(c => c.onControl > 0);
        // 文档写的是「饱和度最高……**同分时**背景色优先于描边色」。
        // 把背景角色当主键会让 55% 饱和的背景打败 100% 饱和的控件色，与文档相反。
        const ranked = onCtl.sort((a, b) =>
          (b.s - a.s) || (b.roles.has('bg') - a.roles.has('bg')) || (b.onControl - a.onControl));
        const best = ranked[0];
        return best ? { hex: best.hex, h: best.h, s: best.s, l: best.l, source: 'most-saturated-control' } : { source: 'none' };
      })();

  return {
    url: location.host,
    // 测量条件。coverage 是「视口内」覆盖率，换视口或滚动位置结果就不同，
    // 不带上这两个字段，任何标定值都无法复现，也无法判断拿到的是哪一次的口径。
    // scrollY 可能是亚像素值。四舍五入会把 0 < scrollY < 0.5 报成 atTop:true，
    // 而那时页面已经不在标定所要求的位置上了。保留原值，直接和 0 比。
    conditions: { viewport: `${innerWidth}x${innerHeight}`, scrollY, atTop: scrollY === 0 },
    background: bg ? { ...bg, ...hsl(bg), warmth: bg.r - bg.b, isWarm: bg.r - bg.b > WARM } : null,
    radius: share(buckets),
    radiusSmallElements: share(smallBuckets),      // R-07 只看这个
    accent,
    accentSources: { cssVars: accentVars.length, ctaCandidates: ctaCandidates.slice(0, 3),
      unreadableSheets, unparsedColors },
    colorUsage: Object.values(colorUse)
      .map(c => ({ hex: c.hex, h: c.h, s: c.s, l: c.l, n: c.n,
        roles: [...c.roles], roleCount: c.roles.size,
        tags: [...c.tags].slice(0, 6), tagCount: c.tags.size,
        onControl: c.onControl, coverage: coverage(c.rects) }))
      // 不截断：R-06 要判的可能是一个出现次数很低、但覆盖面积很大的颜色，
      // 按 n 排序再切前 8 会把它丢掉。改按覆盖率排，全部返回。
      // colorUse 只收明度区间内饱和度 ≥55 的颜色，实测每页 1–6 个，不会失控。
      .sort((a, b) => (b.coverage - a.coverage) || (b.n - a.n)),
    fontClasses,
    headWeightMedian: median(weights),
    bodyLeadingMedian: median(leadings),
    shadows, borders, gradients,
    _note: 'accent.source 为 none 时，依赖 accent 的规则无输入，应报告无法判定而不是判否；'
         + 'coverage 是视口内并集覆盖率，不是盒面积累加；conditions.atTop 为 false 时它不可与标定值比较。'
         + 'fontClasses 为 unknown 时同理。unreadableSheets / unparsedColors > 0 表示有输入未被读到，'
         + '结论的覆盖面相应缩小，不要当成"没有问题"。',
  };
})()
