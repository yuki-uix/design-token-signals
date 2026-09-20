# Product direction — design-token-signals

更新：2026-09-20。本文区分已存在的产品与待验证的 audit 实验。开发任务以对应 GitHub issue 的验收为准；有冲突时先检查实际代码与最新 issue，不沿用旧路线。

## 当前产品

**面向 AI 辅助开发者的设计风格选型工具。** 用户知道希望界面有什么感觉，但需要把意图落实为可引用的颜色、字体、圆角和阴影参数。

主要流程：选择主题 → 导出 `.signal.md` → 在项目中明确要求编码助手读取文件 → 检查实现结果。

现有能力包括 9 套主题、关键词筛选、实时切换、用途与理由说明、CSS / JSON / `.signal.md` 导出和主题分享链接。分析文章与 IA × Token 指南是辅助资料。参考品牌和风格解释是设计判断，不是官方品牌规范或普遍定律。

`.signal.md` 不会自动注册为 agent 指令，也不保证生成页面始终一致。导出目前包含 29 个主题变量，不包含站点共享间距或字体文件；布局、可访问性与交互仍需实现和审查。

## 两条工作线

### A · 现有产品发布

对应 [Epic #54](https://github.com/yuki-uix/design-token-signals/issues/54) 与 [发布 MVP](https://github.com/yuki-uix/design-token-signals/milestone/1)。

| 交付 | 当前状态 | 验收重点 |
| --- | --- | --- |
| #48 README、样例、真实使用流程 | 实现已合并；陌生用户试用仍待完成 | 能复述用途，完成选型、导出和明确引用 |
| #49 真实对比图与操作 GIF | 已合并 | 素材来自真实运行，提供静态说明和适用条件 |
| #50 仓库 topics | 已更新并回读验证 | 与已存在功能一致，不暗示 Skill / audit 已交付 |

使用[五分钟试用任务单](docs/research/first-use-trial.md)收集真实反馈。不能用作者或 agent 的自测替代陌生用户试用。stars、搜索排名、访问量是观察结果，不是 issue 完成门槛。

小范围反馈可以现在收集。正式传播属于 [#51](https://github.com/yuki-uix/design-token-signals/issues/51)，文章应说明真实使用过程与局限，不必等待 audit 才能介绍现有工具。

### B · 小规模 Conflict Audit 实验

对应 [Epic #52](https://github.com/yuki-uix/design-token-signals/issues/52) 与[实验 milestone](https://github.com/yuki-uix/design-token-signals/milestone/2)。

待验证问题：在明确设计目标与组件语境后，少量可解释规则能否指出用户认同、愿意修改的问题？“审查赛道没有竞争”“一键安装必然提高转化”不是已证实的前提。

| 顺序 | 交付 | 边界 |
| --- | --- | --- |
| #39 | [两条候选规则与反例](conflicts/rules.md) | 未经外部验证的假设，不是通用审美标准 |
| #40 | [阅读节奏三栏案例](conflicts/case-01-playful-meets-formal.md) | 可运行对比与测量；人工判断单独记录 |
| #45 | 受限输入的 audit 原型 | 尚未实现；需要规则要求的上下文，不能从 token 文件猜实际使用 |
| #47 | 三个真实项目与外部反馈 | 决定继续、缩小范围或暂停；不把自构案例当作准确率证据 |

报告区分 `potential-conflict`、`no-conflict-found`、`insufficient-information`。仅有 token 定义不足以推断组件角色、屏幕用量和视觉层级。程序校验能核对文件、变量、数值与规则编号，不能保证审美判断正确或零误报。

发布工作线不依赖 audit 实验完成。audit 实验也不依赖新 Skill 安装或站点数据重构。

## 验证通过后再决定的工作

对应 [Epic #53](https://github.com/yuki-uix/design-token-signals/issues/53) 与[后续 milestone](https://github.com/yuki-uix/design-token-signals/milestone/3)。

- #44：Skill 安装与触发验证，先确定一个平台。
- #43：只有站点和 Skill 确有共享需求时才统一主题数据源。
- #46：将 select 流程迁入 Skill，可选。
- #41 / #42：扩展案例，需要相应的使用与渲染证据。

启动 audit 产品化前，#47 要有明确的继续结论。未通过则记录原因并缩小或暂停，不靠增加规则数量宣布成功。

## 当前不作为前置条件

不为本次发布或实验提前迁移框架、建设完整理论文章体系、扩充大量主题、支持所有 agent 平台或新增 DTCG 格式导出。静态素材与一个实验页面不意味着要开发通用跨主题比较产品。

旧的 Docs 交互增强（#31）保留在 backlog。旧分析中的强断言只可作为待核查观点，不能直接当作规则依据。

## 技术约束

- 产品继续使用静态 HTML / CSS / JavaScript；本轮不引入后端或构建框架。
- 导出在浏览器端完成；本地通过 HTTP 服务验证，避免 `file://` 的 fetch 限制。
- Playwright、ffmpeg 等只用于开发验证与素材生成，不是网站运行依赖。
- 生成的截图、导出快照和案例是证据材料，注明来源与条件，不另造规范数据源。

## 完成的判断

发布线看陌生用户能否完成实际流程；实验线看建议的证据、反例、误报、遗漏、信息不足与外部认可。记录模型等待时间、需要的帮助和不同意见，避免把未观察到的问题当作已验证的成功。
