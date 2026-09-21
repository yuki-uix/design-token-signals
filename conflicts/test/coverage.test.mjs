/**
 * 覆盖率计算的定点测试。
 *
 * 存在的理由：旧实现是「每个元素盒面积直接累加 ÷ 视口面积」，既不裁视口也不去重叠。
 * gumroad.com 的 6 个 #ffc900 元素全部在首屏之外，真实首屏覆盖率为 0，
 * 旧算法报 0.513——而 R-06(b) 的触发条件写的是「覆盖首屏可见面积 ≥ 15%」。
 * 规则说的和代码算的是两个量，这种缺陷不会报错，只会给出一个看起来合理的数字。
 *
 * 跑：node conflicts/test/coverage.test.mjs
 */
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { pick, load } from './_pick.mjs';

const src = readFileSync(new URL('../probe.js', import.meta.url), 'utf8');

// 从 probe.js 取出被测函数本身执行，不在测试里复刻实现。提取器见 _pick.mjs。
const picked = ['unionArea', 'clipToViewport', 'coverageOf'].map(n => pick(src, n)).join('\n');
assert.ok(picked.includes('cells.size'),
  '提取到的不是 probe.js 里的真实现——扫描器可能取到了注释或截断了定义');
const { unionArea, clipToViewport, coverageOf } = load(src, ['unionArea', 'clipToViewport', 'coverageOf']);

const G = 8;
let failed = 0;
const check = (name, got, want) => {
  try { assert.equal(got, want, `期望 ${want}，实得 ${got}`); console.log(`  ok   ${name}`); }
  catch (e) { failed++; console.log(`  FAIL ${name}\n       ${e.message}`); }
};

check('单个矩形', unionArea([[0, 0, 80, 80]], G), 6400);
check('两个完全重叠的矩形不翻倍', unionArea([[0, 0, 80, 80], [0, 0, 80, 80]], G), 6400);
check('嵌套矩形取外层', unionArea([[0, 0, 80, 80], [16, 16, 48, 48]], G), 6400);
check('两个不相接的矩形相加', unionArea([[0, 0, 80, 80], [160, 160, 240, 240]], G), 12800);
check('部分重叠只算一次并集',
  unionArea([[0, 0, 80, 80], [40, 0, 120, 80]], G), 120 * 80);
check('空输入为 0', unionArea([], G), 0);
check('未传入为 0', unionArea(undefined, G), 0);

// 回归上一轮那个具体缺陷：6 个同色矩形叠在一起，累加会是并集的 6 倍
const stacked = Array.from({ length: 6 }, () => [0, 0, 400, 300]);
const sum = stacked.reduce((a, [x1, y1, x2, y2]) => a + (x2 - x1) * (y2 - y1), 0);
const oneLayer = unionArea([[0, 0, 400, 300]], G);
check('六层同色堆叠：并集不随层数增长', unionArea(stacked, G), oneLayer);
console.log(`       （按盒面积累加会得到 ${sum}，是并集的 ${(sum / oneLayer).toFixed(1)} 倍）`);

// 网格量化：结果永远 >= 真实面积，且每条边最多多算一个格
const trueArea = 400 * 300;
const bound = Math.ceil(400 / G) * G * Math.ceil(300 / G) * G;
check('量化结果不小于真实面积', oneLayer >= trueArea, true);
check('量化误差不超过一个网格边长', oneLayer, bound);
console.log(`       （真实 ${trueArea}，量化后 ${oneLayer}，高估 ${((oneLayer / trueArea - 1) * 100).toFixed(1)}%）`);

// ── 裁剪视口：coverage 声称测的是「首屏可见覆盖」，裁剪这一步必须被覆盖 ──
const VW = 1000, VH = 800;
const clipLen = r => clipToViewport(r, VW, VH).length;
check('完全在视口外的矩形被丢弃', clipLen([[0, 2000, 400, 2400]]), 0);
check('视口左上角外的矩形被丢弃', clipLen([[-500, -500, -100, -100]]), 0);
check('部分可见的矩形被保留', clipLen([[900, 700, 1400, 1200]]), 1);
check('裁剪后取交集而非原尺寸',
  JSON.stringify(clipToViewport([[900, 700, 1400, 1200]], VW, VH)[0]),
  JSON.stringify([900, 700, 1000, 800]));
check('空输入不炸', clipLen([]), 0);
check('未传入不炸', clipLen(undefined), 0);

// ── 端到端：与上一轮 QA 发现的具体缺陷对应 ──
// gumroad.com 的色块全在首屏之外，真实覆盖率是 0，而旧算法（盒面积累加）报 0.513
check('视口外的大色块覆盖率为 0', coverageOf([[0, 2000, 1000, 2600]], VW, VH, G), 0);
check('铺满视口的矩形覆盖率为 1', coverageOf([[0, 0, VW, VH]], VW, VH, G), 1);
check('超出视口的矩形不会让覆盖率超过 1',
  coverageOf([[-200, -200, VW + 500, VH + 500]], VW, VH, G), 1);
check('六层堆叠的端到端覆盖率等于单层',
  coverageOf(Array.from({ length: 6 }, () => [0, 0, 500, 400]), VW, VH, G),
  coverageOf([[0, 0, 500, 400]], VW, VH, G));

// ── 网格量化溢出 ──
// 教训：上面几条用 1000×800，两个维度都能被 8 整除，算出来正好 1.000，
// 于是完全没暴露量化溢出。真实的 1512×862 不对齐，未钳位时是 1.002。
// 测试数据选得顺手，会让缺陷从测试里溜走。
const full1512 = coverageOf([[0, 0, 1512, 862]], 1512, 862, G);
check('非网格对齐的视口铺满时恰好为 1', full1512, 1);
check('覆盖率在任何情况下都不超过 1',
  [[[0, 0, 1512, 862]], [[-300, -300, 2000, 2000]], [[0, 0, 1511, 861]]]
    .every(r => coverageOf(r, 1512, 862, G) <= 1), true);

console.log(failed ? `\n${failed} 个用例失败` : '\n全部通过');
process.exit(failed ? 1 : 0);
