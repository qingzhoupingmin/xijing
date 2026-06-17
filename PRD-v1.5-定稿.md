---
AIGC:
    Label: "1"
    ContentProducer: 001191110102MACQD9K64018705
    ProduceID: 1624398257455872_0-data_volume/7648923811898736930-files/所有对话/主对话/AI小说角色扮演/PRD-v1.5-定稿.md
    ReservedCode1: ""
    ContentPropagator: 001191110102MACQD9K64028705
    PropagateID: 1624398257455872#1781684158341
    ReservedCode2: ""
---
# 戏境 — 产品需求文档 v1.5

## 1. 项目概述

**项目名称：** 戏境
**产品定位：** AI驱动的互动叙事平台——用户创建小说大纲和世界设定，扮演主角进入故事，AI按大纲推进剧情，关键决策由用户自主输入，共同完成一部小说
**目标用户：** 个人及亲友（小规模，5-10人）
**技术栈：** 前端 TypeScript + Vue3 + Element Plus + Vite | 后端 Express + MySQL + JWT | 多AI模型API（文心4.5 / GLM-4.7-Flash / 用户自配模型如DeepSeek等）
**超级管理员：** 独立后台管理页面，不参与业务功能，负责账号管理、操作日志、数据备份等系统运维

---

## 2. 技术架构

### 2.1 整体架构

```
┌─────────────────────────────────────────────────┐
│                   前端 (Vue3 SPA)                │
│  TypeScript + Vue3 + Element Plus + Vite + Pinia │
└───────────────────────┬─────────────────────────┘
                        │ HTTP / SSE
┌───────────────────────┴─────────────────────────┐
│                 后端 (Express)                    │
│  路由 → 中间件(JWT鉴权/错误处理) → Controller    │
│  → Service → AI适配层 / MySQL                    │
└──────────┬────────────────────────┬──────────────┘
           │                        │
    ┌──────┴──────┐          ┌─────┴─────┐
    │   MySQL     │          │  AI APIs   │
    │   数据存储   │          │ (多模型统一) │
    └─────────────┘          └───────────┘
```

### 2.2 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue3 | 3.4+ | 核心框架，Composition API + `<script setup>` |
| TypeScript | 5.x | 全量TS，严格模式，接口类型全覆盖 |
| Element Plus | 2.5+ | UI组件库，表单/表格/对话框/消息提示等 |
| Vite | 5.x | 构建工具，开发热更新，生产打包 |
| Pinia | 2.x | 状态管理（用户信息/当前故事/模型列表等） |
| Vue Router | 4.x | 路由管理，路由守卫鉴权 |
| Axios | 1.x | HTTP请求，拦截器统一处理Token和错误 |
| markdown-it | - | 章节内容Markdown渲染 |
| highlight.js | 11.x | Markdown代码块语法高亮（AI生成内容可能含代码片段） |
| DOMPurify | 3.x | XSS防护，Markdown渲染前净化HTML（配合markdown-it使用） |

**前端目录结构**：
```
xijing-web/
├── public/
├── src/
│   ├── api/                # 接口层：按模块拆分（auth.ts / story.ts / chapter.ts / apiConfig.ts）
│   ├── assets/             # 静态资源
│   ├── components/         # 通用组件
│   │   ├── StoryEditor/    # 大纲编辑器
│   │   ├── WorldBuilder/   # 世界观设定表单
│   │   ├── CharacterForm/  # 角色设定表单
│   │   ├── ChapterView/    # 章节阅读+决策输入
│   │   └── ModelSelect/    # 模型选择下拉
│   ├── composables/        # 组合式函数（useStream / useStory / useAuth）
│   ├── layouts/            # 布局组件（MainLayout / BlankLayout）
│   ├── router/             # 路由配置 + 守卫（登录后默认跳转欢迎页；/admin/*路由仅超管可访问）
│   ├── stores/             # Pinia Store（user / story / model）
│   ├── types/              # TypeScript类型定义（全量接口类型）
│   ├── utils/              # 工具函数（request封装 / token管理 / SSE解析）
│   ├── views/              # 页面视图
│   │   ├── Welcome.vue     # 欢迎页（大屏问候+快速入口）
│   │   ├── Login.vue       # 登录/注册（Tab切换）+ 忘记密码
│   │   ├── ResetPassword.vue # 重置密码（邮件链接落地页）
│   │   ├── Home.vue        # 故事列表
│   │   ├── StoryCreate.vue # 创建故事（大纲/世界/角色）
│   │   ├── StoryPlay.vue   # 故事演绎（章节+决策）
│   │   ├── ChapterRead.vue # 章节回看
│   │   └── ApiConfig.vue   # API配置管理
│   ├── admin/              # 管理后台（独立模块，仅超管可访问）
│   │   ├── AdminLayout.vue # 管理后台布局（侧边栏导航）
│   │   ├── Dashboard.vue   # 管理首页（系统概览）
│   │   ├── AccountMgmt.vue # 账号管理
│   │   ├── LogView.vue     # 日志查看
│   │   └── DataBackup.vue  # 数据备份
│   ├── App.vue
│   └── main.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

**前端关键实现**：
- **SSE流式渲染**：章节生成时，后端通过SSE推送文本流，前端用`EventSource`或`fetch + ReadableStream`逐字渲染，配合`markdown-it`实时解析显示
- **Markdown渲染预配置**：在`composables/useStory`中统一初始化markdown-it实例：配置highlight.js做代码块语法高亮、DOMPurify做渲染前HTML净化（防XSS注入），所有章节内容渲染走此实例，避免分散配置
- **表单联动**：API配置页选厂商→自动填充接口地址→模型ID下拉联动；世界观设定选"中等"→AI补全后表单变为可编辑
- **路由守卫**：未登录重定向到登录页；登录后默认跳转欢迎页；`/admin/*`路由守卫校验`role=super_admin`，非超管返回403；故事进行中页面防止误离开（`beforeRouteLeave`）
- **Pinia持久化**：用户Token和基础信息存`localStorage`，页面刷新不丢失

### 2.3 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Express | 4.x | Web框架，路由+中间件 |
| TypeScript | 5.x | 全量TS，接口类型与前端共享 |
| mysql2 | 3.x | MySQL驱动，支持Promise和连接池 |
| JWT (jsonwebtoken) | 9.x | 用户认证，Token签发与验证 |
| bcryptjs | 2.x | 密码哈希 |
| dotenv | 16.x | 环境变量管理 |
| cors | 2.x | 跨域配置 |
| helmet | 7.x | 安全头 |
| morgan | 1.x | 请求日志 |
| crypto | 内置 | API Key加密存储（AES-256-GCM） |
| nodemailer | 6.x | 邮件发送（密码重置等） |
| express-rate-limit | 7.x | 接口限流（防暴力破解、防滥用） |

**后端目录结构**：
```
xijing-server/
├── src/
│   ├── config/             # 配置（数据库/密钥/内置模型预设）
│   ├── middleware/          # 中间件（auth.ts / adminAuth.ts / errorHandle.ts / validate.ts / rateLimit.ts）
│   ├── router/             # 路由注册
│   │   ├── auth.ts         # /api/auth  注册/登录/忘记密码/重置密码
│   │   ├── story.ts        # /api/story 故事CRUD+大纲+世界+角色
│   │   ├── chapter.ts      # /api/chapter 章节生成/查看
│   │   ├── decision.ts     # /api/decision 提交决策
│   │   ├── apiConfig.ts    # /api/config API配置CRUD+测试连接
│   │   └── admin.ts        # /api/admin 超管专属（账号管理/日志/备份）
│   ├── controller/         # 控制器：参数校验+调用Service+返回响应
│   ├── service/            # 业务逻辑层
│   │   ├── auth.ts
│   │   ├── story.ts
│   │   ├── chapter.ts
│   │   ├── aiContext.ts    # AI上下文管理（摘要压缩/Token控制）
│   │   ├── apiConfig.ts
│   │   └── admin.ts        # 超管业务（账号管理/日志查询/数据备份）
│   ├── ai/                 # AI模型适配层
│   │   ├── callModel.ts    # 统一调用入口
│   │   ├── providers.ts    # 厂商预设配置表
│   │   ├── promptBuilder.ts# Prompt组装（System+Context+决策注入）
│   │   └── sseParser.ts    # SSE流解析
│   ├── model/              # 数据访问层（SQL封装）
│   │   ├── user.ts
│   │   ├── story.ts
│   │   ├── chapter.ts
│   │   ├── apiConfig.ts
│   │   └── admin.ts        # 管理后台数据访问（日志/备份统计）
│   ├── utils/              # 工具函数（加密/响应格式/分页/邮件发送）
│   ├── types/              # TypeScript类型定义
│   └── app.ts              # Express入口
├── .env                    # 环境变量
├── tsconfig.json
└── package.json
```

**后端关键实现**：
- **JWT认证**：登录签发Token（有效期7天），中间件校验；Token过期返回401，前端自动跳转登录
- **API Key加密**：用户自配的API Key用`AES-256-GCM`加密后存库，解密仅在后端Service层，密钥从`env`读取
- **SSE流式输出**：章节生成接口返回`Content-Type: text/event-stream`，后端流式读取AI响应并逐chunk推送，前端实时渲染；**断线处理**：前端检测SSE连接中断后，已接收内容暂存为"未完成草稿"（后端任务状态标记为`paused`），提供"继续生成"（将草稿+原Prompt重新发送AI续写衔接）和"重新生成"两个选项，而非简单丢弃
- **连接池**：mysql2配置连接池（max:10），复用连接避免频繁建连
- **错误统一处理**：全局错误中间件捕获，区分业务错误（400系列）和系统错误（500）
- **超管鉴权**：`/api/admin/*`路由挂载`adminAuth`中间件，校验JWT中`role=super_admin`，非超管返回403
- **接口限流**：登录/注册/忘记密码接口限流（5次/分钟/IP），防暴力破解；AI生成接口限流（10次/分钟/用户），防滥用
- **参数化查询**：所有SQL一律使用mysql2参数化占位符（`?`），禁止字符串拼接SQL，从根源杜绝SQL注入
- **输入校验**：全局validate中间件对所有用户输入做类型+长度+格式校验，XSS过滤（html-entities转义），拒绝非法字符
- **操作日志**：关键操作（登录/注册/密码重置/删除故事/管理操作）写入operation_logs表，超管可查

### 2.4 前后端接口约定

**通用响应格式**：
```typescript
// 成功
{ code: 0, data: T, message: "ok" }
// 失败
{ code: 40001, data: null, message: "邮箱已注册" }
```

**核心接口清单**：

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /api/auth/register | 注册 | 无 |
| POST | /api/auth/login | 登录 | 无 |
| GET | /api/auth/profile | 获取用户信息 | JWT |
| PUT | /api/auth/password | 修改密码 | JWT |
| POST | /api/auth/forgot-password | 忘记密码（发送重置邮件） | 无 |
| POST | /api/auth/reset-password | 重置密码（Token验证+设置新密码） | 无 |
| GET | /api/story | 故事列表 | JWT |
| POST | /api/story | 创建故事（含大纲+世界+角色） | JWT |
| GET | /api/story/:id | 故事详情 | JWT |
| PUT | /api/story/:id/outline | 修改后续大纲 | JWT |
| DELETE | /api/story/:id | 删除故事（硬删） | JWT |
| GET | /api/story/:id/chapters | 章节列表 | JWT |
| POST | /api/chapter/generate | 生成章节（SSE流式） | JWT |
| GET | /api/chapter/:id | 章节详情 | JWT |
| POST | /api/decision | 提交决策 | JWT |
| POST | /api/decision/suggest | AI决策建议（生成3个行动方向） | JWT |
| GET | /api/story/:id/export | 导出TXT | JWT |
| GET | /api/story/:id/token-usage | 故事Token消耗统计 | JWT |
| GET | /api/config | API配置列表 | JWT |
| POST | /api/config | 添加API配置 | JWT |
| PUT | /api/config/:id | 修改配置 | JWT |
| DELETE | /api/config/:id | 删除配置 | JWT |
| POST | /api/config/:id/test | 测试连接 | JWT |
| GET | /api/models/available | 获取可用模型列表（内置+自配） | JWT |
| GET | /api/admin/users | 用户列表（分页/搜索/筛选） | 超管JWT |
| PUT | /api/admin/users/:id/status | 启用/禁用用户 | 超管JWT |
| PUT | /api/admin/users/:id/password | 重置用户密码 | 超管JWT |
| DELETE | /api/admin/users/:id | 删除用户及关联数据 | 超管JWT |
| GET | /api/admin/logs | 操作日志列表（分页/筛选） | 超管JWT |
| POST | /api/admin/backup | 触发数据备份 | 超管JWT |
| GET | /api/admin/backups | 备份文件列表 | 超管JWT |
| GET | /api/admin/backups/:id/download | 下载备份文件 | 超管JWT |
| DELETE | /api/admin/backups/:id | 删除备份文件 | 超管JWT |
| GET | /api/admin/stats | 系统概览统计 | 超管JWT |

**章节生成接口（SSE）请求示例**：
```typescript
// POST /api/chapter/generate
// Content-Type: application/json
{
  story_id: 1,
  model: "deepseek-chat",           // 模型标识
  model_source: "user_config",      // system_builtin / user_config
  config_id: 3                      // model_source=user_config时必填
}

// 响应：Content-Type: text/event-stream
// data: {"type":"content","text":"第一章 "}
// data: {"type":"content","text":"夜幕降临..."}
// data: {"type":"situation","text":"当前局势..."}
// data: {"type":"done","chapter_id":15}
// data: {"type":"error","message":"API调用超时"}
```

### 2.5 环境变量

```env
# 服务
PORT=3000
NODE_ENV=production

# 数据库
DB_HOST=localhost
DB_PORT=3306
DB_USER=xijing
DB_PASSWORD=xxx
DB_NAME=xijing

# JWT
JWT_SECRET=xxx
JWT_EXPIRES_IN=7d

# 超级管理员（首次启动自动创建，已存在则跳过）
# 启动逻辑：Node服务启动时检查users表中是否存在role=super_admin的记录
# → 不存在：使用下方邮箱和密码自动创建超管账号
# → 已存在：跳过创建，无论环境变量如何配置
# 部署顺序：先执行SQL建表脚本 → 再启动Node服务（服务启动时自动完成超管初始化）
SUPER_ADMIN_EMAIL=admin@xijing.local
SUPER_ADMIN_PASSWORD=xxx

# 备份存储路径
BACKUP_DIR=/app/data/backups

# API Key加密密钥
ENCRYPTION_KEY=xxx        # AES-256-GCM密钥，32字节hex

# 邮件服务（用于密码重置）
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=xxx
SMTP_PASS=xxx
SMTP_FROM="戏境 <noreply@example.com>"

# 系统内置模型
WENXIN_API_URL=https://qianfan.baidubce.com/v2/chat/completions
WENXIN_API_KEY=xxx
WENXIN_MODEL_ID=ernie-4.5-8k

GLM_API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions
GLM_API_KEY=xxx
GLM_MODEL_ID=glm-4.7-flash
```

---

## 3. 功能清单

### 模块一：用户系统

| 编号 | 子功能 | 说明 |
|------|--------|------|
| F101 | 注册 | 注册表单（与登录同卡片Tab切换）：邮箱、密码、注册按钮；昵称默认取邮箱@前缀，可在个人中心修改；注册成功自动登录并跳转欢迎页 |
| F102 | 登录 | 登录表单：邮箱、密码、登录按钮；底部"没有账号？注册"切换至注册Tab；"忘记密码？"链接进入密码重置流程 |
| F103 | 个人中心 | 修改昵称/密码，查看我的故事列表，管理员可重置用户密码；阅读长度偏好设置（标准5000字/短篇2000字），影响章节生成的max_tokens参数 |
| F104 | API配置 | 用户可配置自己的AI模型API；内置主流厂商预设（文心一言/通义千问/智谱/豆包/DeepSeek），选厂商后自动填充接口地址，只需填Key和选模型；也支持自定义接口地址接入任意OpenAI兼容服务 |
| F105 | 忘记密码 | 登录页"忘记密码"入口，输入注册邮箱后系统发送重置链接邮件，用户点击链接进入重置密码页面设置新密码；重置Token有效期30分钟，一次性使用 |
| F106 | 欢迎页 | 登录后首屏大屏欢迎页面，根据时段显示问候语（早上好/中午好/下午好/晚上好）+用户昵称，提供快捷入口（继续故事/创建新故事） |

### 模块二：世界观工坊（创建故事）

| 编号 | 子功能 | 说明 |
|------|--------|------|
| F201 | 基础信息 | 步骤1：故事标题（必填，Input）、主题/类型（下拉选择：玄幻/都市/科幻/历史/悬疑/其他）、故事前提（必填，Textarea，一句话概括） |
| F202 | 大纲编辑 | 步骤2：结构描述（起承转合，Textarea）、章节规划（可拖拽排序的章节条目列表，每章：标题+简要走向）、结局方向（Textarea，AI必须朝此方向收束）；故事进行中不允许修改已过章节的大纲，但可以修改后续章节的走向 |
| F203 | 世界设定 | 步骤3：详细度选择（中等/深度，Radio）、世界观简介（Textarea）、体系名称+描述（Input+Textarea）、阵营关系（动态表单，可添加/删除）、地理概况（动态表单，可添加/删除）；中等详细度时AI可补全，补全后变为可编辑表单 |
| F204 | 角色设定 | 步骤4：主角区（必填：姓名Input、性格Textarea、背景Textarea、能力Textarea）+ 添加配角按钮（可选：姓名Input、与主角关系Input、立场Select、性格Textarea）；配角可添加多个，每项可删除 |
| F205 | AI补全设定 | 用户选择"中等"设定时，AI自动补充细节（地理、势力、体系等），补全后全部变为可编辑表单，用户可修改任何AI生成的设定 |

### 模块三：故事演绎（核心体验）

| 编号 | 子功能 | 说明 |
|------|--------|------|
| F301 | 章节生成 | AI根据大纲+已有剧情+用户决策，一次性生成约5000字的一章；生成前用户可选择模型（系统内置文心4.5/GLM-4.7-Flash，或自己配置的API）；**生成中状态**：阅读区文字逐字流式出现（打字机效果）、顶部细进度条（渐变色）、"生成章节"按钮变为"取消生成"（灰色，可中断）、决策区隐藏；生成失败/超时显示提示，用户可点击重试（可切换模型重试）；异常结果不保存 |
| F302 | 关键决策 | AI在章节末尾暂停，提示当前局势，用户自由输入行动/对话；**仅章节生成完成后决策区才显示**，生成中决策区隐藏；**AI决策建议**：决策区提供"获取建议"按钮（非强制），点击后AI根据当前局势生成3个可能的行动方向供用户参考选择，用户可直接选用或自行输入；按钮旁标注"生成建议将消耗额外Token" |
| F303 | 决策续写 | AI根据用户决策+大纲走向，继续生成下一章 |

### 模块四：故事管理

| 编号 | 子功能 | 说明 |
|------|--------|------|
| F401 | 故事列表 | 最多3个进行中的故事，显示进度（当前章节/总章节），删除为硬删 |
| F402 | 章节回看 | 查看已生成的所有章节内容 |
| F403 | 导出TXT | 一键导出完整小说为TXT文件 |

### 模块五：超级管理后台

> 独立后台页面，超管专用，不参与任何业务功能（不创建故事/不使用AI），只做系统运维。

| 编号 | 子功能 | 说明 |
|------|--------|------|
| F501 | 超管登录 | 超管账号通过环境变量初始化（首次启动自动创建），通过同一登录页登录，JWT中携带`role: super_admin`标识；登录后自动跳转管理后台而非欢迎页 |
| F502 | 系统概览 | Dashboard首页：用户总数、故事总数、今日活跃、存储占用、最近操作日志Top5 |
| F503 | 账号管理 | 用户列表（分页+邮箱搜索+状态筛选）；可启用/禁用账号（禁用后该用户Token立即失效无法登录）、重置用户密码、删除用户及全部关联数据（硬删，需二次确认） |
| F504 | 操作日志 | 记录关键操作：用户登录/注册/密码重置、故事创建/删除、AI生成调用、管理操作（禁用/重置/删除/备份）；按时间/用户/操作类型筛选；日志保留90天自动清理 |
| F505 | 数据备份 | 一键触发mysqldump全库备份（gzip压缩），备份文件存入`BACKUP_DIR`；可查看备份列表、下载备份文件、删除旧备份；备份文件命名格式：`xijing_backup_YYYYMMDD_HHmmss.sql.gz` |

---

## 4. 数据库表结构

```sql
-- 用户表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nickname VARCHAR(100) DEFAULT '',           -- 昵称，默认取邮箱@前缀
    role ENUM('user', 'super_admin') DEFAULT 'user',  -- 角色：普通用户 / 超级管理员
    status ENUM('active', 'disabled') DEFAULT 'active', -- 账号状态：正常 / 禁用
    chapter_length_pref ENUM('standard', 'short') DEFAULT 'standard', -- 阅读长度偏好：标准5000字 / 短篇2000字
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 密码重置表
CREATE TABLE password_resets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,       -- 重置Token（加密随机字符串）
    expires_at DATETIME NOT NULL,             -- 过期时间（创建后30分钟）
    used TINYINT DEFAULT 0,                   -- 是否已使用
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email_token (email, token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 操作日志表
CREATE TABLE operation_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,                              -- 操作用户ID（系统操作为NULL）
    user_email VARCHAR(255),                  -- 操作用户邮箱（冗余，方便查询）
    action VARCHAR(100) NOT NULL,             -- 操作类型：login/register/reset_password/create_story/delete_story/generate_chapter/admin_disable/admin_reset/admin_delete/backup/...
    target_type VARCHAR(50),                  -- 操作对象类型：user/story/chapter/config
    target_id INT,                            -- 操作对象ID
    detail TEXT,                              -- 操作详情（JSON格式，如{"model":"wenxin4.5","chapter":3}）
    ip VARCHAR(45),                           -- 操作IP
    user_agent VARCHAR(500),                  -- 浏览器UA
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_action (user_id, action),
    INDEX idx_created_at (created_at),
    INDEX idx_action (action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户API配置表（用户可配置自己的AI模型接口）
CREATE TABLE user_api_configs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    config_name VARCHAR(100) NOT NULL,       -- 配置名称（如"我的DeepSeek"、"自建模型"）
    provider VARCHAR(50) DEFAULT 'custom',   -- 厂商标识：wenxin/qwen/zhipu/doubao/deepseek/custom
    api_base_url VARCHAR(500) NOT NULL,      -- API接口地址（选预设后自动填充，自定义需手动填写）
    api_key VARCHAR(500) NOT NULL,           -- API Key（加密存储）
    model_id VARCHAR(100) NOT NULL,          -- 模型标识（如 deepseek-chat、glm-4-flash等）
    is_active TINYINT DEFAULT 1,             -- 是否启用
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 故事表
CREATE TABLE stories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    status ENUM('active', 'completed', 'abandoned') DEFAULT 'active',
    current_chapter INT DEFAULT 0,
    total_chapters INT,
    default_model VARCHAR(50) DEFAULT 'wenxin4.5',  -- 默认生成模型：wenxin4.5 / glm-4.7-flash / user_{config_id}
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 大纲表
CREATE TABLE outlines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL UNIQUE,
    theme VARCHAR(200),
    premise TEXT NOT NULL,                    -- 故事前提（一句话概括）
    structure TEXT NOT NULL,                  -- 结构描述：起承转合
    ending_direction TEXT,                    -- 结局走向（AI必须朝此方向收束）
    chapters_json JSON NOT NULL,             -- 章节大纲：[{chapter:1, title:"...", summary:"..."}]
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 世界设定表
CREATE TABLE world_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL UNIQUE,
    world_intro TEXT,
    system_name VARCHAR(200),                 -- 体系名称（魔法/科技/修仙...）
    system_desc TEXT,                         -- 体系描述（规则/等级/限制）
    factions_json JSON,                       -- 阵营关系
    geography_json JSON,                      -- 地理概况
    ai_supplemented TINYINT DEFAULT 0,
    raw_user_input TEXT,                      -- 用户原始输入（未补全前）
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 角色表
CREATE TABLE characters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL,
    role_type ENUM('protagonist', 'supporting') NOT NULL,
    name VARCHAR(100) NOT NULL,
    personality TEXT,
    background TEXT,
    abilities TEXT,
    stance VARCHAR(50),                       -- 立场（盟友/敌人/中立/亦敌亦友）
    relationship TEXT,                        -- 与主角关系描述
    ai_supplemented TINYINT DEFAULT 0,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 章节表
CREATE TABLE chapters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL,
    chapter_num INT NOT NULL,
    title VARCHAR(200),
    content LONGTEXT NOT NULL,                -- 章节正文（标准约5000字/短篇约2000字）
    draft_content LONGTEXT DEFAULT NULL,      -- 未完成草稿（SSE断线时暂存已接收内容），新建章节时允许为空
    generation_status ENUM('generating','paused','completed','failed') DEFAULT 'completed', -- 生成状态
    is_decision_point TINYINT DEFAULT 0,
    situation_summary TEXT,                   -- 决策点局势描述
    model_used VARCHAR(50),                   -- 生成本章使用的模型标识
    tokens_used INT DEFAULT 0,                -- 本次生成消耗的Token数
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    UNIQUE KEY uk_story_chapter (story_id, chapter_num)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户决策表
CREATE TABLE decisions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL,
    chapter_num INT NOT NULL,
    user_input TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- AI上下文表
CREATE TABLE ai_context (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL UNIQUE,
    story_memory TEXT,                        -- 故事摘要（随章节推进压缩更新）
    last_chapter_summary TEXT,
    active_characters TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 5. 核心流程

### 流程一：创建故事（4步向导）

```
用户点击"新建故事"
        ↓
【步骤1 基础信息】
  ┌────────────────────────────────────────────────┐
  │  故事标题 *     [________________________]      │
  │  主题/类型      [▼ 玄幻 / 都市 / 科幻 / ...]   │
  │  故事前提 *     [                              ]│
  │                 [ 一句话概括你的故事          ]│
  │                 [______________________________]│
  │                              [下一步 →]         │
  └────────────────────────────────────────────────┘
        ↓
【步骤2 大纲编辑】
  结构描述（起承转合）：Textarea
  章节规划：
    - 可拖拽排序的章节条目列表（拖拽把手视觉强化，⠿图标+hover高亮）
    - 每章：章节标题Input + 简要走向Textarea
    - "添加章节"按钮
  结局方向：Textarea（AI必须朝此方向收束）
        ↓
【步骤3 世界设定】
  ┌────────────────────────────────────────────────┐
  │  详细度    ○ 中等（AI补全细节）  ○ 深度（全手填）│
  │                                                 │
  │  世界观简介    [__________________________]      │
  │  体系名称      [__________________________]      │
  │  体系描述      [__________________________]      │
  │                                                 │
  │  阵营关系      [+ 添加阵营]                      │
  │    ┌ 阵营1: 名称[____] 描述[____________] ✕ ┐   │
  │    └ 阵营2: 名称[____] 描述[____________] ✕ ┘   │
  │                                                 │
  │  地理概况      [+ 添加地点]                      │
  │    ┌ 地点1: 名称[____] 描述[____________] ✕ ┐   │
  │    └ 地点2: 名称[____] 描述[____________] ✕ ┘   │
  │                                                 │
  │  【中等详细度时】AI补全按钮 → 补全后表单变为可编辑 │
  └────────────────────────────────────────────────┘
        ↓
【步骤4 角色设定】
  ┌────────────────────────────────────────────────┐
  │  ◆ 主角（必填）                                 │
  │  姓名 *        [________________________]       │
  │  性格 *        [________________________]       │
  │  背景 *        [________________________]       │
  │  能力          [________________________]       │
  │                                                 │
  │  ◆ 配角（可选）                                 │
  │  [+ 添加配角]                                   │
  │    ┌ 配角1:                                     │
  │    │ 姓名[____] 与主角关系[____]                │
  │    │ 立场[▼ 盟友/敌人/中立/亦敌亦友]            │
  │    │ 性格[_______________]                  ✕   │
  │    └─────────────────────────────────────────┘   │
  └────────────────────────────────────────────────┘
        ↓
系统保存所有设定 → 故事状态=active，current_chapter=0
        ↓
提示用户："准备就绪，进入故事"
跳转至欢迎页

【备注】故事进行中，用户可修改后续章节的大纲走向（已过章节不可改）
【步骤条】顶部显示步骤进度：①基础信息 → ②大纲编辑 → ③世界设定 → ④角色设定，已完成的步骤可点击回看
```

### 流程二：章节生成与决策（核心循环）

```
用户进入故事 → 选择本次使用的模型
  模型来源：
  ① 系统内置：文心4.5 / GLM-4.7-Flash（系统统一API Key）
  ② 用户自配：用户在"API配置"中添加的模型（如DeepSeek等，使用用户自己的Key）
        ↓
【组装Prompt】
  System Prompt = 角色指令（你是小说作者，按大纲推进，关键节点让主角决策）
  Context = {
    世界设定,
    角色设定,
    大纲（当前章节的走向要求）,
    故事记忆摘要（前情提要，控制token）,
    上一章摘要（如有）,
    上一次用户决策（如有）
  }
        ↓
根据模型来源调用对应API：
  - 系统内置模型 → 调用系统预配置的API
  - 用户自配模型 → 调用用户配置的 api_base_url + api_key
  → 流式返回约5000字章节内容
        ↓
【生成中状态】（用户等待5-15秒，此状态是核心体验的关键环节）
  阅读区：文字逐字流式出现（打字机效果），SSE每推送一个chunk即追加渲染
  顶部：细进度条（渐变色，随生成持续推进）+ 章节编号旁loading旋转图标
  按钮："生成章节" → 变为"取消生成"（灰色），点击可中断当前生成
  决策区：隐藏，不显示局势描述和输入框
        ↓
【SSE断线处理】（网络波动/中断时）
  前端检测SSE连接断开 → 已接收内容暂存为draft_content（后端标记generation_status=paused）
  前端显示提示："网络连接中断，已保存已生成内容"
  提供两个选项：
    ① "继续生成"：将draft_content+原始Prompt重新发送给AI（Prompt中注明"请从以下内容继续，保持衔接"），AI续写剩余部分
    ② "重新生成"：丢弃draft_content，从头重新生成
        ↓
【生成完成】
  进度条消失，loading图标消失
  后端标记generation_status=completed
  按钮恢复为"生成下一章"
  决策区出现：局势描述 + "你的行动："输入框 + "获取建议"按钮
        ↓
【AI生成质量校验】（后端在保存前自动执行，不合格不保存）
  ① 乱码检测：内容中非UTF-8有效字符占比>10% → 判定失败
  ② 自我认知泄露检测：正则匹配"我是AI"/"作为语言模型"/"作为AI助手"等模式 → 判定失败
  ③ 上下文相关性检测：生成内容与当前章节大纲/前文摘要的关键词重叠度极低（<5%）→ 判定失败
  判定失败 → generation_status=failed，前端提示"生成内容异常，请重试（可切换模型）"，异常内容不保存
        ↓
【异常处理】
  - API调用超时（>60s）→ 前端提示重试，可切换模型
  - 返回内容异常（质量校验不通过）→ 不保存，提示重试（可换模型）
  - 用户自配API Key无效/余额不足 → 提示"API配置异常，请检查Key或切换模型"
  - 用户主动取消 → 已接收的内容不保存，回到生成前状态
        ↓
【AI输出判断】
  - 章节正常推进 → 保存章节，章末标注 is_decision_point=1
  - AI同时输出局势描述
        ↓
页面展示：章节正文 → 底部显示局势描述 → 输入框"你的行动：" + "获取建议"按钮
        ↓
用户自由输入行动/对话（不可修改已生成内容，人生不可逆）
  或点击"获取建议"→ AI生成3个行动方向 → 用户选择一个或自行输入
        ↓
保存决策到 decisions 表
        ↓
更新 ai_context（故事摘要压缩、活跃角色更新）
        ↓
进入下一章生成 → 循环直到大纲中最后一章
```

### 流程三：故事收束

```
AI检测到当前章节 = 大纲最后一章
        ↓
根据大纲结局方向 + 用户所有决策的历史影响 → 生成终章
        ↓
章末标注 is_decision_point=0（终章无决策点）
        ↓
故事状态更新为 completed
        ↓
展示"故事完结"页面 → 可一键导出TXT
```

### 流程四：AI上下文管理（Token控制）

```
每次生成新章节前：
        ↓
检查已有章节数：
  - <=3章：完整保留所有章节内容作为上下文
  - >3章：使用故事摘要 + 最近2章原文 + 当前章节大纲
        ↓
故事摘要更新策略：
  - 每生成3章，调用一次AI："将以下N章内容压缩为1000字摘要，保留关键事件和决策"
  - 压缩结果写入 ai_context.story_memory
        ↓
确保每次API调用的总token不超过模型限制
```

### 流程五：用户API配置

```
用户进入"API配置"页面
        ↓
点击"添加配置"
        ↓
选择厂商（下拉预设）：
  ┌──────────┬──────────────────────────────────────────────────┬──────────────────────┐
  │ 厂商     │ 接口地址（自动填充）                              │ 常用模型ID            │
  ├──────────┼──────────────────────────────────────────────────┼──────────────────────┤
  │ 文心一言 │ https://qianfan.baidubce.com/v2/chat/completions │ ernie-4.5-8k等       │
  │ 通义千问 │ https://dashscope.aliyuncs.com/compatible-mode/  │ qwen-plus、qwen-turbo│
  │          │ v1/chat/completions                              │                      │
  │ 智谱     │ https://open.bigmodel.cn/api/paas/v4/chat/      │ glm-4-flash、        │
  │          │ completions                                      │ glm-4.7-flash        │
  │ 豆包     │ https://ark.cn-beijing.volces.com/api/v3/chat/   │ 接入点ID（endpoint    │
  │          │ completions                                      │ ID，在火山引擎控制台  │
  │          │                                                  │ 创建）               │
  │ DeepSeek │ https://api.deepseek.com/v1/chat/completions     │ deepseek-chat、      │
  │          │                                                  │ deepseek-reasoner    │
  │ 自定义   │ （手动填写）                                      │ （手动填写）          │
  └──────────┴──────────────────────────────────────────────────┴──────────────────────┘
        ↓
选择厂商后 → 接口地址自动填充 → 用户只需填写：
  ① API Key
  ② 模型ID（下拉常见选项 + 可手动输入）
        ↓
点击"测试连接"→ 后端发送一条测试请求验证Key和接口可用性
        ↓
测试通过 → 保存配置（API Key加密存储，前端展示脱敏尾4位）
        ↓
生成章节时，模型选择列表中显示：
  - 文心4.5（系统内置）
  - GLM-4.7-Flash（系统内置）
  - 我的DeepSeek（自配）
  - 我的通义千问（自配）
  - ...其他已配置的模型
```

---

## 6. AI Prompt 策略

### 多模型支持

系统支持三类AI模型来源，统一使用OpenAI Chat Completion兼容接口格式：

**系统内置模型（系统Key，开箱即用）：**

| 模型 | 标识 | 特点 | 适用场景 |
|------|------|------|----------|
| 文心4.5 | wenxin4.5 | 文学功底强，叙事细腻 | 重视文笔和沉浸感 |
| GLM-4.7-Flash | glm-4.7-flash | 免费额度足，响应快 | 文心额度用尽、快速生成 |

**用户自配模型（用户自己的Key，内置厂商预设）：**

| 厂商 | provider标识 | 接口地址 | 常用模型ID | 备注 |
|------|-------------|---------|-----------|------|
| 文心一言 | wenxin | https://qianfan.baidubce.com/v2/chat/completions | ernie-4.5-8k、ernie-speed等 | 百度千帆平台V2兼容接口 |
| 通义千问 | qwen | https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions | qwen-plus、qwen-turbo、qwen-max | 阿里云DashScope兼容模式 |
| 智谱 | zhipu | https://open.bigmodel.cn/api/paas/v4/chat/completions | glm-4-flash、glm-4.7-flash | 智谱开放平台 |
| 豆包 | doubao | https://ark.cn-beijing.volces.com/api/v3/chat/completions | 接入点ID（endpoint_id） | 火山引擎方舟平台，model_id填endpoint_id |
| DeepSeek | deepseek | https://api.deepseek.com/v1/chat/completions | deepseek-chat、deepseek-reasoner | DeepSeek官方 |
| 自定义 | custom | 用户手动填写 | 用户手动填写 | 任意OpenAI兼容接口 |

**模型选择策略**：
- 创建故事时可设默认模型（stories.default_model）
- 每次生成前可临时切换，不影响默认设置
- 同一故事的不同章节可以使用不同模型
- 每章记录实际使用的模型（chapters.model_used），方便后续对比效果
- 用户自配模型统一走OpenAI兼容Chat Completion格式，后端一套适配逻辑覆盖所有厂商

**后端模型适配层**：
```javascript
// 统一调用接口——所有厂商共用一套OpenAI兼容格式
async function callModel(modelConfig, messages, stream = true) {
  const { api_base_url, api_key, model_id } = modelConfig;
  
  // 统一请求体（OpenAI Chat Completion标准格式）
  const body = {
    model: model_id,
    messages,
    stream,
    temperature: 0.85,
    max_tokens: 8192,
  };

  // 统一请求头（Bearer Token认证，国内厂商均支持）
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_key}`,
  };

  // 流式/非流式统一处理
  const response = await fetch(api_base_url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (stream) {
    // 解析SSE流，统一返回格式
    return parseSSEStream(response);
  }
  return response.json();
}
```

**适配要点**：
- 所有模型一律走HTTP API调用，不使用任何厂商SDK，统一OpenAI兼容格式
- 所有厂商均使用API Key直接作为Bearer Token认证（包括豆包），无需IAM或其他认证方式
- 豆包特殊：model_id填接入点ID（endpoint_id），其余格式与其他厂商一致
- 自定义：用户自行确保接口兼容OpenAI格式
- 所有厂商的流式输出均为SSE格式，解析逻辑统一

### System Prompt（核心指令）

```
你是一位小说创作大师，正在与用户共同完成一部互动小说。

【核心规则】
1. 严格按照大纲推进剧情。原则：过程自由，结局收束。用户的决策可以改变故事的过程和路径，但不改变大纲设定的结局方向。如果用户偏离大纲路径，通过创造性的剧情事件（如"你不去城堡但城堡来找你"）将故事引导回大纲方向，同时让用户保持选择感
2. 每次生成约5000字的一个完整章节（如用户设置了短篇偏好则约2000字）
3. 章节末尾必须设置决策点：描述当前局势，让主角（用户）做出关键选择
4. 用户的选择必须对后续剧情产生实质性影响，不能让决策变成摆设
5. 角色行为必须符合设定，不得OOC
6. 文笔要求：沉浸式第三人称叙事，对话生动，场景描写有画面感
7. **请严格保持与前文一致的叙事风格和词汇习惯**，不得在章节中途或章节之间突然改变文风、人称或叙事节奏

【禁止事项】
- 不得以任何形式暴露自己是AI或语言模型
- 不得输出"作为AI"/"我是语言模型"等自我认知表述
- 不得输出与前文无关的无关内容

【输出格式】
章节标题：xxx
章节正文：（约5000字）
---
【局势】当前局势描述，需要主角做出的关键决策
```

### 补全设定的 Prompt

```
你是一位世界构建师。用户提供了基础的世界设定，请补充以下细节：
1. 至少3个具体地理位置及其特色
2. 阵营/势力的详细关系图谱
3. 体系（魔法/科技/修仙等）的具体规则和等级划分
4. 至少2个值得探索的隐藏设定或悬念

要求：补充内容与用户原始设定风格一致，不冲突。
```

### 决策建议的 Prompt

```
你是一位互动小说的剧情顾问。根据当前局势，为主角提供3个可能的行动方向。

【当前局势】{situation_summary}
【主角设定】{protagonist_info}
【大纲走向】{outline_hint}

要求：
1. 提供3个不同方向的行动建议（激进/谨慎/创意各一个）
2. 每个建议用一句话描述（不超过30字）
3. 建议必须与主角性格和当前局势匹配
4. 不要替用户做决定，只提供参考

输出格式（严格JSON）：
{"suggestions": ["建议1", "建议2", "建议3"]}
```

---

## 7. MVP 范围

### ✅ 第一版必须做

| 模块 | 功能 | 说明 |
|------|------|------|
| 用户系统 | 注册 | 注册表单（Tab切换），邮箱+密码，昵称自动生成 |
| 用户系统 | 登录 | 登录表单（Tab切换），邮箱+密码 |
| 用户系统 | 忘记密码 | 邮箱重置链接，30分钟有效 |
| 欢迎页 | 大屏问候 | 登录后首屏，显示昵称+时段问候语+快捷入口 |
| 用户系统 | API配置 | 用户可添加自己的AI模型Key |
| 世界观工坊 | 基础信息+大纲+世界+角色 | 4步向导，完整表单 |
| 世界观工坊 | 世界设定+AI补全 | 中等设定+AI补全是差异化体验 |
| 世界观工坊 | 角色设定 | 主角必填，配角建议填 |
| 故事演绎 | 章节生成 | 核心体验，含生成中状态（流式打字机+进度条+取消按钮+决策区隐藏） |
| 故事演绎 | 关键决策+续写 | 互动的灵魂，含AI决策建议 |
| 故事管理 | 故事列表 | 3个故事上限 |
| 故事管理 | 章节回看 | 阅读体验 |
| 故事管理 | 导出TXT | 用户明确要求，末尾自动添加AI标识 |
| 用户系统 | 阅读长度偏好 | 标准5k字/短篇2k字 |
| 故事演绎 | Token消耗统计 | 故事维度累计Token数展示 |
| 超管后台 | 系统概览 | 用户/故事/活跃统计 |
| 超管后台 | 账号管理 | 启用/禁用/重置密码/删除 |
| 超管后台 | 操作日志 | 关键操作审计 |
| 超管后台 | 数据备份 | mysqldump+下载 |
| 安全防护 | SQL注入防护 | 参数化查询，禁止拼接SQL |
| 安全防护 | XSS防护 | 输入过滤+输出转义 |
| 安全防护 | 接口限流 | 登录防暴力破解，AI生成防滥用 |
| 安全防护 | 认证安全 | JWT+超管独立鉴权+禁用用户Token立即失效 |

### ❌ 第一版明确不做

| 功能 | 原因 | 预计版本 |
|------|------|----------|
| 故事分享/公开 | 小规模私人用 | v2 |
| 配图/封面生成 | 增值功能，非核心 | v2 |
| 多人协作写故事 | 交互复杂度高 | v3 |
| 故事分支回溯 | 不可逆原则 | 不做 |
| 语音朗读 | 增值功能 | v3 |
| 社区/评论 | 小规模无需求 | 不做 |
| 付费/会员 | 免费给亲友用 | 不做 |

### 🔄 v1.1 迭代计划

- 故事模板（快速开始：选一个预设世界观+大纲模板直接开玩）
- 章节重新生成（对当前章节不满意可重新生成，但不影响前序章节）
- 角色头像生成（AI生成角色肖像图）
- 设定编辑（故事进行中可微调配角设定）
- 故事列表空态引导（无故事时显示创建引导，新用户知道下一步做什么）
- 全局错误/失败态（API超时、网络异常等高频场景统一反馈组件）
- 模型选择器"上次使用"标记（用户通常固定1-2个模型，减少选择成本）
- 大纲章节拖拽把手视觉强化（当前拖拽图标不够明显，排序是核心操作）
- 参考风格配置（用户可指定偏好的叙事风格，如"古风清雅"/"悬疑紧凑"/"轻松幽默"，影响Prompt中的文风指令，提升多章节文风一致性）
- 自动异地备份（支持配置COS/S3等对象存储，定期自动上传备份文件）

---

## 8. 页面交互规格

### 欢迎页

**布局**：全屏大屏展示，深色渐变背景或品牌氛围图，内容垂直水平居中

**时段问候规则**：
- 06:00 - 12:00 → 早上好
- 12:00 - 14:00 → 中午好
- 14:00 - 18:00 → 下午好
- 18:00 - 06:00 → 晚上好

**内容**：
- 第一行：大号字体「{时段问候}，{昵称}」
- 第二行：副标题，如"今天想写个什么故事？"
- 快捷入口区域：
  - 有进行中的故事：显示最近1个故事卡片（标题+进度）+"继续"按钮
  - "创建新故事"按钮
- 底部：小字"我的故事"链接跳转故事列表

**路由**：登录成功后默认跳转此页；访问`/welcome`

### 登录/注册页

**布局**：居中卡片，背景为品牌色渐变或暗色氛围图

**交互**：
- 卡片顶部Tab切换：「登录」|「注册」，点击切换表单，无页面跳转
- 登录Tab：邮箱Input + 密码Input + 登录Button；密码Input下方"忘记密码？"链接；底部"没有账号？注册"点击切换到注册Tab
- 注册Tab：邮箱Input + 密码Input + 注册Button；底部"已有账号？登录"点击切换到登录Tab
- 注册成功后自动登录，跳转欢迎页
- 表单校验：邮箱格式、密码最小长度（6位）；实时校验+提交时校验
- 昵称自动取邮箱@前缀，无需注册时填写

**忘记密码流程**：
1. 点击"忘记密码？" → 卡片内容切换为重置表单（邮箱Input + "发送重置链接"Button）
2. 输入邮箱 → 后端校验邮箱存在 → 生成Token存入password_resets表 → 发送含Token的重置链接邮件
3. 前端提示"重置链接已发送至您的邮箱，请查收"
4. 用户点击邮件中的链接 → 打开ResetPassword页面（新密码Input + 确认密码Input + "重置密码"Button）
5. 提交后后端校验Token有效性（未过期+未使用）→ 更新密码 → 标记Token已使用 → 跳转登录页
6. Token有效期30分钟，一次性使用

### 首页（故事列表）

**状态设计**：
- 有故事：卡片列表，每个卡片显示标题+进度（当前章/总章）+状态标签+删除按钮
- 空态（v1.1）：居中引导文案 + "创建你的第一个故事"按钮

### 创建故事（4步向导）

**整体布局**：顶部步骤条（①基础信息 → ②大纲编辑 → ③世界设定 → ④角色设定），当前步骤高亮，已完成步骤可点击回看

**步骤1 基础信息**：
- 故事标题：Input，必填，最大50字
- 主题/类型：Select下拉，选项：玄幻/都市/科幻/历史/悬疑/其他
- 故事前提：Textarea，必填，最大200字，占位提示"一句话概括你的故事"
- 底部：[下一步 →]

**步骤2 大纲编辑**：
- 结构描述：Textarea，占位提示"起承转合的整体结构"
- 章节规划：动态列表，每项包含 ⠿拖拽把手 + 章节标题Input + 简要走向Textarea + ✕删除按钮；拖拽把手hover时高亮+cursor:grab
- "添加章节"按钮追加新条目
- 结局方向：Textarea，占位提示"你希望故事走向什么结局"
- 底部：[← 上一步] [下一步 →]

**步骤3 世界设定**：
- 详细度：Radio，中等（AI补全细节）/ 深度（全手填）
- 世界观简介：Textarea
- 体系名称 + 体系描述：Input + Textarea
- 阵营关系：动态表单，[+ 添加阵营]，每项：名称Input + 描述Textarea + ✕删除
- 地理概况：动态表单，[+ 添加地点]，每项：名称Input + 描述Textarea + ✕删除
- 中等详细度时：显示"AI补全设定"按钮，点击后AI填充空白字段，填充后所有字段变为可编辑（带"AI生成"标签）
- 底部：[← 上一步] [下一步 →]

**步骤4 角色设定**：
- 主角区（必填，带"主角"标签）：姓名Input、性格Textarea、背景Textarea、能力Textarea
- 配角区（可选）：[+ 添加配角]按钮，每项：姓名Input + 与主角关系Input + 立场Select(盟友/敌人/中立/亦敌亦友) + 性格Textarea + ✕删除
- 底部：[← 上一步] [创建故事]

### 故事演绎（核心页面，3种状态）

**状态1：待生成**（进入故事或决策完成后的初始态）
- 阅读区：显示上一章内容（如有）或欢迎语
- 顶部：故事标题 + 章节进度 + 模型选择下拉
- 底部：[生成章节] 按钮（主色调）

**状态2：生成中**（点击"生成章节"后，等待5-15秒）
- 阅读区：文字逐字流式出现（打字机效果），SSE每推送chunk即追加渲染，配合markdown-it实时解析
- 顶部：细进度条（渐变色，横跨页面顶部）+ 章节编号旁loading旋转图标
- 按钮：[生成章节] → 变为 [取消生成]（灰色），点击可中断当前生成
- 决策区：完全隐藏，不显示局势描述和输入框
- 用户不可在此时提交决策

**状态3：生成完成**（SSE推送done信号后）
- 阅读区：完整章节内容，可滚动回看
- 顶部：进度条消失，loading图标消失
- 决策区出现：局势描述卡片 + "你的行动："Textarea + [提交决策]按钮 + "获取建议"按钮（非强制，点击后AI生成3个行动方向，标注"消耗额外Token"，用户可直接选用或自行输入）
- 按钮：[生成下一章]（下一章生成入口）
- 章节末尾：自动添加"本内容由AI辅助生成"声明（浅色小字，与正文视觉区分）

**断线恢复状态**（SSE连接中断后）
- 阅读区：显示已接收的草稿内容（灰色底标记为"未完成"）
- 提示条："网络连接中断，已保存已生成内容"
- 两个按钮：[继续生成]（AI续写衔接草稿）/ [重新生成]（丢弃草稿从头来）

**异常状态**：
- 生成失败：阅读区显示失败提示卡片（含错误原因 + [重试]按钮 + 模型切换下拉），决策区隐藏
- 网络异常：顶部Toast提示"网络连接异常，请检查网络"

### API配置页

**布局**：配置列表 + 添加/编辑弹窗
- 列表：每项显示 配置名称 + 厂商标签 + 模型ID + Key脱敏(尾4位) + 启用/禁用开关 + 编辑/删除按钮
- 添加弹窗：厂商下拉(预设5+自定义) → 接口地址自动填充/手动填写 → API Key → 模型ID → [测试连接] + [保存]
- 测试连接：发送一条简短测试请求，成功显示✓，失败显示✕+错误原因

### 管理后台（超管专用）

**访问控制**：仅`role=super_admin`可访问`/admin/*`，非超管跳转403页面

**整体布局**：左侧固定侧边栏导航（系统概览 / 账号管理 / 操作日志 / 数据备份），右侧内容区，顶部显示超管标识

**系统概览页**：
- 统计卡片：用户总数、故事总数、今日活跃用户、数据库存储占用
- 最近操作日志Top5（表格：时间/用户/操作/详情）
- 快捷操作：一键备份按钮

**账号管理页**：
- 顶部：邮箱搜索Input + 状态筛选（全部/正常/禁用）Select
- 表格列：ID、邮箱、昵称、角色、状态（标签色区分）、注册时间、操作
- 操作按钮：启用/禁用（状态切换，需确认）、重置密码（弹窗输入新密码）、删除（红色，需二次确认弹窗，提示"将删除该用户及所有关联故事、章节、配置数据"）
- 禁用用户：状态变更为disabled，该用户现有Token立即失效（后端维护Token黑名单或检查用户status），无法再次登录

**操作日志页**：
- 筛选栏：时间范围DatePicker + 用户邮箱Input + 操作类型Select（登录/注册/密码重置/故事创建/故事删除/AI生成/管理操作）
- 表格列：时间、用户邮箱、操作类型（Tag标签）、操作对象、详情、IP
- 分页，每页20条
- 90天以上日志自动清理（定时任务）

**数据备份页**：
- 顶部："立即备份"按钮（点击后异步执行mysqldump，按钮显示loading，完成后Toast提示成功）
- 备份文件服务器端加密存储（AES-256加密，解密密钥从环境变量读取，下载时动态解密）
- 备份列表表格：文件名、大小、创建时间、操作（下载/删除）
- 删除需二次确认
- 注：自动异地备份（COS/S3）纳入v1.1迭代

---

## 9. 非功能需求

| 类别 | 需求 |
|------|------|
| 性能 | 单章生成等待时间需显示进度，流式输出边生成边显示 |
| 安全-SQL注入 | 所有SQL使用mysql2参数化占位符（`?`），禁止任何形式的字符串拼接SQL；代码review作为上线前必检项 |
| 安全-XSS | 后端全局validate中间件对用户输入做html-entities转义；前端Vue3默认转义+避免`v-html`渲染用户输入；章节内容用markdown-it+DOMPurify渲染（DOMPurify在渲染前净化HTML，拦截script/iframe等危险标签），配合highlight.js做代码块高亮；markdown-it配置禁用HTML标签内联 |
| 安全-CSRF | 前后端同域部署时靠SameSite Cookie+JWT in Header天然防护；API全部要求JWT Bearer Token，不接受Cookie自动携带 |
| 安全-认证 | 密码bcrypt加密存储（saltRounds=12）；JWT+超管独立role鉴权；禁用用户后Token立即失效（中间件每次校验用户status）；密码重置Token加密随机生成、30分钟过期、一次性使用 |
| 安全-限流 | express-rate-limit：登录/注册/忘记密码 5次/分钟/IP；AI生成 10次/分钟/用户；全局API 100次/分钟/IP |
| 安全-数据 | 系统API Key服务端存储不暴露给前端；用户自配API Key加密存库（AES-256-GCM）、仅后端调用、前端只展示脱敏后的Key尾4位；备份文件仅超管可下载 |
| 安全-运维 | helmet安全头；CORS白名单配置；环境变量敏感信息不入库不入Git；超管操作全量日志审计；日志90天自动清理；备份文件AES-256加密存储，下载时动态解密 |
| 合规-标识 | 网页端每章末尾自动添加"本内容由AI辅助生成"声明（浅色小字，与正文视觉区分）；导出TXT文件末尾自动追加"本小说由戏境平台AI辅助生成，章节内容经用户决策引导"声明 |
| 合规-额度 | 记录每次AI生成的Token消耗数（chapters.tokens_used），提供故事维度Token累计查询接口（GET /api/story/:id/token-usage），前端在故事详情页展示"本故事已消耗Token数"+每章消耗柱状图 |
| 兼容 | 响应式布局，手机浏览器可用（写大纲用PC，玩故事手机也行） |
| 内容 | 系统内置模型自带审核；用户自配模型的审核由该模型自身处理；用户输入需基本校验（非空/长度限制）；AI输出质量校验（乱码/自我认知泄露/上下文无关检测） |
| 部署 | Node.js后端 + MySQL + Nginx反代，云服务器部署，PM2进程管理；前端打包静态资源由Nginx托管 |

---

## 10. 风险与应对

| 风险 | 概率 | 影响 | 应对 |
|------|------|------|------|
| 系统内置模型QPS限制 | 高 | 生成排队等待 | 双模型互为兜底+用户自配API分流；前端提示等待 |
| AI跑偏不按大纲走 | 高 | 故事失控 | Prompt强约束+每章注入大纲摘要+结局方向；"过程自由，结局收束"原则 |
| Token超限（5000字+上下文） | 中 | 生成截断 | 故事摘要压缩策略，控制上下文总长度 |
| 用户自配API不稳定 | 中 | 生成失败 | 测试连接前置校验；失败后提示切换模型；不影响系统内置模型使用 |
| 用户自配API Key泄露 | 低 | 安全风险 | Key加密存储、仅后端调用、前端脱敏展示；删除配置即清除Key |
| 邮件发送失败 | 中 | 用户无法重置密码 | SMTP配置校验启动检测；重置邮件发送失败前端提示"邮件服务异常，请联系管理员"；管理员可手动重置密码 |
| AI生成质量不稳定 | 中 | 体验差 | v1.1支持重新生成当前章节 |
| SQL注入攻击 | 低 | 数据泄露/破坏 | 参数化查询从根源杜绝；代码review必检；上线前SQL注入扫描 |
| XSS攻击 | 低 | 用户Cookie劫持/页面篡改 | 后端输入过滤+前端默认转义；markdown-it+DOMPurify双重防护（渲染前净化HTML）；highlight.js安全渲染代码块；CSP头限制脚本来源 |
| 暴力破解密码 | 中 | 账号被盗 | 登录限流5次/分钟/IP；bcrypt慢哈希增加破解成本；超管可禁用账号 |
| 超管账号泄露 | 低 | 系统被接管 | 超管密码强密码要求（12位+）；操作全量审计；异常登录日志告警 |

---

## 版本记录

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1.0 | 2026-06-11 | 初版：8章节完整PRD |
| v1.1 | 2026-06-11 | 项目名定为「戏境」；后端改Node.js+MySQL；新增用户自配API功能（5大厂商预设+自定义）；统一HTTP API调用无SDK；所有模型Bearer Token认证；细化技术架构（TS+Vue3+Element Plus+Vite / Express+JWT+mysql2）；前后端目录结构+接口清单+环境变量 |
| v1.1.1 | 2026-06-11 | 纳入UI/UX设计评审反馈：补充注册表单（Tab切换）、创建故事4步向导完整表单字段、故事演绎生成中3种状态（打字机流式+进度条+取消按钮+决策区隐藏）、新增页面交互规格章节、4个Minor纳入v1.1迭代 |
| v1.2 | 2026-06-11 | 去除设计稿代号（p00x）；新增欢迎页（大屏时段问候+快捷入口）；简化注册（邮箱+密码，昵称自动生成）；新增忘记密码功能（邮件重置链接+30分钟Token）；新增password_resets表、SMTP配置、重置密码API；页面交互规格统一使用页面名称 |
| v1.3 | 2026-06-11 | 新增超级管理后台模块（F501-F505）：超管账号环境变量初始化、系统概览、账号管理（启用/禁用/重置密码/删除）、操作日志（90天保留）、数据备份（mysqldump）；新增operation_logs表；users表新增role+status字段；安全体系：SQL注入防护（参数化查询）、XSS防护（输入过滤+输出转义）、CSRF防护（JWT Header）、接口限流（express-rate-limit）、认证安全（禁用用户Token立即失效）、helmet+CORS白名单+环境变量隔离；新增10个超管API接口；管理后台页面交互规格 |
| v1.4 | 2026-06-11 | AI内容质量：生成失败判定标准（乱码/自我认知泄露/上下文无关检测）、文风一致性Prompt指令+禁止自我认知泄露指令、决策建议Prompt；SSE断线处理（草稿暂存+继续生成/重新生成）、chapters表新增draft_content/generation_status/tokens_used字段；用户体验：AI决策建议按钮（F302）、阅读长度偏好（标准5k/短篇2k，users表新增chapter_length_pref）；合规：AI生成标识（网页章节末尾+导出TXT末尾）、Token消耗统计（故事维度累计+每章柱状图）；备份加密（AES-256）；错误码字典附录；关键行为数据追踪设计（基于operation_logs）；v1.1迭代新增参考风格配置+自动异地备份 |
| v1.5 | 2026-06-11 | 数据库健壮性：chapters.draft_content显式DEFAULT NULL（防新建章节INSERT报错）、确认users.chapter_length_pref默认'standard'；前端Markdown渲染增强：新增highlight.js代码高亮+DOMPurify XSS防护，在composables/useStory中统一预配置markdown-it实例；超管初始化逻辑：环境变量章节补充启动检查流程（查users表是否存在super_admin→不存在则创建→已存在跳过）+明确部署顺序（先SQL建表→再启动Node）；XSS防护策略更新：markdown-it+DOMPurify双重净化+highlight.js安全渲染 |

---

## 附录A：错误码字典

| code | 含义 | 触发场景 |
|------|------|----------|
| 0 | 成功 | 请求正常处理 |
| 40001 | 邮箱已注册 | 注册时邮箱已存在 |
| 40002 | 邮箱或密码错误 | 登录失败 |
| 40003 | Token无效/过期 | JWT校验失败，需重新登录 |
| 40004 | 权限不足 | 非超管访问/admin接口 |
| 40005 | 邮箱不存在 | 忘记密码时输入未注册邮箱 |
| 40006 | 重置Token无效/过期 | 密码重置链接过期或已使用 |
| 40007 | 账号已禁用 | 禁用用户尝试登录 |
| 40008 | 参数校验失败 | 请求参数不合法（类型/长度/格式） |
| 40009 | 故事数量超限 | 用户已有3个进行中的故事 |
| 40010 | 故事不存在 | 访问不存在的story_id |
| 40011 | 章节生成失败 | AI质量校验不通过（乱码/泄露/无关） |
| 40012 | API配置异常 | 用户自配Key无效或余额不足 |
| 40013 | API测试失败 | 配置测试连接不通过 |
| 40401 | 资源不存在 | 请求的路径或对象不存在 |
| 42901 | 请求过于频繁 | 触发限流（登录/AI生成/全局） |
| 50001 | 服务器内部错误 | 未捕获异常 |
| 50002 | 邮件发送失败 | SMTP服务异常 |
| 50003 | AI接口调用超时 | 外部API响应>60s |
| 50004 | 备份执行失败 | mysqldump执行异常 |

---

## 附录B：关键行为数据追踪

> 基于operation_logs表实现，不另建埋点系统。超管后台日志页可按action类型筛选查看。

| action | 触发时机 | detail字段示例 |
|--------|----------|----------------|
| register | 用户注册成功 | `{"email":"xxx@xx.com"}` |
| login | 用户登录成功 | `{"email":"xxx@xx.com"}` |
| reset_password | 密码重置成功 | `{"email":"xxx@xx.com"}` |
| create_story | 创建故事 | `{"story_id":1,"title":"xxx"}` |
| delete_story | 删除故事 | `{"story_id":1,"title":"xxx"}` |
| generate_chapter | AI生成章节 | `{"story_id":1,"chapter":3,"model":"wenxin4.5","tokens":4200,"status":"completed"}` |
| generate_chapter_failed | AI生成失败 | `{"story_id":1,"chapter":3,"model":"deepseek-chat","reason":"quality_check_failed"}` |
| decision_suggest | AI决策建议 | `{"story_id":1,"chapter":3,"tokens":150}` |
| submit_decision | 提交决策 | `{"story_id":1,"chapter":3}` |
| export_txt | 导出TXT | `{"story_id":1,"chapters":10}` |
| admin_disable | 超管禁用用户 | `{"target_user_id":5,"target_email":"xxx"}` |
| admin_reset | 超管重置密码 | `{"target_user_id":5}` |
| admin_delete | 超管删除用户 | `{"target_user_id":5}` |
| backup | 触发数据备份 | `{"filename":"xijing_backup_20260611.sql.gz","size_mb":12}` |

---

> 本内容由 Coze AI 生成，请遵循相关法律法规及《人工智能生成合成内容标识办法》使用与传播。
