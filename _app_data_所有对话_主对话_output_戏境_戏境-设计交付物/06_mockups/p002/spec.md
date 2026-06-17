--
page_id: p002
page_name: API配置
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
    components: [Card, Switch, Button, Dialog]
components:
  - Card
  - Switch
  - Button
  - Dialog
  - Input
  - Select
states:
  - normal
navigation:
  entry_from:
    - p003
  links_to:
    - p001
assets:
  - icon_add
  - icon_delete
  - icon_eye
---
---
# API配置页 设计标注

## 布局
- 页面宽度：1440px
- 顶栏高度：56px
- 侧栏宽度：220px
- 内容区内边距：24px
- 内容区宽度：1440 - 220 = 1220px

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
| 辅助文字 | 12px | 400 | typography/scale/caption |

## 间距
| 区域 | 间距值 | Token名 |
|------|--------|---------|
| 侧栏项目内边距 | 12px 16px | spacing/md |
| 侧栏项目间距 | 4px | spacing/xs |
| 内容区内边距 | 24px | spacing/lg |
| 标题与内容间距 | 24px | spacing/lg |
| 卡片间距 | 16px | spacing/base |
| 卡片内边距 | 20px | spacing/md |

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

### 次要按钮 (Button - Secondary)
| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 背景色 | #7C5CFC |
| 文字颜色 | #FFFFFF |
| 圆角 | 8px |
| 字号 | 14px |
| 字重 | Medium |
| 内边距 | 0 16px |

### 配置卡片 (Card - Config)
| 属性 | 值 |
|------|-----|
| 背景色 | #FFFFFF |
| 圆角 | 12px |
| 阴影 | 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04) |
| 顶部装饰 | 2px solid #7C5CFC |
| 内边距 | 20px |

### 开关 (Switch)
| 属性 | 值 |
|------|-----|
| 宽度 | 44px |
| 高度 | 24px |
| 启用背景 | #10B981 |
| 禁用背景 | #E5E7EB |
| 圆角 | 12px |

### 文字按钮 (Button - Text)
| 属性 | 值 |
|------|-----|
| 文字颜色 | #6B7280 |
| 字号 | 14px |
| 背景 | transparent |

### 添加区域 (Add Section)
| 属性 | 值 |
|------|-----|
| 边框 | 2px dashed #E5E7EB |
| 圆角 | 12px |
| 内边距 | 24px |
| 文字颜色 | #6B7280 |
| 文字 | + 添加新配置 |

---

## 弹窗组件 (Dialog)

### 添加配置弹窗 (Add Config Dialog)
| 属性 | 值 |
|------|-----|
| 宽度 | 560px |
| 背景色 | #FFFFFF |
| 圆角 | 16px |
| 阴影 | 0 25px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.15) |
| 遮罩层 | rgba(0,0,0,0.4) |
| 内边距 | 24px |
| 标题字号 | 18px |
| 标题字重 | 600 (Semibold) |
| 标题颜色 | #1F2937 |
| 关闭按钮位置 | 右上角 24px |

### 厂商下拉 (Provider Select)
| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 背景色 | #FFFFFF |
| 边框 | 1px solid #E5E7EB |
| 圆角 | 8px |
| 下拉选项 | 文心一言 / 通义千问 / 智谱 / 豆包 / DeepSeek / 自定义 |
| 选中态背景 | #F5F3FF |
| 选中态颜色 | #7C5CFC |

### 输入框 (Input)
| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 背景色 | #FFFFFF |
| 边框 | 1px solid #E5E7EB |
| 圆角 | 8px |
| 文字颜色 | #1F2937 |
| 占位文字颜色 | #9CA3AF |
| 内边距 | 0 12px |

### API Key 输入框
| 属性 | 值 |
|------|-----|
| 类型 | password |
| 显示/隐藏切换 | 👁 图标 |
| 图标颜色 | #6B7280 |

### 自动填充标签 (Auto Fill Tag)
| 属性 | 值 |
|------|-----|
| 背景色 | #F5F3FF |
| 文字颜色 | #7C5CFC |
| 圆角 | 4px |
| 字号 | 12px |
| 内边距 | 2px 8px |

### 模型ID下拉 (Model Select)
| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 支持手动输入 | 是 |
| 下拉选项 | deepseek-chat / deepseek-reasoner |

### 按钮组 (Button Group)
| 属性 | 值 |
|------|-----|
| 布局 | flex, justify-end |
| 间距 | 12px |
| 取消按钮 | 次要样式(白底+边框, #6B7280文字) |
| 测试连接按钮 | 主要样式(#7C5CFC), 位于保存左侧 |
| 保存按钮 | 主要样式(#7C5CFC), 最右侧 |

### 按钮 - 次要 (Button - Secondary Outline)
| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 背景色 | #FFFFFF |
| 边框 | 1px solid #E5E7EB |
| 文字颜色 | #6B7280 |
| 圆角 | 8px |
| 字号 | 14px |
| 字重 | Medium |
| 内边距 | 0 16px |

---

## 交互逻辑

### 厂商选择 → 接口地址自动填充
| 厂商 | 接口地址 |
|------|---------|
| 文心一言 | https://qianfan.baidubce.com/v2/chat/completions |
| 通义千问 | https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions |
| 智谱 | https://open.bigmodel.cn/api/paas/v4/chat/completions |
| 豆包 | https://ark.cn-beijing.volces.com/api/v3/chat/completions |
| DeepSeek | https://api.deepseek.com/v1/chat/completions |
| 自定义 | 空(可手动填写) |

### 厂商 → 模型ID预设
| 厂商 | 常用模型ID |
|------|-----------|
| 文心一言 | ernie-4.0-8k-latest, ernie-3.5-8k |
| 通义千问 | qwen-turbo, qwen-plus, qwen-max |
| 智谱 | glm-4, glm-4-flash, glm-3-turbo |
| 豆包 | doubao-pro-32k, doubao-pro-128k |
| DeepSeek | deepseek-chat, deepseek-reasoner |
| 自定义 | 空(可手动填写) |

### API Key 密码态切换
- 默认：密码态，显示 `••••••••`
- 点击 👁 图标：切换为明文显示
- 再次点击：恢复密码态
