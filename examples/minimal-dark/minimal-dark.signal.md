# Design Signal — Minimal Dark
<!-- AI: This file defines the visual design system for this project.
     Apply these CSS variables when generating UI components. -->

## Signal
Precision · Focus · Professional

## When to use
- 开发者工具
- CLI/IDE 类产品
- 数据分析平台
- 专业工作流工具

## When to avoid
- 面向普通消费者的产品
- 需要暖色调或亲和感的品牌

## Why these tokens
近黑背景 + 冷色调蓝紫 accent，降低视觉噪音；高对比度文字层次强化信息密度感

## Reference brands
Vercel · GitHub Dark · Raycast

## Tokens
```css
--color-bg: #0e0e0f;
--color-bg-secondary: #141415;
--color-bg-elevated: #1c1c1e;
--color-border: rgba(255,255,255,0.07);
--color-border-strong: rgba(255,255,255,0.14);
--color-accent: #5e6ad2;
--color-accent-hover: #4f5bbf;
--color-text-1: #e5e5e6;
--color-text-2: #8f8f8f;
--color-text-3: #696969;
--font-display: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--text-xs: 11px;
--text-sm: 13px;
--text-base: 14px;
--text-lg: 18px;
--text-xl: 22px;
--text-2xl: 32px;
--text-3xl: 48px;
--weight-normal: 400;
--weight-medium: 500;
--weight-bold: 600;
--leading-base: 1.5;
--tracking-tight: -0.02em;
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--shadow-sm: 0 1px 2px rgba(0,0,0,.40);
--shadow-md: 0 4px 16px rgba(0,0,0,.50);
```