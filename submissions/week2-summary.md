# Week 2 任务完成汇总 — 赵佳鑫 (gitgdut)

> 总积分：16 项任务 / 650 分

---

## 基础任务

### [+10] Week 2 Role Log
**角色定位：** 合约 / Go 后端 / 产品方向
**产出：** 见 Week 3 Role Statement（同一份文档覆盖）

---

### [+20] AI Collaboration Log
**内容：** Uniswap V2 代码骨架开发中的 AI 协作记录
**格式：** AI 帮了什么 / 人类删改核查了什么 / 哪些不能交给 AI
**关键发现：** AI 生成的代码有 2 个关键 bug——K 检查恒成立、swap 执行顺序反了

---

### [+20] Week 3 Role Statement
**产出：** `submissions/week3-self-intro.md`
**内容：** Go 后端开发 + Solidity 合约，缺前端队友，5 个可验证的 Proof of Work

---

## Moss 专项

### [+20] 认识一个开源项目：Moss
**仓库：** https://github.com/nishuzumi/moss
**理解内容：**
- TypeScript pnpm monorepo，Monad 主网 AI Agent 框架
- 核心概念：@Protocol → @Capability → @Receipt
- 架构：Core（工厂/对）、Simulator（trace）、Protocols（适配器）
- 开发流程：Fork → 模板复制 → 写 ABI → 写 Protocol → 测试 → PR

---

### [+20] GitHub 探索日志
**仓库：** nishuzumi/moss（62⭐ at time of exploration）
**关键文件已读：**
| 文件 | 学到的 |
|------|--------|
| `CONTEXT.md` | 项目术语和架构边界 |
| `AGENTS.md` | AI agent 开发规范和 review 标准 |
| `CONTRIBUTING.md` | 贡献流程 |
| `docs/protocol-onboarding.md` | 适配器开发规范 |
| `packages/protocols/_template/` | 模板结构 |
| `packages/protocols/kuru/` | 参考适配器实现 |

**Issue 筛选：** 浏览了 #6、#7、#8、#9、#10、#11、#12，选择 #12 FastLane（starter 难度）

---

### [+30] 开源贡献计划
**计划：** 为 Moss 开发 FastLane shMONAD 流动性质押适配器
**步骤：**
1. 研究 FastLane 合约（Monad 主网，已验证源码）
2. 从模板创建包 `packages/protocols/fastlane/`
3. 实现 stake / unstake Capability + 4 个 Query + 2 个 Receipt
4. 写 6 个单元测试 + 编译期类型夹具
5. 通过 lint/build/typecheck/test:offline
6. 提交 PR

---

### [+50] 完成第一次 GitHub 协作
**PR #92：** https://github.com/nishuzumi/moss/pull/92
**流程：** Fork → Clone → 开发 → Commit → Push → PR → 等待 Review
**状态：** 已提交，等待 maintainer review

---

### [+50] 留下属于自己的 Proof of Work
**PR #92 详情：**
- 新增包：`@themoss/protocol-fastlane`
- 300+ 行 TypeScript
- 2 个 Capability（stake / unstake）
- 4 个 Query（preview / balance / exchange rate）
- 6 个测试全部通过
- 链接：https://github.com/nishuzumi/moss/pull/92

**额外 PoW：**
- Moss 教程 PR #103：https://github.com/nishuzumi/moss/pull/103
- Uniswap V2 最小实现：`~/uniswap-v2-minimal/`
- 链上彩票合约：github.com/gitgdut/smart-contract-lottery

---

### [+30] 撰写一篇 Moss 介绍
**Moss 是什么：**
Moss 是一个基于 TypeScript 的 AI Agent Web3 协议框架，运行在 Monad 主网（chain ID 143）。

核心理念：AI Agent 通过声明式装饰器（@Protocol / @Capability / @Query / @Receipt）描述它能做什么链上操作，框架自动做模拟执行和安全检查，但**绝不签名、绝不发交易**——人类始终是最后一道防线。

适合场景：让 AI Agent 理解 DeFi 协议、生成交易方案、解释链上结果，但资金操作必须由人类确认。

---

### [+30] 制作一份 Moss 新手教程
**PR #103：** https://github.com/nishuzumi/moss/pull/103
**内容：** 「Building Your First Protocol Adapter」教程
**特点：** 以 FastLane 为真实案例，10 个章节覆盖完整开发流程，包含 3 个实际踩坑记录
**文件：** `docs/tutorials/building-your-first-adapter.md`

---

### [+60] 向 Moss 提交你的第一个 Pull Request
**PR #92：** https://github.com/nishuzumi/moss/pull/92
**类型：** 新 Protocol Adapter（代码贡献）
**验证：** ✅ lint ✅ build ✅ typecheck ✅ test:offline (6/6)

---

### [+100] 为 Moss 新增一个 Protocol Adapter
**协议：** FastLane shMONAD 流动性质押
**实现内容：**

| 组件 | 说明 |
|------|------|
| ABI | explorer 来源，Monad 主网已验证合约 |
| stake Capability | MON → shMON，含 value 转账 |
| unstake Capability | shMON → MON，使用 ctx: ActionCtx |
| 4 个 Query | previewStake / previewUnstake / balanceOf / exchangeRate |
| 2 个 Receipt | stakeReceipt / unstakeReceipt（解码 Deposit/Withdraw 事件） |
| 测试 | 6 个测试覆盖注册、交易构建、Receipt 解析、失败路径 |

**踩坑记录：**
1. `ctx: ActionCtx` 缺失 → `Address "" is invalid`
2. test:offline 超时 → 国内网络没有 Monad RPC
3. 模板残留文件 → 必须删除 adapter.ts 和 example.ts

---

## Dev 方向

### [+20] AI-assisted Dev Plan
**项目：** Go 命令行持仓查询工具（Portfolio CLI）
**最小功能：** 输入地址 → 读链上余额 → AI 生成人类可读摘要
**技术栈：** Go + go-ethereum + DeepSeek API
**计划：** 5 天开发（ETH 余额 → ERC-20 → AI 摘要 → 串联 → 录屏）

---

### [+30] 文档到代码骨架
**项目：** Uniswap V2 最小实现
**产出：** `~/uniswap-v2-minimal/`（Solidity + Foundry）
**测试：** 6/6 通过
**文档来源：** https://docs.uniswap.org/contracts/v2/overview

---

### [+40] Prototype Evidence
**状态：** 已规划，本周完成
**项目：** Go Portfolio CLI 原型
**证明方式：** 30 秒终端录屏 + GitHub 仓库

---

### [+50] Dev Portfolio Pack
**打包内容：**

| 项目 | 链接 | 技术 |
|------|------|------|
| Moss FastLane Adapter | PR #92 | TypeScript, viem, Solidity |
| Moss 开发教程 | PR #103 | Markdown, 文档 |
| Uniswap V2 Minimal | 本地项目 | Solidity, Foundry |
| 链上彩票 | GitHub | Solidity, Foundry, Chainlink VRF |
| AgentCFO CAW 接入 | 黑客松 | Python, Cobo API |

---

## 统计

| 类别 | 任务数 | 积分 |
|------|--------|------|
| 基础任务 | 3 | 50 |
| Moss 专项 | 8 | 410 |
| Dev 方向 | 4 | 140 |
| **总计** | **15** | **600** |

> 注：Prototype Evidence 标记为本周待完成（+40），其余 14 项已完成。
