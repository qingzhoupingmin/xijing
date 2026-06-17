--
page_id: p007
page_name: 章节回看
layout:
  type: side-collapsed-nav-with-chapter
  topbar_height: 56
  sidebar_width: 64
  chapter_width: 220
  content_padding: 0
regions:
  - id: sidebar
    name: 侧边栏
    components: [NavItem]
  - id: topbar
    name: 顶栏
    components: [TopBar, TabBar]
  - id: chapters
    name: 章节目录
    components: [ChapterList]
  - id: reading
    name: 阅读区
    components: [ReadingCard]
components:
  - Sidebar
  - TopBar
  - TabBar
  - ChapterList
  - ReadingCard
states:
  - normal
navigation:
  entry_from:
    - p004
  links_to:
    - p004
assets:
  - icon_menu
  - icon_chapter
---
---
# p007 章节回看 - 视觉设计规范

## 1. 布局结构

| 元素 | 规格 | Token |
|------|------|-------|
| 整体宽度 | 1440px | - |
| 左侧折叠侧栏 | 64px 宽, 100vh 高, 白底 | - |
| 顶栏 | 56px 高, 100vw, 白底 | - |
| 顶栏底边框 | 1px #E5E7EB | border/sidebar |
| 主内容区 | flex: 1, #F9FAFB 背景 | bg/page |
| 主内容分栏 | flex-row, gap 0 | - |
| 左侧章节目录 | 220px 宽, 白底, 100vh | - |
| 左侧目录右边框 | 1px #E5E7EB | border/default |
| 右侧阅读区 | flex: 1, 最大宽度 720px 居中 | - |

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
| 目录激活背景 | #F5F3FF | primary/surface |
| 目录激活左边框 | 3px #7C5CFC | primary |
| 目录激活文字 | #7C5CFC | primary |
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
| 目录项内边距 | 16px 20px | spacing/base |
| 组件间距 | 16px | spacing/base |
| 顶栏高度 | 56px | - |
| 侧栏宽度 | 64px | - |
| 目录栏宽度 | 220px | - |

## 5. 组件规范

### 侧栏导航 (Sidebar)
- 与 p004 相同规格
- 高度: 64px
- 背景: #FFFFFF
- 图标: 24px, 垂直排列
- 默认图标色: #6B7280
- 选中图标色: #7C5CFC
- 选中背景: #F5F3FF 圆角 12px

### 顶栏 (TopBar)
- 与 p004 相同规格
- 高度: 56px
- 背景: #FFFFFF
- 底边框: 1px #E5E7EB
- 面包屑: "我的故事 > 暗影编年"

### 标签页 (TabBar)
- 与 p004 相同规格
- "📚 回看" 选中状态 (紫色 #7C5CFC + 2px 下划线)
- "📖 阅读" 未选中 (灰色 #6B7280)

### 章节目录 (ChapterList)
- 宽度: 220px
- 背景: #FFFFFF
- 右边框: 1px #E5E7EB
- 标题: "章节目录" 14px #6B7280
- 章节项高度: 44px
- 章节项内边距: 16px 20px
- 默认状态: 14px #6B7280, hover 灰底
- 激活状态: 14px #7C5CFC, 背景 #F5F3FF, 左边框 3px #7C5CFC

### 阅读卡片 (ReadingCard)
- 与 p004 相同规格
- 背景: #FFFFFF
- 圆角: 12px
- 阴影: 0 1px 3px rgba(0,0,0,0.06)
- 最大宽度: 720px
- 内边距: 48px 垂直, 32px 水平
- 标题: h2 24px #1F2937
- 正文: 16px 1.8行高 #374151

### 按钮样式
- 主要按钮 (PrimaryButton): #7C5CFC + 白字
- 金色按钮 (GoldButton): #C9984A + 白字
