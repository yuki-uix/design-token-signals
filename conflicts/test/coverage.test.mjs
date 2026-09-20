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

const src = readFileSync(new URL('../probe.js', import.meta.url), 'utf8');
const i = src.indexOf('const unionArea = ');
if (i < 0) throw new Error('probe.js 里找不到 unionArea');
let d = 0, started = false, j = i;
for (; j < src.length; j++) {
  if (src[j] === '{') { d++; started = true; }
  else if (src[j] === '}') { d--; if (started && d === 0) break; }
}
// 从 probe.js 取出被测函数本身执行，不在测试里复刻实现
const unionArea = new Function(`${src.slice(i, j + 1)}; return unionArea;`)();

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

console.log(failed ? `\n${failed} 个用例失败` : '\n全部通过');
process.exit(failed ? 1 : 0);
