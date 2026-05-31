/* ═══════════════════════════════════════════════════
   design-token-signals · demo page script
   Extracted from demo.html — single source of truth
   ═══════════════════════════════════════════════════ */

const THEMES = {
  'clean-light': {
    label: 'Clean Light',
    signal: 'Trust · Professional · Clarity',
    motion: '200ms · ease',
    meta: {
      tagline: 'Trust · Professional · Clarity',
      useCases: ['SaaS 产品官网', '金融/支付工具', 'B2B 管理平台', '团队协作工具'],
      antiCases: ['游戏/娱乐产品', '强品牌个性的消费类应用'],
      rationale: '低饱和度蓝紫 accent + 浅灰白背景 + 中等字重，传递可信赖感；8px 圆角保持亲和而不失专业',
      brandExamples: ['Stripe', 'Linear', 'Notion'],
    },
    navCta: 'Get started',
    badge: 'Now available · Public beta',
    h1Line1: 'The infrastructure for',
    h1Accent: 'modern teams.',
    tagline: 'Forma connects your tools, teams, and workflows in one place — so nothing falls through the cracks.',
    featuresLabel: 'Built for teams that move fast',
    features: [
      { icon: '⌘', title: 'Keyboard-first', desc: 'Every action reachable without lifting your hands. Command palette included.' },
      { icon: '◎', title: 'No distractions', desc: 'Updates appear when you\'re ready to see them, not before.' },
      { icon: '⊹', title: 'Structured', desc: 'Every project has a place. Applied consistently, automatically.' },
    ],
    ctaH2: 'Ready to simplify?',
    ctaP: 'Join thousands of teams who replaced five tools with one.',
    ctaBtn: 'Start for free',
    tokens: {
      '--color-bg':     { val: '#f6f9fc', swatch: true },
      '--color-accent': { val: '#635bff', swatch: true },
      '--font-display': { val: 'Inter' },
      '--weight-bold':  { val: '600' },
      '--radius-lg':    { val: '8px' },
      '--leading-base': { val: '1.6' },
    }
  },
  'minimal-dark': {
    label: 'Minimal Dark',
    signal: 'Precision · Focus · Professional',
    motion: '200ms · ease',
    meta: {
      tagline: 'Precision · Focus · Professional',
      useCases: ['开发者工具', 'CLI/IDE 类产品', '数据分析平台', '专业工作流工具'],
      antiCases: ['面向普通消费者的产品', '需要暖色调或亲和感的品牌'],
      rationale: '近黑背景 + 冷色调蓝紫 accent，降低视觉噪音；高对比度文字层次强化信息密度感',
      brandExamples: ['Vercel', 'GitHub Dark', 'Raycast'],
    },
    navCta: 'Get started',
    badge: 'Now in public beta',
    h1Line1: 'The workspace for',
    h1Accent: 'focused work.',
    tagline: 'Forma brings your tasks, notes, and projects into a single interface — without the noise.',
    featuresLabel: 'Why teams choose Forma',
    features: [
      { icon: '⌘', title: 'Keyboard-first', desc: 'Every action is reachable without lifting your hands. Command palette included.' },
      { icon: '◎', title: 'No notifications', desc: 'Forma doesn\'t interrupt you. Updates appear when you\'re ready to see them.' },
      { icon: '⊹', title: 'Structured by default', desc: 'Every project has a place. Forma applies a consistent structure so you don\'t have to.' },
    ],
    ctaH2: 'Ready to focus?',
    ctaP: 'Join teams who replaced five tools with one.',
    ctaBtn: 'Start for free',
    tokens: {
      '--color-bg':     { val: '#0e0e0f', swatch: true },
      '--color-accent': { val: '#5e6ad2', swatch: true },
      '--font-display': { val: 'Inter' },
      '--weight-bold':  { val: '600' },
      '--radius-lg':    { val: '8px' },
      '--leading-base': { val: '1.5' },
    }
  },
  'bold-dark': {
    label: 'Bold Dark',
    signal: 'Power · Developer-native · Dramatic',
    motion: '150ms · linear',
    meta: {
      tagline: 'Power · Developer-native · Dramatic',
      useCases: ['开发者平台', 'CLI/终端工具', '安全/监控产品', '高性能计算类产品'],
      antiCases: ['企业合规类产品', '医疗/金融等需低调可信形象的场景'],
      rationale: '极暗背景 + 高饱和红色 accent + 粗字重，制造强烈对比；12px 圆角平衡现代感与力量感',
      brandExamples: ['Vercel Edge', 'Tailscale', 'Fly.io'],
    },
    navCta: 'Get started →',
    badge: '↯ Public beta',
    h1Line1: 'Command your',
    h1Accent: 'workflow.',
    tagline: 'Forma gives power users the tools to move fast — without the chaos. Built for the way you actually work.',
    featuresLabel: 'Built for speed',
    features: [
      { icon: '⚡', title: 'Instant actions', desc: 'Execute any operation in under 200ms. Every workflow mapped to a keystroke.' },
      { icon: '⬡', title: 'Scriptable', desc: 'Extend Forma with your own scripts. Automate the repetitive, own the important.' },
      { icon: '◈', title: 'Zero overhead', desc: 'No subscriptions per seat. No feature gating. The full product, for everyone.' },
    ],
    ctaH2: 'Take control.',
    ctaP: 'Used by engineers and operators who can\'t afford to slow down.',
    ctaBtn: 'Start for free →',
    tokens: {
      '--color-bg':     { val: '#070809', swatch: true },
      '--color-accent': { val: '#ff3a3a', swatch: true },
      '--font-display': { val: 'Inter' },
      '--weight-bold':  { val: '700' },
      '--radius-lg':    { val: '12px' },
      '--leading-base': { val: '1.5' },
    }
  },
  'warm-organic': {
    label: 'Warm Organic',
    signal: 'Humanity · Warmth · Thoughtful',
    motion: '300ms · ease-in-out',
    meta: {
      tagline: 'Humanity · Warmth · Thoughtful',
      useCases: ['个人知识管理工具', '写作/博客平台', '健康/生活方式产品', '教育类工具'],
      antiCases: ['金融/合规类产品', '需要高密度信息展示的后台'],
      rationale: '米白暖底色 + 橙棕 accent + 衬线字体，创造纸质质感；16px 大圆角和宽行距营造放松节奏',
      brandExamples: ['Bear', 'iA Writer', 'Readwise'],
    },
    navCta: 'Start writing',
    badge: '✦ Made for how you think',
    h1Line1: 'Work that feels',
    h1Accent: 'like yours.',
    tagline: 'Forma gives your ideas a home — a writing space that thinks alongside you, not ahead of you.',
    featuresLabel: 'What makes it different',
    features: [
      { icon: '✦', title: 'Room to think', desc: 'Generous spacing and quiet defaults. Your ideas fill the space, not the interface.' },
      { icon: '◎', title: 'Connected', desc: 'Every note links to every other. Your knowledge forms a web, not a pile.' },
      { icon: '⬡', title: 'Yours forever', desc: 'Plain text, always exportable. Forma holds your work, it doesn\'t own it.' },
    ],
    ctaH2: 'A place for your best thinking.',
    ctaP: 'Join writers, researchers, and teams who needed a space to slow down and go deep.',
    ctaBtn: 'Start writing for free',
    tokens: {
      '--color-bg':     { val: '#fafaf8', swatch: true },
      '--color-accent': { val: '#e8643a', swatch: true },
      '--font-display': { val: 'Georgia' },
      '--weight-bold':  { val: '600' },
      '--radius-lg':    { val: '16px' },
      '--leading-base': { val: '1.65' },
    }
  },
  'playful': {
    label: 'Playful',
    signal: 'Energy · Expression · Delight',
    motion: '400ms · spring',
    meta: {
      tagline: 'Energy · Expression · Delight',
      useCases: ['消费类 App', '创意工具', '社区/社交产品', '年轻用户向的 SaaS'],
      antiCases: ['企业采购决策场景', '合规/安全类产品', '信息密度高的数据工具'],
      rationale: '纯白底色 + 高饱和紫色 + 超大圆角 + 重字重，制造张力感；字体选择放大活力信号',
      brandExamples: ['Framer', 'Lemon Squeezy', 'Superhuman'],
    },
    navCta: 'Try it free ✦',
    badge: '✦ Something new is here',
    h1Line1: 'Work you\'ll',
    h1Accent: 'actually enjoy.',
    tagline: 'Forma reimagines what a workspace can feel like — built for curious people who want something better.',
    featuresLabel: 'Why it\'s different',
    features: [
      { icon: '✦', title: 'Beautiful by default', desc: 'Design you can actually love, not just tolerate. Every detail considered.' },
      { icon: '◎', title: 'Feels alive', desc: 'Responds to how you work, not how it was built. Forma adapts to you.' },
      { icon: '⬡', title: 'Just yours', desc: 'No dark patterns. No lock-in. Your work, your data, your call.' },
    ],
    ctaH2: 'Life\'s too short for boring tools.',
    ctaP: 'Join people who decided their workspace should spark joy, not dread.',
    ctaBtn: 'Get started ✦',
    tokens: {
      '--color-bg':     { val: '#ffffff', swatch: true },
      '--color-accent': { val: '#7c3aed', swatch: true },
      '--font-display': { val: 'Plus Jakarta Sans' },
      '--weight-bold':  { val: '800' },
      '--radius-lg':    { val: '24px' },
      '--leading-base': { val: '1.6' },
    }
  },
  'neo-brutalist': {
    label: 'Neo-Brutalist',
    signal: 'Directness · Honesty · Anti-polish',
    motion: '0ms · none',
    meta: {
      tagline: 'Directness · Honesty · Anti-polish',
      useCases: ['独立开发者产品', '技术博客/文档站', '反设计风格的工具产品', '开源项目官网'],
      antiCases: ['企业销售场景', '需要第一印象建立信任的 B2B 产品'],
      rationale: '0px 圆角 + 纯黑描边阴影 + 高对比黄色 accent，拒绝视觉粉饰；Space Grotesk 字体强化反主流气质',
      brandExamples: ['Pika', 'Gumroad', 'Tinybird'],
    },
    navCta: 'Start now',
    badge: '→ BETA',
    h1Line1: 'No fluff.',
    h1Accent: 'Just work.',
    tagline: 'Forma does what it says. No animations. No gradient hero sections. No "AI-powered" vagueness. Just tools that work.',
    featuresLabel: 'WHAT YOU GET',
    features: [
      { icon: '01', title: 'It works', desc: 'Every feature listed on this page actually exists and actually functions. Novel concept.' },
      { icon: '02', title: 'No dark patterns', desc: 'No fake urgency. No hidden fees. No "we\'ll just save your card for later."' },
      { icon: '03', title: 'Your data', desc: 'Export everything, anytime, in open formats. We don\'t hold your work hostage.' },
    ],
    ctaH2: 'That\'s the pitch.',
    ctaP: 'No countdown timer. No "only 3 spots left." Sign up if you want to.',
    ctaBtn: 'Sign up',
    tokens: {
      '--color-bg':     { val: '#f9f6ef', swatch: true },
      '--color-accent': { val: '#f5e100', swatch: true },
      '--font-display': { val: 'Space Grotesk' },
      '--weight-bold':  { val: '800' },
      '--radius-lg':    { val: '0px' },
      '--shadow-md':    { val: '4px 4px 0 #000' },
    }
  },
  'corporate-blue': {
    label: 'Corporate Blue',
    signal: 'Trust · Compliance · Risk-averse',
    motion: '200ms · ease',
    meta: {
      tagline: 'Trust · Compliance · Risk-averse',
      useCases: ['企业级 SaaS', '政府/合规类平台', '金融服务产品', '医疗健康平台'],
      antiCases: ['面向年轻消费者的产品', '创意类或个性化品牌'],
      rationale: '纯白背景 + 深蓝 accent + 极小圆角(4px)，传递可预期性和机构感；避免任何视觉意外',
      brandExamples: ['Salesforce', 'ServiceNow', 'DocuSign'],
    },
    navCta: 'Schedule a demo',
    badge: 'Trusted by 50,000+ companies',
    h1Line1: 'Grow your business',
    h1Accent: 'with confidence.',
    tagline: 'The enterprise platform that teams trust to manage work, streamline operations, and scale with security built in.',
    featuresLabel: 'Why enterprise teams choose Forma',
    features: [
      { icon: '🔒', title: 'Secure & compliant', desc: 'SOC 2 Type II certified. GDPR ready. SSO and role-based access controls included.' },
      { icon: '⚙️', title: 'Enterprise-grade', desc: '99.99% uptime SLA. Dedicated infrastructure. Data residency options available.' },
      { icon: '📞', title: '24/7 support', desc: 'Dedicated customer success manager. Priority support with 4-hour response guarantee.' },
    ],
    ctaH2: 'Ready to get started?',
    ctaP: 'Talk to our team and get a personalized demo for your organization.',
    ctaBtn: 'Talk to sales',
    tokens: {
      '--color-bg':     { val: '#ffffff', swatch: true },
      '--color-accent': { val: '#0070d2', swatch: true },
      '--font-display': { val: 'Inter' },
      '--weight-bold':  { val: '600' },
      '--radius-lg':    { val: '4px' },
      '--leading-base': { val: '1.5' },
    }
  },
  'monochrome': {
    label: 'Monochrome',
    signal: 'Confidence · Timeless · Editorial',
    motion: '250ms · ease',
    meta: {
      tagline: 'Confidence · Timeless · Editorial',
      useCases: ['高端品牌官网', '投资组合/作品集', '出版/媒体平台', '奢侈品类产品'],
      antiCases: ['需要多色彩表达品牌活力的产品', '信息架构复杂的管理后台'],
      rationale: '纯黑白 + 衬线字体(Playfair Display) + 大行距，通过克制传递自信；2px 圆角接近无圆角，强调正式感',
      brandExamples: ['Are.na', 'The Economist', 'MSCHF'],
    },
    navCta: 'Begin',
    badge: 'Est. 2024',
    h1Line1: 'The discipline of',
    h1Accent: 'focused work.',
    tagline: 'Forma is built on the belief that serious work requires serious tools — and serious tools don\'t need to announce themselves.',
    featuresLabel: 'What matters',
    features: [
      { icon: 'I', title: 'No noise', desc: 'No notification badges. No engagement metrics. No features competing for your attention.' },
      { icon: 'II', title: 'Built to last', desc: 'Plain text at the core. Open formats throughout. Works the same in ten years as it does today.' },
      { icon: 'III', title: 'Yours entirely', desc: 'We do not read your notes. We do not analyze your behavior. We do not show you ads.' },
    ],
    ctaH2: 'Enough said.',
    ctaP: 'You either want this or you don\'t. No free trial gamification. No credit card required.',
    ctaBtn: 'Begin',
    tokens: {
      '--color-bg':     { val: '#ffffff', swatch: true },
      '--color-accent': { val: '#000000', swatch: true },
      '--font-display': { val: 'Playfair Display' },
      '--weight-bold':  { val: '700' },
      '--radius-lg':    { val: '2px' },
      '--leading-base': { val: '1.7' },
    }
  },
  'ai-gradient': {
    label: 'AI Gradient',
    signal: 'Future · Ambition · Scale',
    motion: '400ms · ease-out',
    meta: {
      tagline: 'Future · Ambition · Scale',
      useCases: ['AI 产品官网', '技术基础设施平台', 'Web3/前沿技术产品', '融资路演式落地页'],
      antiCases: ['需要建立长期信任的传统行业', '日常工具类产品（gradient 疲劳风险）'],
      rationale: '接近纯黑底色 + 紫色渐变 accent + 大圆角，传递科技感和未来主义；与 minimal-dark 的区别在于动感而非静止',
      brandExamples: ['Replicate', 'Runway', 'ElevenLabs'],
    },
    navCta: 'Get early access',
    badge: '✦ Powered by AI',
    h1Line1: 'The future of work',
    h1Accent: 'is already here.',
    tagline: 'Forma uses AI to understand how your team thinks — and builds the structure around you, not the other way around.',
    featuresLabel: 'What\'s possible',
    features: [
      { icon: '⬡', title: 'AI-native', desc: 'Built from the ground up for AI workflows. Not bolted on after the fact.' },
      { icon: '◈', title: 'Learns as you work', desc: 'Forma surfaces what you need before you ask. Gets smarter every day.' },
      { icon: '✦', title: 'Always in sync', desc: 'Real-time across every device, every teammate, every timezone.' },
    ],
    ctaH2: 'The workspace of the next decade.',
    ctaP: 'Join 10,000+ teams on the waitlist.',
    ctaBtn: 'Request access →',
    tokens: {
      '--color-bg':     { val: '#08080f', swatch: true },
      '--color-accent': { val: '#8b5cf6', swatch: true },
      '--font-display': { val: 'Inter' },
      '--weight-bold':  { val: '600' },
      '--radius-lg':    { val: '16px' },
      '--leading-base': { val: '1.55' },
    }
  }
};

// Timer refs — declared here so applyTheme can clearTimeout safely
let _copyCssBtnTimer    = null;
let _opacityTimer       = null;
let _shareBtnTimer      = null;

// ─── Sidebar: update text labels on theme change ──────
// Visual dimensions (color, radius, shadow) update automatically
// via CSS custom properties — only text labels need JS.
function updateSidebarLabels(data) {
  const t = data.tokens;

  // Header
  document.getElementById('sidebar-profile-name').textContent = data.label;
  document.getElementById('sidebar-signal').textContent       = data.signal;

  // Color: accent hex value
  document.getElementById('dim-accent-val').textContent = t['--color-accent'].val;

  // Radius: value label
  document.getElementById('dim-radius-val').textContent = t['--radius-lg']?.val ?? '—';

  // Typography: sample text in profile's display font + weight
  const fontRaw    = t['--font-display'].val;
  const fontName   = fontRaw.replace(/['"]/g, '').split(',')[0].trim();
  const weightVal  = t['--weight-bold'].val;
  const sample     = document.getElementById('dim-type-sample');
  sample.style.fontFamily = fontRaw + ', system-ui';
  sample.style.fontWeight = weightVal;
  document.getElementById('dim-type-meta').innerHTML = `${fontName}<br>${weightVal}`;

  // Leading: gap between bars reflects line-height scale
  const leadingVal = t['--leading-base']?.val ?? '1.5';
  const leadingNum = parseFloat(leadingVal);
  const barGap     = Math.max(2, Math.round((leadingNum - 1) * 18)) + 'px';
  document.getElementById('dim-leading-bars').style.gap = barGap;
  document.getElementById('dim-leading-val').textContent = `leading ${leadingVal}`;

  // Motion: easing label
  document.getElementById('dim-motion-val').textContent = data.motion ?? '—';

  // Meta accordion (use cases, anti-cases, brands)
  const m = data.meta;
  document.getElementById('sidebar-meta-wrap').innerHTML = m ? `
    <details class="signal-meta">
      <summary class="signal-meta-summary">${m.tagline}</summary>
      <div class="signal-meta-body">
        <p class="signal-meta-rationale">${m.rationale}</p>
        <div class="signal-meta-section">
          <span class="signal-meta-label">适合</span>
          <span class="signal-meta-tags">${m.useCases.map(u => `<span class="signal-tag signal-tag--use">${u}</span>`).join('')}</span>
        </div>
        <div class="signal-meta-section">
          <span class="signal-meta-label">不适合</span>
          <span class="signal-meta-tags">${m.antiCases.map(a => `<span class="signal-tag signal-tag--anti">${a}</span>`).join('')}</span>
        </div>
        ${m.brandExamples ? `<div class="signal-meta-section">
          <span class="signal-meta-label">参考品牌</span>
          <span class="signal-meta-tags">${m.brandExamples.map(b => `<span class="signal-tag signal-tag--brand">${b}</span>`).join('')}</span>
        </div>` : ''}
      </div>
    </details>
  ` : '';
}

// ─── Core: apply a theme ──────────────────────────────
function applyTheme(theme) {
  const data = THEMES[theme];
  if (!data) return;

  // Brief fade for font-family switch — clearTimeout guards rapid switching
  document.body.style.opacity = '0.92';
  clearTimeout(_opacityTimer);
  _opacityTimer = setTimeout(() => { document.body.style.opacity = '1'; }, 120);

  // Set data-theme
  document.body.setAttribute('data-theme', theme);

  // Update copy
  document.getElementById('nav-cta').textContent       = data.navCta;
  document.getElementById('hero-badge').textContent    = data.badge;
  document.getElementById('hero-h1-line1').textContent = data.h1Line1;
  document.getElementById('hero-h1-accent').textContent = data.h1Accent;
  document.getElementById('hero-tagline').textContent  = data.tagline;
  document.getElementById('btn-primary').textContent   = data.ctaBtn;
  document.getElementById('features-label').textContent = data.featuresLabel;
  document.getElementById('cta-h2').textContent        = data.ctaH2;
  document.getElementById('cta-p').textContent         = data.ctaP;
  document.getElementById('btn-cta').textContent       = data.ctaBtn;

  // Render features
  document.getElementById('features-grid').innerHTML = data.features.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');

  // Update sidebar labels (visuals update automatically via CSS custom properties)
  updateSidebarLabels(data);

  // Reset export section — stale data from previous profile should not persist
  const exportCode = document.getElementById('export-section-code');
  if (exportCode && !exportCode.textContent.startsWith('点击')) {
    exportCode.textContent = '点击 Sidebar 中的"查看完整 token →"加载';
    const profileEl = document.getElementById('export-section-profile');
    if (profileEl) profileEl.textContent = '—';
  }

  // Reset CSS copy button if it was in "copied" state from previous theme
  const cssBtn = document.getElementById('copy-css-btn');
  if (cssBtn && cssBtn.dataset.state === 'copied') {
    clearTimeout(_copyCssBtnTimer);
    cssBtn.textContent = 'CSS';
    delete cssBtn.dataset.state;
  }

  // Update trigger button
  const accentVal = data.tokens['--color-accent'].val;
  const triggerDot = document.getElementById('trigger-dot');
  if (triggerDot) {
    triggerDot.style.background = theme === 'ai-gradient'
      ? 'linear-gradient(135deg,#8b5cf6,#60a5fa)'
      : accentVal;
    if (theme === 'neo-brutalist') triggerDot.style.border = '1px solid #aaa';
    else triggerDot.style.border = 'none';
  }
  const triggerLabel = document.getElementById('trigger-label');
  if (triggerLabel) triggerLabel.textContent = data.label;

  const contextThemeName = document.getElementById('context-theme-name');
  if (contextThemeName) contextThemeName.textContent = data.label;

  // Update panel active states
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isActive = btn.dataset.t === theme;
    btn.classList.toggle('active', isActive);
    const check = btn.querySelector('.check');
    if (check) check.textContent = isActive ? '✓' : '';
  });

  // Sync URL hash without creating a new history entry (back/forward is handled
  // by history.pushState in the panel click handler)
  history.replaceState(null, '', '#' + theme);
}

// ─── Utility: parse all CSS custom properties for a
//     given theme directly from tokens.css (used by
//     S2 copy and S3 export features)               ──
async function parseThemeTokens(theme) {
  const response = await fetch('tokens.css');
  const css = await response.text();

  // Match the [data-theme="<theme>"] { ... } block (handles multiline)
  const escaped = theme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockRegex = new RegExp(
    `\\[data-theme="${escaped}"\\]\\s*\\{([^}]*)\\}`,
    's'
  );
  const match = css.match(blockRegex);
  if (!match) return {};

  const tokens = {};
  const varRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = varRegex.exec(match[1])) !== null) {
    tokens[m[1].trim()] = m[2].trim();
  }
  return tokens;
}

// ─── Build panel options ──────────────────────────────
const panelOptions = document.getElementById('panel-options');
Object.entries(THEMES).forEach(([key, data]) => {
  const accentVal = data.tokens['--color-accent'].val;
  const dotStyle = key === 'neo-brutalist'
    ? `background:${accentVal};border:1px solid #aaa`
    : key === 'ai-gradient'
      ? `background:linear-gradient(135deg,#8b5cf6,#60a5fa)`
      : `background:${accentVal}`;
  const btn = document.createElement('button');
  btn.className = 'theme-btn';
  btn.dataset.t = key;
  btn.setAttribute('role', 'option');
  btn.innerHTML = `
    <span class="dot" style="${dotStyle}"></span>
    <span>${data.label}</span>
    <span class="check"></span>
  `;
  btn.addEventListener('click', () => {
    history.pushState(null, '', '#' + key);  // push history entry for back/forward
    applyTheme(key);
    document.getElementById('switcher').classList.remove('open');
    document.getElementById('switcher-trigger').setAttribute('aria-expanded', 'false');
  });
  panelOptions.appendChild(btn);
});

// ─── Export Section ──────────────────────────────────
let _exportActiveTab = 'json'; // persists across theme switches

async function loadExportSection() {
  const theme   = document.body.getAttribute('data-theme');
  const codeEl  = document.getElementById('export-section-code');
  const profileEl = document.getElementById('export-section-profile');

  codeEl.textContent = '加载中…';
  if (profileEl) profileEl.textContent = THEMES[theme]?.label ?? theme;

  let tokens;
  try {
    tokens = await parseThemeTokens(theme);
  } catch {
    codeEl.textContent = '加载失败，请重试';
    return;
  }

  codeEl.textContent = _exportActiveTab === 'json'
    ? JSON.stringify(tokens, null, 2)
    : formatCSSVars(tokens);
}

function setExportTab(tab) {
  _exportActiveTab = tab;
  document.getElementById('export-tab-json').classList.toggle('active', tab === 'json');
  document.getElementById('export-tab-css').classList.toggle('active', tab === 'css');
  loadExportSection();
}

// Jump from sidebar to export section
async function jumpToExport() {
  // Always activate JSON tab on jump (AC: "Export 默认展示当前激活 profile 的 JSON Tab")
  _exportActiveTab = 'json';
  document.getElementById('export-tab-json').classList.add('active');
  document.getElementById('export-tab-css').classList.remove('active');

  // Scroll first so user sees movement immediately
  document.getElementById('export-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Load content for current profile
  await loadExportSection();
}

// Tab buttons
document.getElementById('export-tab-json').addEventListener('click', () => setExportTab('json'));
document.getElementById('export-tab-css').addEventListener('click',  () => setExportTab('css'));

// Download button — re-uses existing export handlers based on active tab
document.getElementById('export-section-download').addEventListener('click', () => {
  if (_exportActiveTab === 'json') handleExportJson();
  else {
    // Trigger CSS download via blob
    const theme = document.body.getAttribute('data-theme');
    parseThemeTokens(theme).then(tokens => {
      const blob = new Blob([formatCSSVars(tokens)], { type: 'text/css' });
      const url  = URL.createObjectURL(blob);
      const a    = Object.assign(document.createElement('a'), { href: url, download: `${theme}-tokens.css` });
      a.click();
      URL.revokeObjectURL(url);
    });
  }
});

// Copy button
document.getElementById('export-section-copy').addEventListener('click', async () => {
  const btn = document.getElementById('export-section-copy');
  const text = document.getElementById('export-section-code').textContent;
  if (!text || text.startsWith('点击') || text.startsWith('加载')) return;
  const ok = await tryCopyToClipboard(text);
  btn.textContent = ok ? '已复制 ✓' : '复制失败';
  setTimeout(() => { btn.textContent = '复制到剪贴板'; }, 2000);
});

// Sidebar jump button
document.getElementById('full-token-btn').addEventListener('click', jumpToExport);

// ─── Sidebar collapse / expand ───────────────────────
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  const sidebar  = document.getElementById('token-sidebar');
  const btn      = document.getElementById('sidebar-toggle');
  const isNowCollapsed = sidebar.classList.toggle('collapsed');
  document.body.classList.toggle('sidebar-collapsed', isNowCollapsed);
  btn.textContent = isNowCollapsed ? '‹' : '›';
  btn.setAttribute('aria-expanded', String(!isNowCollapsed));
  btn.setAttribute('aria-label', isNowCollapsed ? '展开 Sidebar' : '收起 Sidebar');
});

// ─── Bind sidebar export buttons once (static DOM, not re-rendered) ──
document.getElementById('export-signal-btn').addEventListener('click', handleExportSignalMd);
document.getElementById('export-json-btn').addEventListener('click', handleExportJson);
document.getElementById('copy-css-btn').addEventListener('click', handleCopyCss);

// ─── Init: hash → query param → default ──────────────
const hashTheme  = window.location.hash.slice(1);
const queryTheme = new URLSearchParams(window.location.search).get('theme');
const initTheme  = (hashTheme && THEMES[hashTheme])
  ? hashTheme
  : (queryTheme && THEMES[queryTheme])
    ? queryTheme
    : 'minimal-dark';
applyTheme(initTheme);

// ─── Event listeners ──────────────────────────────────
document.getElementById('switcher-trigger').addEventListener('click', (e) => {
  e.stopPropagation();
  const switcher = document.getElementById('switcher');
  const isOpen = switcher.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', () => {
  document.getElementById('switcher').classList.remove('open');
  document.getElementById('switcher-trigger').setAttribute('aria-expanded', 'false');
});

document.getElementById('switcher-panel').addEventListener('click', (e) => {
  e.stopPropagation();
});

// ─── AC-4: Back / forward navigation ─────────────────
function applyFromHash() {
  const hash = location.hash.slice(1);
  if (!hash) return; // ignore href="#" clicks — empty hash should not reset the theme
  const current = document.body.getAttribute('data-theme');
  const target = THEMES[hash] ? hash : 'minimal-dark';
  if (target !== current) applyTheme(target);
}
window.addEventListener('hashchange', applyFromHash);
window.addEventListener('popstate',   applyFromHash);

// ─── S2: Copy CSS variables ───────────────────────────

// Format token object → :root { } block
function formatCSSVars(tokens) {
  const lines = Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  return `:root {\n${lines}\n}`;
}

// Clipboard with boolean return (AC-4: visible fallback on false)
async function tryCopyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* fall through */ }
  }
  try {
    const el = Object.assign(document.createElement('textarea'), {
      value: text,
      style: 'position:fixed;opacity:0;pointer-events:none',
    });
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    if (ok) return true;
  } catch { /* fall through */ }
  return false;
}

// Fallback modal — shown when both clipboard paths fail (AC-4)
function showCSSFallback(css) {
  const modal    = document.getElementById('css-fallback');
  const textarea = document.getElementById('css-fallback-textarea');
  textarea.value = css;
  modal.hidden   = false;
  textarea.focus();
  textarea.select();
}

document.getElementById('css-fallback-close').addEventListener('click', () => {
  document.getElementById('css-fallback').hidden = true;
});

// Main copy handler (button is static in sidebar, bound once at init)
async function handleCopyCss() {
  const btn = document.getElementById('copy-css-btn');
  if (btn?.dataset.state === 'copied') return; // AC-2: no re-trigger during cooldown

  const theme = document.body.getAttribute('data-theme');

  let css;
  try {
    const tokens = await parseThemeTokens(theme);  // AC-3: always fresh, no cache
    css = formatCSSVars(tokens);
  } catch {
    // fetch failed (network error / file not found) — surface to user, don't hang
    btn.textContent = '复制失败';
    setTimeout(() => { btn.textContent = 'CSS'; }, 2000);
    return;
  }

  const ok = await tryCopyToClipboard(css);

  if (ok) {
    btn.textContent       = '已复制 ✓';
    btn.dataset.state     = 'copied';           // AC-2: data-state="copied"
    _copyCssBtnTimer = setTimeout(() => {
      btn.textContent   = 'CSS';
      delete btn.dataset.state;
      _copyCssBtnTimer  = null;
    }, 2000);
  } else {
    showCSSFallback(css);                        // AC-4: visible fallback, not silent
  }
}

// ─── S3: Export Token JSON ────────────────────────────
async function handleExportJson() {
  const btn = document.getElementById('export-json-btn');
  const theme = document.body.getAttribute('data-theme');

  let tokens;
  try {
    tokens = await parseThemeTokens(theme);  // always fresh, same source as copy-css
  } catch {
    btn.textContent = '导出失败';
    setTimeout(() => { btn.textContent = 'JSON'; }, 2000);
    return;
  }

  const json = JSON.stringify(tokens, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href: url,
    download: `${theme}-tokens.json`,
  });
  a.click();
  URL.revokeObjectURL(url);
}

// ─── S7: Export .signal.md ───────────────────────────
async function handleExportSignalMd() {
  // Snapshot theme + meta at click time before any async work (AC-5: race guard)
  const theme = document.body.getAttribute('data-theme');
  const data  = THEMES[theme];
  const btn   = document.getElementById('export-signal-btn');

  if (!data?.meta) return;

  let tokens;
  try {
    tokens = await parseThemeTokens(theme);  // same source as S2/S3
  } catch {
    btn.textContent = '导出失败';
    setTimeout(() => { btn.textContent = '导出 .signal.md'; }, 2000);
    return;
  }

  const m = data.meta;

  const tokenLines = Object.entries(tokens)
    .map(([k, v]) => `${k}: ${v};`)
    .join('\n');

  const useCaseList  = m.useCases.map(u => `- ${u}`).join('\n');
  const antiCaseList = m.antiCases.map(a => `- ${a}`).join('\n');
  const brandLine    = m.brandExamples?.length ? m.brandExamples.join(' · ') : null;

  const sections = [
    `# Design Signal — ${data.label}`,
    `<!-- AI: This file defines the visual design system for this project.`,
    `     Apply these CSS variables when generating UI components. -->`,
    ``,
    `## Signal`,
    m.tagline,
    ``,
    `## When to use`,
    useCaseList,
    ``,
    `## When to avoid`,
    antiCaseList,
    ``,
    `## Why these tokens`,
    m.rationale,
    ``,
    ...(brandLine ? [`## Reference brands`, brandLine, ``] : []),
    `## Tokens`,
    '```css',
    tokenLines,
    '```',
  ];

  const content = sections.join('\n');
  const blob    = new Blob([content], { type: 'text/markdown' });
  const url     = URL.createObjectURL(blob);
  const a       = Object.assign(document.createElement('a'), {
    href:     url,
    download: `${theme}.signal.md`,
  });
  a.click();
  URL.revokeObjectURL(url);

  // S9: show post-export guidance (AC-1)
  showSignalGuide();
}

// ─── S9: Post-export guidance ─────────────────────────
const SIGNAL_GUIDE_PROMPT = '参考项目中的 .signal.md 作为 UI 风格约束';

function showSignalGuide() {
  // Idempotent — don't insert twice (AC-5: no interference)
  if (document.getElementById('signal-guide')) return;

  const guide = document.createElement('div');
  guide.id        = 'signal-guide';
  guide.className = 'signal-guide';
  guide.innerHTML = `
    <p class="signal-guide-step">① 将文件放入项目根目录</p>
    <p class="signal-guide-step">② 在 prompt 中引用：</p>
    <code class="signal-guide-code">${SIGNAL_GUIDE_PROMPT}</code>
    <button class="signal-guide-copy-btn" id="signal-guide-copy-btn">复制 prompt</button>
  `;

  // Insert between export-signal-btn and signal meta accordion (AC-1)
  const exportBtn = document.getElementById('export-signal-btn');
  if (exportBtn) exportBtn.insertAdjacentElement('afterend', guide);

  document.getElementById('signal-guide-copy-btn')
    .addEventListener('click', handleCopyGuidePrompt);
}

async function handleCopyGuidePrompt() {
  const btn = document.getElementById('signal-guide-copy-btn');
  const ok  = await tryCopyToClipboard(SIGNAL_GUIDE_PROMPT);
  if (ok) {
    btn.textContent = '已复制 ✓';                         // AC-3
    setTimeout(() => { btn.textContent = '复制 prompt'; }, 2000);
  }
}

// ─── AC-5: Share link button ──────────────────────────
document.getElementById('share-btn').addEventListener('click', async () => {
  const btn = document.getElementById('share-btn');
  const ok  = await tryCopyToClipboard(window.location.href);
  btn.textContent = ok ? '已复制 ✓' : '复制失败';
  if (ok) btn.classList.add('copied');
  clearTimeout(_shareBtnTimer);
  _shareBtnTimer = setTimeout(() => {
    btn.textContent = '复制链接';
    btn.classList.remove('copied');
  }, 2000);
});
