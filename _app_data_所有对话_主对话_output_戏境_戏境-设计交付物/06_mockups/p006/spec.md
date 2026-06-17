--
page_id: p006
page_name: 登录页
layout:
  type: fullscreen
  content_padding: 32
regions:
  - id: card
    name: 登录卡片
    components: [TabSwitch, Card, Input, Button]
components:
  - TabSwitch
  - Card
  - Input
  - Button
states:
  - normal
navigation:
  entry_from: null
  links_to:
    - p001
assets:
  - logo_placeholder
---
---
# 登录页 设计标注

## 布局
- 页面宽度：1440px
- 页面高度：全屏
- 登录卡片宽度：400px
- 登录卡片高度：auto (约560px，含Tab切换)
- 内容区内边距：24px
- 登录卡片内边距：32px

## 颜色
| 元素 | 颜色值 | Token名 |
|------|--------|---------|
| 页面背景 | #F9FAFB | neutral/1 |
| 登录卡片背景 | #FFFFFF | neutral/0 |
| 主色调 | #7C5CFC | primary |
| 主色调浅色 | #9B82FC | primary_light |
| 主色调深色 | #6344E0 | primary_dark |
| 次要色 | #C9984A | secondary |
| 副标题文字 | #6B7280 | neutral/6 |
| 输入框边框 | #E5E7EB | neutral/3 |
| 链接文字 | #7C5CFC | primary |
| 卡片顶部装饰线 | 渐变 #7C5CFC → #C9984A | gradient |

## 字体
| 元素 | 字号 | 字重 | Token名 |
|------|------|------|---------|
| Logo文字 | 32px | 700 (Bold) | typography/scale/h1 |
| 副标题 | 12px | 400 | typography/scale/caption |
| Tab文字 | 14px | 500 | typography/scale/body_sm |
| 按钮文字 | 16px | 500 (Medium) | typography/scale/body |
| 输入框占位符 | 14px | 400 | typography/scale/body_sm |
| 链接文字 | 14px | 500 | typography/scale/body_sm |

## 间距
| 区域 | 间距值 | Token名 |
|------|--------|---------|
| Logo与副标题间距 | 8px | spacing/sm |
| 副标题与Tab栏间距 | 20px | spacing/lg |
| Tab与表单间距 | 20px | spacing/lg |
| 输入框间距 | 16px | spacing/base |
| 按钮与链接间距 | 16px | spacing/base |
| 登录卡片内边距 | 32px | spacing/xl |

## 组件

### Tab切换组件 (TabSwitch)
| 属性 | 值 |
|------|-----|
| 宽度 | 100% |
| 高度 | 40px |
| Tab项宽度 | 50% 各占一半 |
| 间距 | 无间距，并排 |

#### Tab项状态
| 状态 | 文字颜色 | 下划线 | 字号 |
|------|----------|--------|------|
| 选中 (注册) | #7C5CFC (primary) | 2px solid #7C5CFC | 14px |
| 未选中 (登录) | #6B7280 (neutral/6) | 无 | 14px |

### Logo
- 标签：div 紫色艺术字
- 字号：32px
- 字重：Bold
- 颜色：#7C5CFC

### 副标题
- 标签：p
- 字号：12px
- 颜色：#6B7280
- 文字：AI驱动互动叙事平台

### 输入框 (Input)
| 属性 | 值 |
|------|-----|
| 宽度 | 100% |
| 高度 | 36px |
| 背景色 | #FFFFFF |
| 边框 | 1px solid #E5E7EB |
| 圆角 | 8px |
| 字号 | 14px |
| 内边距 | 0 12px |

### 主按钮 (Button - Primary)
| 属性 | 值 |
|------|-----|
| 宽度 | 100% |
| 高度 | 44px |
| 背景色 | #7C5CFC |
| 文字颜色 | #FFFFFF |
| 圆角 | 8px |
| 字号 | 16px |
| 字重 | Medium |
| 文字 | 注册 |
| 阴影 | 0 4px 14px rgba(124, 92, 252, 0.25) |

### 链接文字
| 属性 | 值 |
|------|-----|
| 颜色 | #7C5CFC |
| 字号 | 14px |
| 字重 | Medium |
| 文字 | 已有账号？登录 |

### 登录卡片 (Card - Login)
| 属性 | 值 |
|------|-----|
| 宽度 | 400px |
| 背景色 | #FFFFFF |
| 圆角 | 16px |
| 阴影 | 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04) |
| 顶部装饰 | 2px 紫金渐变线 |

### 背景装饰
- 类型：紫色光晕
- 位置：居中，卡片周围
- 透明度：低 (约8%)

## 表单内容（注册Tab）

### 注册表单字段
| 字段 | 类型 | Placeholder | 必填 |
|------|------|-------------|------|
| 邮箱 | input[type=email] | 请输入邮箱 | ✓ |
| 密码 | input[type=password] | 请输入密码 | ✓ |
| 确认密码 | input[type=password] | 请再次输入密码 | ✓ |

### 表单交互
- Tab切换：点击Tab切换登录/注册表单显示
- 注册按钮：点击触发注册流程
- 底部链接：点击切换到登录Tab
