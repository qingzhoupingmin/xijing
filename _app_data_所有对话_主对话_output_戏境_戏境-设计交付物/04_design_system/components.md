# 戏境 — 组件规范 v3（浅色紫金版）

> 设计令牌参见 tokens.json v3。风格：「紫金书卷」——浅色为底，紫色为墨，金色为饰。干净通透，久看不累。

## 全局规则

- **浅色主题**：白色/浅灰底，深色文字，紫色+金色点缀
- **留白充裕**：间距宽松，信息密度适中，不拥挤
- **卡片白底微阴影**：干净卡片 + 柔和阴影，层次分明
- **紫色用于交互**：按钮、链接、高亮、选中态
- **金色用于强调**：核心CTA、完成状态、奖励感
- **渐变克制使用**：仅用于顶部装饰线、进度条、特殊CTA按钮，大面积不用渐变
- **4px 基准网格**
- **过渡动画**：250ms ease

---

## 1. 按钮 Button

### 变体

| 变体 | 背景 | 文字 | 边框 | 场景 |
|------|------|------|------|------|
| 主要 | primary (#7C5CFC) | #FFFFFF | 无 | 主操作（生成、保存、提交） |
| 次要 | #FFFFFF | neutral.7 | neutral.3 | 次操作（取消、返回） |
| 文字 | 透明 | primary | 无 | 轻操作（链接） |
| 危险 | #FFFFFF | semantic/error | semantic/error | 删除 |
| 金色 | secondary (#C9984A) | #FFFFFF | 无 | 进入故事、开始演绎 |
| 紫金渐变 | 渐变(#7C5CFC→#C9984A) | #FFFFFF | 无 | 仅用于最核心的Hero CTA |

### 尺寸

| 尺寸 | 高度 | 内边距 | 字号 | 圆角 |
|------|------|--------|------|------|
| Small | 28px | 8px 12px | 12 | 4 |
| Default | 36px | 12px 16px | 14 | 8 |
| Large | 44px | 16px 24px | 16 | 8 |

### 状态

| 状态 | 主要按钮 | 次要按钮 |
|------|---------|---------|
| Hover | primary_dark, shadow primary_glow | 背景 neutral.1, 边框 neutral.4 |
| Active | scale(0.98) | scale(0.98) |
| Disabled | opacity 0.4 | opacity 0.4 |

---

## 2. 输入框 Input

| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 背景 | #FFFFFF |
| 边框 | 1px neutral.3 (#E5E7EB) |
| 文字 | neutral.8, 14px |
| 占位符 | neutral.5, 14px |
| 圆角 | 8 |
| Focus | 边框变 primary，shadow primary_glow |

---

## 3. 卡片 Card

### 信息卡片（故事列表）

| 属性 | 值 |
|------|-----|
| 背景 | #FFFFFF |
| 边框 | 1px neutral.2 (#F3F4F6) |
| 圆角 | 12 |
| 内边距 | 24 |
| 阴影 | sm (轻柔) |
| Hover | 阴影变 md，边框变 neutral.3 |
| 顶部装饰 | 2px紫金渐变线（仅故事卡片使用） |

### 操作卡片

- 白底 + 微阴影
- hover阴影加深
- 无渐变边框

---

## 4. 弹窗 Dialog

| 属性 | 值 |
|------|-----|
| 遮罩 | rgba(0,0,0,0.4) |
| 背景 | #FFFFFF |
| 圆角 | 16 |
| 阴影 | xl |
| 标题区 | h3 semibold, 底部分割线 neutral.2 |

---

## 5. 导航 Navigation

### 侧边栏

| 属性 | 值 |
|------|-----|
| 宽度 | 220px / 64px折叠 |
| 背景 | #FFFFFF |
| 右边框 | 1px neutral.2 |

**菜单项**：
| 属性 | 值 |
|------|-----|
| 高度 | 40px |
| 当前项 | 背景 primary/surface (#F5F3FF)，文字 primary，左侧3px primary竖条 |
| Hover | 背景 neutral.1 |
| 图标 | 20px, neutral.5 → Active: primary |

### 顶部栏

| 属性 | 值 |
|------|-----|
| 高度 | 56px |
| 背景 | #FFFFFF |
| 底边框 | 1px neutral.2 |

### 标签页 Tabs

| 属性 | 值 |
|------|-----|
| 字号 | 14 |
| 颜色 | neutral.6 → Active: primary |
| 下划线 | 2px primary，Active显示 |

---

## 6. 表单 Form

### 步骤导航

| 属性 | 值 |
|------|-----|
| 圆圈 | 28px → Active: primary填充 → Done: primary填充+白色对勾 |
| 连接线 | 1px neutral.3 → Done: primary |
| 步骤标题 | 14px, neutral.5 → Active: neutral.8 → Done: primary |

### 表单布局

- 垂直布局：标签在上方，间距12
- 表单项间距：24

---

## 7. 反馈 Feedback

### Toast
- 背景 #FFFFFF
- 左侧3px语义色条
- 阴影 lg
- 3秒消失

### 标签 Tag

| 状态 | 背景 | 文字 |
|------|------|------|
| 进行中 | primary/surface (#F5F3FF) | primary |
| 已完成 | secondary/surface (#FFFBEB) | secondary_dark |
| 已废弃 | neutral.1 | neutral.5 |

---

## 8. 特殊组件

### 章节阅读区

| 属性 | 值 |
|------|-----|
| 背景 | #FFFFFF（卡片） |
| 最大宽度 | 720px居中 |
| 字号 | 16, line-height 1.8 |
| 文字色 | neutral.8 |
| 内边距 | 48垂直, 32水平 |

### 决策输入区

| 属性 | 值 |
|------|-----|
| 背景 | #FFFFFF |
| 顶部装饰 | 2px紫金渐变线 |
| 圆角 | 12 |
| 阴影 | sm |
| 局势描述 | 14px, secondary色 |
| 提交按钮 | 金色按钮 |

### 模型选择器

| 属性 | 值 |
|------|-----|
| 样式 | 下拉选择器 |
| 分组 | 系统内置 / 我的配置 |
| 宽度 | 200px |

---

## 9. 页面级渐变使用规范

渐变是调味料，不是主食——**克制使用**：

| 位置 | 渐变 | 说明 |
|------|------|------|
| 故事卡片顶部 | 紫→金 2px线 | 唯一视觉亮点，标识"故事" |
| 进度条填充 | 紫→金 | 进度可视化 |
| Hero CTA按钮 | 紫→金 | 仅首页/登录页核心按钮 |
| 主按钮 | 纯色 primary | 不用渐变，干净 |
| 页面背景 | 纯色 neutral.1 | 不用渐变 |
| 顶栏/侧栏 | 纯色 #FFFFFF | 不用渐变 |

**核心原则：白底+紫色交互+金色强调，大面积干净，小面积出彩**
