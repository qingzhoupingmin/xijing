--
page_id: p003
page_name: 个人中心
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
    components: [Card, Input, Button, Divider]
components:
  - Card
  - Input
  - Button
  - Divider
states:
  - normal
navigation:
  entry_from:
    - p001
  links_to:
    - p001
    - p002
assets:
  - avatar_placeholder
---
---
# 个人中心 设计标注

## 布局
- 页面宽度：1440px
- 顶栏高度：56px
- 侧栏宽度：220px
- 内容区内边距：24px
- 表单卡片内边距：24px

## 颜色
| 元素 | 颜色值 | Token名 |
|------|--------|---------|
| 页面背景 | #F9FAFB | neutral/1 |
| 侧栏背景 | #FFFFFF | neutral/0 |
| 顶栏背景 | #FFFFFF | neutral/0 |
| 主色调 | #7C5CFC | primary |
| 主色调浅色 | #9B82FC | primary_light |
| 主色调深色 | #6344E0 | primary_dark |
| 主色调表面 | #F5F3FF | primary/surface |
| 次要色 | #C9984A | secondary |
| 侧栏激活项背景 | #F5F3FF | primary/surface |
| 侧栏激活项边框 | 3px #7C5CFC | primary |
| 正文文字 | #1F2937 | neutral/8 |
| 辅助文字 | #374151 | neutral/7 |
| 占位文字 | #9CA3AF | neutral/5 |
| 分割线 | #E5E7EB | neutral/3 |

## 字体
| 元素 | 字号 | 字重 | Token名 |
|------|------|------|---------|
| 页面标题 | 24px | 600 (Semibold) | typography/scale/h2 |
| 导航文字 | 16px | 500 | typography/scale/body |
| 卡片标题 | 18px | 600 | typography/scale/h4 |
| 标签文字 | 14px | 400 | typography/scale/body_sm |
| 当前值文字 | 16px | 500 | typography/scale/body |
| 辅助文字 | 12px | 400 | typography/scale/caption |

## 间距
| 区域 | 间距值 | Token名 |
|------|--------|---------|
| 侧栏项目内边距 | 12px 16px | spacing/md |
| 侧栏项目间距 | 4px | spacing/xs |
| 内容区内边距 | 24px | spacing/lg |
| 标题与卡片间距 | 24px | spacing/lg |
| 卡片内边距 | 24px | spacing/lg |
| 表单分组间距 | 16px | spacing/base |
| 表单元素间距 | 12px | spacing/md |
| 标签与输入框间距 | 8px | spacing/sm |

## 组件

### 侧栏 (Sidebar)
| 属性 | 值 |
|------|-----|
| 宽度 | 220px |
| 背景色 | #FFFFFF |
| 边框右侧 | 1px solid #E5E7EB |

### 侧栏Logo区域
| 属性 | 值 |
|------|-----|
| 高度 | 64px |
| 内边距 | 0 16px |
| 文字 | 戏境 |
| 字号 | 24px |
| 字重 | Bold |
| 颜色 | #7C5CFC |

### 侧栏导航项 (NavItem)
| 属性 | 值 |
|------|-----|
| 高度 | 44px |
| 内边距 | 12px 16px |
| 圆角 | 8px |
| 文字颜色 | #1F2937 |
| 激活状态背景 | #F5F3FF |
| 激活状态边框 | 左侧 3px solid #7C5CFC |
| 激活状态文字颜色 | #7C5CFC |

### 顶栏 (Topbar)
| 属性 | 值 |
|------|-----|
| 高度 | 56px |
| 背景色 | #FFFFFF |
| 边框底部 | 1px solid #E5E7EB |

### 页面标题区
| 属性 | 值 |
|------|-----|
| 内边距 | 24px |
| 标题字号 | 24px |
| 标题字重 | Semibold |

### 表单卡片 (Card - Form)
| 属性 | 值 |
|------|-----|
| 背景色 | #FFFFFF |
| 圆角 | 12px |
| 阴影 | 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04) |
| 内边距 | 24px |

### 表单分组 (FormGroup)
| 属性 | 值 |
|------|-----|
| 标题字号 | 18px |
| 标题字重 | Semibold |
| 标题颜色 | #1F2937 |

### 分隔线 (Divider)
| 属性 | 值 |
|------|-----|
| 高度 | 1px |
| 背景色 | #E5E7EB |
| 上下间距 | 24px |

### 表单标签 (Label)
| 属性 | 值 |
|------|-----|
| 字号 | 14px |
| 字重 | 400 |
| 颜色 | #374151 |
| 底部间距 | 8px |

### 输入框 (Input)
| 属性 | 值 |
|------|-----|
| 宽度 | 100% |
| 最大宽度 | 320px |
| 高度 | 40px |
| 背景色 | #FFFFFF |
| 边框 | 1px solid #E5E7EB |
| 圆角 | 8px |
| 字号 | 14px |
| 内边距 | 0 12px |

### 当前值显示 (Value Display)
| 属性 | 值 |
|------|-----|
| 字号 | 16px |
| 字重 | 500 |
| 颜色 | #1F2937 |

### 主按钮 (Button - Primary)
| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 背景色 | #7C5CFC |
| 文字颜色 | #FFFFFF |
| 圆角 | 8px |
| 字号 | 14px |
| 字重 | Medium |
| 内边距 | 0 20px |
| 阴影 | 0 4px 14px rgba(124, 92, 252, 0.25) |
