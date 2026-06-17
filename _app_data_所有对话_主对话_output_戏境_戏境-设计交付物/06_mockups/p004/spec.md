--
page_id: p004
page_name: 故事演绎
layout:
  type: side-collapsed-nav
  topbar_height: 56
  sidebar_width: 64
  content_padding: 0
regions:
  - id: sidebar
    name: 侧边栏
    components: [NavItem]
  - id: topbar
    name: 顶栏
    components: [TopBar, TabBar, Select]
  - id: reading
    name: 阅读区
    components: [ReadingCard, GeneratingProgress]
  - id: decision
    name: 决策区
    components: [DecisionPanel, Textarea, Button]
components:
  - Sidebar
  - TopBar
  - TabBar
  - ReadingCard
  - DecisionPanel
  - Textarea
  - Button
  - Select
states:
  - normal
  - loading
  - error
navigation:
  entry_from:
    - p001
  links_to:
    - p001
    - p007
assets:
  - icon_menu
  - icon_back
  - icon_model
  - icon_generate
  - icon_cancel
---
---
# p004 故事演绎 - 视觉设计规范

## 1. 布局结构

| 元素 | 规格 | Token |
|------|------|-------|
| 整体宽度 | 1440px | - |
| 左侧折叠侧栏 | 64px 宽, 100vh 高, 白底 | - |
| 顶栏 | 56px 高, 100vw, 白底 | - |
| 顶栏底边框 | 1px #E5E7EB | border/sidebar |
| 主内容区 | flex: 1, #F9FAFB 背景 | bg/page |
| 阅读卡片 | 最大宽度 720px, 居中 | - |
| 阅读区内边距 | 48px 垂直, 32px 水平 | spacing/lg |
| 决策区卡片 | 最大宽度 720px, 居中 | - |

## 2. 颜色系统

| 用途 | 色值 | Token |
|------|------|-------|
| 页面背景 | #F9FAFB | bg/page |
| 卡片背景 | #FFFFFF | bg/card |
| 主色-紫色 | #7C5CFC | primary |
| 辅色-金色 | #C9984A | secondary |
| 侧栏背景 | #FFFFFF | bg/sidebar |
| 侧栏图标默认 | #6B7280 | text/secondary |
| 侧栏图标选中 | #7C5CFC | primary |
| 选中图标背景 | #F5F3FF | primary/surface |
| 标题文字 | #1F2937 | text/title |
| 正文文字 | #374151 | text/body |
| 辅助文字 | #6B7280 | text/secondary |
| 金色文字 | #C9984A | secondary |
| 边框色 | #E5E7EB | border/default |

## 3. 字体规范

| 元素 | 字号 | 行高 | 字重 | Token |
|------|------|------|------|-------|
| h2 章节标题 | 24px | 1.3 | 600 | heading/h2 |
| body 正文 | 16px | 1.8 | 400 | text/body |
| body_sm 正文小 | 14px | 1.6 | 400 | text/body_sm |
| caption 辅助 | 12px | 1.4 | 400 | text/caption |

## 4. 间距系统

| 用途 | 数值 | Token |
|------|------|-------|
| 页面边距 | 0 | - |
| 卡片内边距-大 | 48px 32px | spacing/lg |
| 卡片内边距-中 | 24px | spacing/md |
| 组件间距 | 16px | spacing/base |
| 按钮高度 | 28px / 36px | - |
| 顶栏高度 | 56px | - |
| 侧栏宽度 | 64px | - |

## 5. 组件规范

### 侧栏导航 (Sidebar)
- 宽度: 64px
- 背景: #FFFFFF
- 图标: 24px, 垂直排列
- 默认图标色: #6B7280
- 选中图标色: #7C5CFC
- 选中背景: #F5F3FF 圆角 12px
- 间距: 图标间 24px

### 顶栏 (TopBar)
- 高度: 56px
- 背景: #FFFFFF
- 底边框: 1px #E5E7EB
- 左侧: 折叠按钮 ☰
- 中间: 面包屑 "我的故事 > 暗影编年"
- 右侧: 模型选择器 + 生成按钮

### 标签页 (TabBar)
- 高度: 48px
- 未选中: #6B7280
- 选中: #7C5CFC + 2px 紫色下划线
- 字号: 14px

### 阅读卡片 (ReadingCard)
- 背景: #FFFFFF
- 圆角: 12px
- 阴影: 0 1px 3px rgba(0,0,0,0.06)
- 最大宽度: 720px
- 内边距: 48px 垂直, 32px 水平
- 标题: h2 24px #1F2937
- 正文: 16px 1.8行高 #374151

### 决策区 (DecisionPanel)
- 背景: #FFFFFF
- 圆角: 12px
- 阴影: 0 1px 3px rgba(0,0,0,0.06)
- 顶部边框: 2px 紫金渐变 (#7C5CFC → #C9984A)
- 最大宽度: 720px
- 内边距: 24px
- 局势描述: 14px #C9984A 斜体
- Textarea: 白底, #E5E7EB边框, 3行
- 提交按钮: #C9984A + 白字, 36px高

### 主要按钮 (PrimaryButton)
- 背景: #7C5CFC
- 文字: #FFFFFF
- 高度: 28px (小号) / 36px (中号)
- 圆角: 8px
- 字重: 500

### 金色按钮 (GoldButton)
- 背景: #C9984A
- 文字: #FFFFFF
- 高度: 36px
- 圆角: 8px
- 字重: 500

## 6. 补充状态：生成中（流式输出）

### 进度条 (GeneratingProgress)
- 位置: 阅读卡片上方，紧贴卡片顶边
- 高度: 3px
- 宽度: 720px (与阅读卡片同宽)
- 颜色: 紫金渐变 (#7C5CFC → #C9984A)
- 进度: 约40%位置
- 动画: 微弱流动效果

### 闪烁光标 (BlinkingCursor)
- 字符: ▎
- 颜色: #7C5CFC (primary)
- 位于最后一段正文末尾
- 模拟流式输入中状态

### 取消生成按钮 (CancelGenerateButton)
- 替代顶栏右侧"生成章节"按钮
- 背景: #F3F4F6 (neutral灰)
- 文字: #374151
- 高度: 28px
- 圆角: 8px

### 生成中文案
- 位置: 阅读区右下角
- 文字: "正在生成中..."
- 颜色: #7C5CFC (primary)
- 字号: 14px
- 字重: 500

### 决策区
- 状态: **隐藏**（生成中不显示决策区）

---

## 7. 补充状态：生成失败/错误

### 错误提示卡片 (ErrorCard)
- 位置: 阅读卡片内部，替换正文区域
- 背景: #FEF2F3 (error_surface)
- 圆角: 12px
- 左边框: 3px #EF4444 (semantic/error)
- 内边距: 20px 24px

### 错误图标 + 标题
- 图标: ❌
- 标题: "生成失败"
- 字号: 16px
- 字重: 600 (semibold)
- 颜色: #1F2937 (text/title)

### 错误描述
- 文字: "API调用超时，请尝试重试或切换模型"
- 字号: 14px
- 颜色: #6B7280 (text/secondary)

### 操作按钮行
| 按钮 | 样式 | 高度 | Token |
|------|------|------|-------|
| 重试 | 紫色#7C5CFC + 白字 | 28px | primary |
| 切换模型重试 | 白底 + #E5E7EB边框 + #374151文字 | 28px | secondary |

### 决策区
- 状态: **隐藏**（错误态不显示决策区）

### 上一章节内容
- 位置: 错误卡片上方
- 显示上次成功生成的章节缩略内容
- 文字变淡 (#9CA3AF) 表示非当前焦点
