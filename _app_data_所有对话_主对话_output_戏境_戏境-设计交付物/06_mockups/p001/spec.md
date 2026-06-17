--
page_id: p001
page_name: 故事列表
layout:
  type: side-nav
  topbar_height: 56
  sidebar_width: 220
  content_padding: 24
regions:
  - id: sidebar
    name: 侧边栏
    components: [NavItem]
  - id: topbar
    name: 顶栏
    components: [TopBar]
  - id: content
    name: 内容区
    components: [StoryCard, Button, Tag]
components:
  - StoryCard
  - Button
  - Tag
states:
  - normal
navigation:
  entry_from: null
  links_to:
    - p005
    - p004
assets:
  - icon_story
  - icon_add
  - icon_delete
---
---
# 故事列表 设计标注

## 布局
- 页面宽度：1440px
- 顶栏高度：56px
- 侧栏宽度：220px
- 内容区内边距：24px

## 颜色
| 元素 | 颜色值 | Token名 |
|------|--------|---------|
| 页面背景 | #F9FAFB | neutral/1 |
| 卡片背景 | #FFFFFF | neutral/0 |
| 侧栏选中背景 | #F5F3FF | primary/surface |
| 主按钮 | #7C5CFC | primary |
| 金色按钮 | #C9984A | secondary |
| 进行中标签文字 | #7C5CFC | primary |
| 进行中标签背景 | #F5F3FF | primary/surface |
| 已完成标签文字 | #A87E38 | secondary/dark |
| 已完成标签背景 | #FFFBEB | secondary/surface |
| 章节进度文字 | #6B7280 | neutral/6 |
| 卡片顶部装饰线 | 紫金渐变 | gradient/card_top_accent |
| 侧栏选中竖条 | #7C5CFC | primary |
| 侧栏右边框 | #E5E7EB | neutral/3 |
| 顶栏底边框 | #E5E7EB | neutral/3 |
| 删除按钮 | #9CA3AF | neutral/5 |

## 字体
| 元素 | 字号 | 字重 | Token名 |
|------|------|------|--------|
| 页面标题 | 32px | Semibold | h1 |
| 故事标题 | 20px | Semibold | h3 |
| 章节进度 | 14px | Regular | body_sm |
| 模型/时间 | 12px | Regular | caption |
| 按钮文字 | 14px | Medium | body_sm |
| 菜单文字 | 14px | Regular/Medium | body_sm |
| 分区标题 | 16px | Medium | body |
| 标签文字 | 12px | Medium | caption |

## 间距
| 区域 | 间距值 | Token名 |
|------|--------|---------|
| 内容区内边距 | 24px | spacing/lg |
| 卡片内边距 | 24px | spacing/lg |
| 卡片间距 | 16px | spacing/base |
| 卡片网格列间距 | 16px | spacing/base |
| 菜单项高度 | 40px | - |
| 菜单项间距 | 4px | spacing/xs |
| 按钮内边距 | 12px 16px | - |

## 组件
| 组件 | 变体 | Token引用 |
|------|------|-----------|
| 故事卡片 | 信息卡片 | neutral/0 bg + shadow sm + 2px渐变装饰线 |
| 主按钮 | 默认 | primary bg + neutral/0 text |
| 金色按钮 | 默认 | secondary bg + neutral/0 text |
| 文字按钮 | 删除 | neutral/5 text |
| 状态标签 | 进行中 | primary/surface bg + primary text |
| 状态标签 | 已完成 | secondary/surface bg + secondary/dark text |
| 侧栏菜单项 | 默认 | neutral/0 bg + neutral/6 text/icon |
| 侧栏菜单项 | 选中 | primary/surface bg + primary text/icon + 3px primary左竖条 |
