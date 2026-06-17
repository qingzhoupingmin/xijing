# 戏境 - 前端开发指南

## 项目概述

戏境（Xijing）是一个 AI 驱动的互动叙事平台，采用「紫金书卷」设计风格——浅色为底，紫色为墨，金色为饰。

### 技术栈建议

- **框架**: React 18 + TypeScript 或 Vue 3 + TypeScript
- **样式**: Tailwind CSS + CSS 自定义属性（tokens.css）
- **图标**: Lucide Icons
- **状态管理**: Zustand / Pinia
- **路由**: React Router 6 / Vue Router 4
- **HTTP**: Axios / Fetch
- **构建**: Vite

## 文件结构

```
dev/
├── tokens.css              # CSS 自定义属性（设计令牌）
├── tokens.json             # 设计令牌原始数据
├── components-schema.json  # 组件 API 定义
├── color-palette.csv       # 颜色色板表格
├── typography-scale.csv     # 字体阶梯表格
├── spacing-scale.csv       # 间距阶梯表格
├── assets-manifest.json    # 图标/资产清单
├── README.md               # 本文件
└── pages/
    ├── p001.json           # 故事列表
    ├── p002.json           # API配置
    ├── p003.json           # 个人中心
    ├── p004.json           # 故事演绎
    ├── p005.json           # 创建故事
    ├── p006.json           # 登录页
    └── p007.json           # 章节回看
```

## 设计令牌使用

### 方式一：CSS 自定义属性

在入口文件中引入 `tokens.css`：

```css
@import './tokens.css';

.button {
  background-color: var(--color-primary);
  color: var(--color-neutral-0);
  border-radius: var(--radius-md);
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-medium);
}
```

### 方式二：Tailwind CSS 配置

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#7C5CFC',
        secondary: '#C9984A',
        // ... 完整配置参考 tokens.css
      },
      fontFamily: {
        sans: ['SourceHanSansSC', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'md': '8px',
        'lg': '12px',
      },
    },
  },
}
```

## 组件使用

### Button 按钮

```tsx
import { Button } from '@/components';

// 主要按钮
<Button variant="primary">主要按钮</Button>

// 次要按钮
<Button variant="secondary">次要按钮</Button>

// 金色按钮（进入故事）
<Button variant="gold">开始演绎</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>
```

### Card 卡片

```tsx
import { Card } from '@/components';

// 普通卡片
<Card>
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</Card>

// 故事卡片（带顶部紫金渐变线）
<Card variant="story">
  <h3>故事标题</h3>
  <p>进度信息</p>
</Card>
```

### Input 输入框

```tsx
import { Input } from '@/components';

<Input
  placeholder="请输入..."
  onChange={(e) => setValue(e.target.value)}
/>

// 密码输入
<Input type="password" placeholder="请输入密码" />

// 错误状态
<Input error="输入有误" />
```

### Select 下拉选择器

```tsx
import { Select } from '@/components';

<Select
  options={[
    { value: 'deepseek-chat', label: 'DeepSeek Chat' },
    { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner' },
  ]}
  onChange={(value) => setModel(value)}
/>
```

### Dialog 弹窗

```tsx
import { Dialog } from '@/components';

<Dialog
  open={isOpen}
  title="添加配置"
  onClose={() => setIsOpen(false)}
>
  <Form />
  <Dialog.Footer>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>取消</Button>
    <Button variant="primary">保存</Button>
  </Dialog.Footer>
</Dialog>
```

## 布局模式

### 侧边栏布局（p001, p002, p003, p005）

```
┌─────────┬────────────────────────────────┐
│         │  顶栏 (56px)                    │
│ 侧边栏   ├────────────────────────────────┤
│ (220px) │                                │
│         │         内容区                   │
│         │                                │
│         │                                │
└─────────┴────────────────────────────────┘
```

### 折叠侧栏布局（p004, p007）

```
┌───┬────────────────────────────────┐
│   │  顶栏 (56px)                    │
│侧 ├────────────────────────────────┤
│边 │                                │
│栏 │         内容区                   │
│(64│                                │
│px)│                                │
└───┴────────────────────────────────┘
```

### 带章节目录布局（p007）

```
┌───┬──────────┬────────────────────┐
│   │ 章节目录  │                    │
│侧 ├──────────┤      阅读区         │
│边 │ (220px)  │    (最大720px)     │
│栏 │          │                    │
│(64│          │                    │
│px)│          │                    │
└───┴──────────┴────────────────────┘
```

### 全屏布局（p006）

```
         ┌──────────────────┐
         │  登录卡片         │
         │  (400px宽)       │
         │                  │
         └──────────────────┘
```

## 还原优先级

### P0 - 必须还原

| 页面 | 说明 |
|------|------|
| p006 登录页 | 用户入口，必须保证可用 |
| p001 故事列表 | 核心功能页面 |
| p004 故事演绎 | 核心交互页面，包含阅读和决策 |
| p005 创建故事 | 故事创建流程 |

### P1 - 高优先级

| 页面 | 说明 |
|------|------|
| p002 API配置 | 功能配置页面 |
| p003 个人中心 | 用户设置页面 |

### P2 - 中优先级

| 页面 | 说明 |
|------|------|
| p007 章节回看 | 辅助功能 |

## 状态管理

### 故事状态

```tsx
interface Story {
  id: string;
  title: string;
  status: 'in_progress' | 'completed';
  progress: string;
  model: string;
  updatedAt: string;
}
```

### 演绎状态

```tsx
interface PlayingState {
  status: 'idle' | 'loading' | 'playing' | 'error';
  currentChapter: Chapter | null;
  chapters: Chapter[];
  situation: string;
}
```

## API 集成

### 主要接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/stories` | GET | 获取故事列表 |
| `/api/stories` | POST | 创建故事 |
| `/api/stories/:id` | DELETE | 删除故事 |
| `/api/stories/:id/generate` | POST | 生成章节 |
| `/api/configs` | GET/POST/DELETE | API配置管理 |
| `/api/user/profile` | GET/PUT | 用户信息 |

## 设计规范要点

1. **颜色使用**
   - 紫色 `#7C5CFC` 用于主操作、选中态
   - 金色 `#C9984A` 用于核心CTA、完成状态
   - 白底卡片 + 轻阴影

2. **间距系统**
   - 基准网格 4px
   - 常用间距：8px, 16px, 24px

3. **圆角**
   - 小：4px（标签）
   - 中：8px（按钮、输入框）
   - 大：12px（卡片）
   - 特大：16px（弹窗）

4. **阴影**
   - 卡片：`0 1px 3px rgba(0,0,0,0.06)`
   - 按钮悬停：`0 4px 14px rgba(124,92,252,0.25)`

5. **过渡动画**
   - 默认：`250ms ease`
   - 快速交互：`150ms ease`

## 图标替换

参考 `assets-manifest.json`，将所有 Unicode 占位图标替换为 Lucide Icons：

```tsx
// 替换前
<span>📖</span>

// 替换后
import { BookOpen } from 'lucide-react';
<BookOpen size={20} />
```

## 注意事项

1. 所有文本使用 Source Han Sans SC（思源黑体）
2. 移动端暂不支持（预留响应式）
3. 深色模式预留，暂不实现
4. 流式输出使用 SSE（Server-Sent Events）
