/**
 * box-shadow 解析的定点测试。
 *
 * 存在的理由：旧实现用 /(-?[\d.]+)(px)?/g 直接取第三个匹配当 blur，
 * 而这个正则会先命中 rgba() 里的颜色通道，于是所有阴影的 blur 都被读成 0——
 * R-09 因此在一个没有硬阴影的站点上误报，R-03 的 brutalist 豁免则对所有站点生效。
 * 两个方向相反的错误，都由同一个缺陷造成，而且测试和运行都没发现，是 QA 手工发现的。
 *
 * 跑：node conflicts/test/parse-shadow.test.mjs
 */
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { pick, load } from './_pick.mjs';

// 从 probe.js 里取出被测函数本身，不在测试里复刻一份实现。
const src = readFileSync(new URL('../probe.js', import.meta.url), 'utf8');

// 从 probe.js 取出被测函数本身执行，不在测试里复刻实现。提取器见 _pick.mjs。
const picked = ['splitTop', 'alphaOf', 'parseShadow'].map(n => pick(src, n)).join('\n');
assert.ok(picked.includes('offsetX'),
  '提取到的不是 probe.js 里的真实现——扫描器可能取到了注释或截断了定义');
const { splitTop, alphaOf, parseShadow } = load(src, ['splitTop', 'alphaOf', 'parseShadow']);

const cases = [
  ['rgba(0, 0, 0, 0.25) 0px 2px 32px 0px', { blur: 32, offsetY: 2 }, '颜色函数在前，blur 必须是 32 而不是颜色通道的 0'],
  ['rgba(0, 0, 0, 0.2) 0px 0px 0px 1px',   { blur: 0,  offsetY: 0 }, '0 偏移 0 模糊：描边环'],
  ['rgb(0, 0, 0) 4px 4px 0px 0px',          { blur: 0,  offsetY: 4 }, '有偏移无模糊：硬阴影'],
  ['4px 4px 0 #000',                        { blur: 0,  offsetY: 4 }, '颜色在后、blur 无单位'],
  ['#000 4px 4px 0',                        { blur: 0,  offsetY: 4 }, '十六进制颜色在前'],
  ['inset 0 1px 2px rgba(0,0,0,.4)',        { blur: 2,  offsetY: 1 }, 'inset 关键字不能被当成长度'],
  ['0 8px 24px rgba(16, 24, 40, 0.08)',     { blur: 24, offsetY: 8 }, '颜色在后，三值'],
];

let failed = 0;
for (const [input, expect, why] of cases) {
  const got = parseShadow(input);
  try {
    for (const [k, v] of Object.entries(expect)) assert.equal(got[k], v, `${k}: 期望 ${v}，实得 ${got[k]}`);
    console.log(`  ok   ${input}`);
  } catch (e) { failed++; console.log(`  FAIL ${input}\n       ${why}\n       ${e.message}`); }
}

// 多重阴影：顶层逗号拆分，rgba() 内部的逗号不算
const multi = splitTop('rgba(0,0,0,.2) 0 0 0 1px, rgba(0,0,0,.25) 0 2px 32px 0');
try {
  assert.equal(multi.length, 2, `期望拆成 2 条，实得 ${multi.length}`);
  assert.equal(parseShadow(multi[1]).blur, 32);
  console.log('  ok   多重阴影按顶层逗号拆分');
} catch (e) { failed++; console.log(`  FAIL 多重阴影拆分\n       ${e.message}`); }

// alpha 提取：透明阴影不表达任何语汇，必须能被排除
for (const [input, expect] of [
  ['rgba(0, 0, 0, 0.25) 0 2px 32px', 0.25],
  ['rgb(0 0 0 / .4) 0 1px 2px', 0.4],
  ['#00000080 4px 4px 0', 128/255],
  ['0 8px 24px rgb(16, 24, 40)', 1],
]) {
  const got = alphaOf(input);
  try { assert.ok(Math.abs(got - expect) < 0.01, `期望 ${expect}，实得 ${got}`);
    console.log(`  ok   alpha ${input}`); }
  catch (e) { failed++; console.log(`  FAIL alpha ${input}\n       ${e.message}`); }
}

console.log(failed ? `\n${failed} 个用例失败` : '\n全部通过');
process.exit(failed ? 1 : 0);
