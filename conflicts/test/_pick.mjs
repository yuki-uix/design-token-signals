/**
 * 从 probe.js 源码里取出一个具名函数的定义，供测试直接执行被测实现，
 * 而不是在测试里复刻一份——复刻的测试在实现漂移时照样是绿的，等于没测。
 *
 * 这个扫描器必须理解注释、字符串和正则字面量，原因有两条，都是真实踩到的：
 *
 * 1. 用 indexOf 直接找 `const name = ` 会命中**注释里**的同名文本。
 *    那样 new Function 执行的是注释里那个伪声明，测试照常通过但测的是别的东西。
 * 2. 只数花括号会在表达式体的箭头函数上截断
 *    （`const f = (a) => (b).map(...)` 没有顶层花括号）；
 *    而数所有括号又会被正则字面量里的 `{3,6}`、`\(`、`[^)]*` 带偏。
 *
 * 局限：不处理 ASI（没有分号结尾的声明）。probe.js 全部以分号结尾，
 * 若将来不是，这里会抛错而不是静默取错——这个方向是安全的。
 */
const OPENERS = { '(': ')', '[': ']', '{': '}' };

/** `/` 是正则开头还是除号：看前一个非空白字符 */
const REGEX_PRECEDERS = new Set(['(', ',', '=', ':', '[', '!', '&', '|', '?', '{', '}', ';', '+', '-', '*', '%', '<', '>', '~', '^', undefined]);

export function pick(src, name) {
  const needle = `const ${name} = `;
  const stack = [];
  let start = -1;
  let prev;                                     // 前一个非空白的代码字符

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];

    if (ch === '/' && src[i + 1] === '/') { const n = src.indexOf('\n', i); if (n < 0) break; i = n; continue; }
    if (ch === '/' && src[i + 1] === '*') { const n = src.indexOf('*/', i); if (n < 0) break; i = n + 1; continue; }

    if (ch === "'" || ch === '"' || ch === '`') {
      const q = ch;
      while (++i < src.length && (src[i] !== q || src[i - 1] === '\\'));
      prev = q; continue;
    }

    if (ch === '/' && REGEX_PRECEDERS.has(prev)) {   // 正则字面量：整体跳过
      let j = i + 1, inClass = false;
      for (; j < src.length; j++) {
        if (src[j] === '\\') { j++; continue; }
        if (src[j] === '[') inClass = true;
        else if (src[j] === ']') inClass = false;
        else if (src[j] === '/' && !inClass) break;
        else if (src[j] === '\n') { j = -1; break; }  // 不是正则，回退
      }
      if (j > 0) { i = j; prev = '/'; continue; }
    }

    if (start < 0) {
      if (src.startsWith(needle, i)) start = i;
      if (!/\s/.test(ch)) prev = ch;
      continue;
    }

    if (OPENERS[ch]) stack.push(OPENERS[ch]);
    else if (ch === stack[stack.length - 1]) stack.pop();
    else if (ch === ';' && stack.length === 0) return src.slice(start, i + 1);

    if (!/\s/.test(ch)) prev = ch;
  }
  throw new Error(start < 0 ? `probe.js 里找不到 ${name}` : `${name} 的定义没有以分号结束`);
}

/** 取出多个函数并在同一作用域里求值，返回它们 */
export function load(src, names) {
  const body = names.map(n => pick(src, n)).join('\n');
  return new Function(`${body}\nreturn { ${names.join(', ')} };`)();
}
