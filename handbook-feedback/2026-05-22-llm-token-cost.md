# 示例：LLM 章节缺少 token 计费说明

- **日期**：2026-05-22
- **类型**：💡 补充建议
- **Handbook 页面**：https://aiweb3.school/zh/handbook/ai/llm/
- **发现课节**：Week 1 Day 3

## 问题描述

LLM 章节讲 token 机制很清晰，但对新手来说，读完不知道实际调用 API 时 token 是怎么计费的。比如：输入 token 和输出 token 价格不同，不同模型 tokenizer 不同导致同样文字消耗不同 token 数等。

## 建议改法

在 token 小节后面增加一个「Token 与成本」子章节，简介：
1. 输入 token vs 输出 token 的计费差异
2. 不同模型的 token 价格对比（GPT、Claude、DeepSeek 等）
3. 如何用 tiktoken 等工具估算 token 消耗

## 来源

学习 Week 1 的 LLM 章节时，想估算「每天学 2 小时大概花多少 API 费用」，但 Handbook 里没有相关指引。
