import Button from './components/Button'
import Input from './components/Input'
import Textarea from './components/Textarea'
import Tag from './components/Tag' 
import Switch from './components/Switch'
import { useState } from 'react'
import Select from './components/Select'
import Card from './components/Card'
import NavItem from './components/NavItem'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import { BookOpen, Settings, User, Sparkles,FileText  } from 'lucide-react'

import TabBar from './components/TabBar'
import TabSwitch from './components/TabSwitch'


function App() {
  const [switchOn, setSwitchOn] = useState(false)
  const [masterOn, setMasterOn] = useState(false)
  const [slaveOn, setSlaveOn] = useState(false) 
  const [showExtra, setShowExtra] = useState(false)
  const [configs, setConfigs] = useState({
  deepseek: false,
  qianwen: true,
  zhipu: false,
})
const [model, setModel] = useState('')
const [provider, setProvider] = useState('')
const [apiKey, setApiKey] = useState('')
const [apiEnabled, setApiEnabled] = useState(false)
const [activeTab, setActiveTab] = useState('reading')
const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* === 实验 1：Button 变体 === */}
      <section>
        <h2>1. Button 变体</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">主要</Button>
          <Button variant="secondary">次要</Button>
          <Button variant="gold">金色</Button>
          <Button variant="text">文字</Button>
          <Button variant="danger">危险</Button>
          <Button variant="gradient">渐变</Button>
          <Button variant="success">成功</Button>
        </div>
      </section>

      {/* === 实验 2：Button 尺寸 === */}
      <section>
        <h2>2. Button 尺寸</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button size="sm">小</Button>
          <Button size="md">中</Button>
          <Button size="lg">大</Button>
        </div>
      </section>

      {/* === 实验 3：Button 特殊状态 === */}
      <section>
        <h2>3. Button 特殊状态</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button disabled>禁用</Button>
          <Button loading>加载中</Button>
          <Button fullWidth>通栏按钮</Button>
        </div>
      </section>

      {/* === 实验 4：Button 组合 === */}
      <section>
        <h2>4. Button 组合</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="danger" size="sm">小删除</Button>
          <Button variant="gold" size="lg" loading>大加载</Button>
          <Button variant="secondary" disabled>禁用次要</Button>
        </div>
      </section>

      {/* === 实验 5：Input 变体 === */}
      <section>
        <h2>5. Input 变体</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
          <Input label="用户名" placeholder="请输入用户名" />
          <Input label="密码" type="password" error="密码错误" />
          <Input label="邮箱" type="email" placeholder="请输入邮箱" />
          <Input label="禁用状态" disabled value="禁用状态" />
        </div>
      </section>

      {/* === 实验 6：登录表单模拟 === */}
      <section>
        <h2>6. 登录表单模拟</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          <Input label="邮箱" placeholder="请输入邮箱" />
          <Input label="密码" type="password" placeholder="请输入密码" />
          <Button variant="primary" fullWidth>登录</Button>
          <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--color-neutral-5)' }}>
            还没有账号？<span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>立即注册</span>
          </div>
        </div>
      </section>

      {/* === 实验 7：密码显示/隐藏 === */}
      <section>
        <h2>7. 密码显示/隐藏</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', maxWidth: 400 }}>
          <div style={{ flex: 1 }}>
            <Input label="密码" type="password" id="pwd" placeholder="输入密码" />
          </div>
          <Button variant="text" style={{ marginTop: 26 }}
            onClick={() => {
              const input = document.getElementById('pwd') as HTMLInputElement
              if (input) input.type = input.type === 'password' ? 'text' : 'password'
            }}
          >显示</Button>
        </div>
      </section>

      {/* === 实验 8：Textarea 测试 === */}
      <section>
        <h2>8. Textarea 测试</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
          <Textarea label="故事前提" placeholder="用一句话概括你的故事..." rows={3} />
          <Textarea label="世界设定" placeholder="描述你的世界观..." rows={5} />
          <Textarea placeholder="纯文本区域（无标签）" />
          <Input label="测试错误" error="这是错误提示" />
          <Textarea label="没有error" placeholder="对比上面的Input" />
        </div>
      </section>
    

{/* === 实验 9：Tag 测试 === */}
      <section>
      <h2>9. Tag 标签测试</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Tag variant="progress">进行中</Tag>
    <Tag variant="done">已完成</Tag>
    <Tag variant="abandoned">已弃坑</Tag>
    <Tag>默认值（progress）</Tag>
    <Tag variant="info">消息</Tag>
    <Tag variant="warning">警告</Tag>
    <Tag variant="success">成功</Tag>
  </div>

  <div style={{ display: 'flex', gap: 16, marginTop: 16, alignItems: 'center' }}>
    <span style={{ fontSize: 14, color: '#6B7280' }}>状态：</span>
    <Tag variant="progress">3/12 章</Tag>
    <Tag variant="done">已完成</Tag>
  </div>

  {/* 结合 Button 的模拟场景 */}
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
    <Tag variant="done">武侠</Tag>
    <Tag variant="progress">连载中</Tag>
    <span style={{ fontSize: 14, color: '#374151' }}>天涯明月刀</span>
  </div>
  {/* 不同尺寸的标签 */}
<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
  <Tag size="sm" variant="progress">小进度</Tag>
  <Tag size="md" variant="progress">中进度</Tag>
  <Tag size="lg" variant="progress">大进度</Tag>
</div>

<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
  <Tag size="sm" variant="info">小</Tag>
  <Tag size="md" variant="info">中</Tag>
  <Tag size="lg" variant="info">大</Tag>
</div>
<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
  <Tag variant="progress" bordered>带边框</Tag>
  <Tag variant="done" bordered>金色边框</Tag>
  <Tag variant="info" bordered size="lg">大号带边框</Tag>
  <Tag variant="warning" bordered size="sm">小号警告边框</Tag>
</div>

{/* 对比：同样的标签不带边框 */}
<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
  <Tag variant="progress">无边框</Tag>
  <Tag variant="done">无边框</Tag>
  <Tag variant="info" size="lg">大号无边框</Tag>
</div>
</section>
{/* === 实验 10：Switch 测试 === */}
<section>
  <h2>10. Switch 开关测试</h2>
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Switch checked={switchOn} onChange={setSwitchOn} />
      <span style={{ fontSize: 14, color: '#6B7280' }}>
        {switchOn ? '已开启' : '已关闭'}
      </span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Switch checked={true} onChange={() => {}} />
      <span style={{ fontSize: 14, color: '#6B7280' }}>固定开启</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Switch checked={false} onChange={() => {}} disabled />
      <span style={{ fontSize: 14, color: '#6B7280' }}>禁用</span>
    </div>
  </div>
  <p style={{ fontSize: 14, color: '#374151', marginTop: 12 }}>
    开关状态：{switchOn ? '🟢 开启' : '⚫ 关闭'}
  </p>
</section>
{/* === 实验 11：Switch 联动 === */}
<section>
  <h2>11. 主从联动</h2>
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Switch checked={masterOn} onChange={setMasterOn} />
      <span style={{ fontSize: 14, color: '#6B7280' }}>
        主开关（{masterOn ? '开' : '关'}）
      </span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Switch
        checked={slaveOn}
        onChange={setSlaveOn}
        disabled={!masterOn}
      />
      <span style={{ fontSize: 14, color: '#6B7280' }}>
        从开关（{slaveOn ? '开' : '关'}）
      </span>
    </div>
  </div>
  <p style={{ fontSize: 14, color: '#374151', marginTop: 12 }}>
    主开关关闭时，从开关无法操作。
  </p>
</section>
{/* === 实验 12：Switch 控制显隐 === */}
<section>
  <h2>12. Switch 控制内容显隐</h2>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Switch checked={showExtra} onChange={setShowExtra} />
    <span style={{ fontSize: 14, color: '#6B7280' }}>
      显示额外配置
    </span>
  </div>
  {showExtra && (
    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, padding: 16, border: '1px dashed #D1D5DB', borderRadius: 8 }}>
      <Input label="额外字段 1" placeholder="开关打开后可见" />
      <Input label="额外字段 2" placeholder="开关打开后可见" />
    </div>
  )}
</section>
{/* === 实验 13：多开关批量配置 === */}
<section>
  <h2>13. 模拟 API 配置开关</h2>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 14, color: '#374151' }}>DeepSeek</span>
      <Switch
        checked={configs.deepseek}
        onChange={(v) => setConfigs({ ...configs, deepseek: v })}
      />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 14, color: '#374151' }}>通义千问</span>
      <Switch
        checked={configs.qianwen}
        onChange={(v) => setConfigs({ ...configs, qianwen: v })}
      />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 14, color: '#374151' }}>智谱</span>
      <Switch
        checked={configs.zhipu}
        onChange={(v) => setConfigs({ ...configs, zhipu: v })}
      />
    </div>
  </div>
  <pre style={{ fontSize: 12, color: '#6B7280', marginTop: 12, background: '#F3F4F6', padding: 8, borderRadius: 4 }}>
    {JSON.stringify(configs, null, 2)}
  </pre>
</section>
{/* === 实验 14：Select 测试 === */}
<section>
  <h2>14. Select 下拉测试</h2>
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
    <div>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>选择模型</p>
      <Select
        options={[
          { value: 'deepseek-chat', label: 'DeepSeek Chat' },
          { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner' },
          { value: 'wenxin', label: '文心一言' },
          { value: 'qianwen', label: '通义千问' },
          { value: 'zhipu', label: '智谱' },
        ]}
        value={model}
        onChange={setModel}
        placeholder="请选择模型"
      />
    </div>

    <div>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>禁用状态</p>
      <Select
        options={[
          { value: 'a', label: '选项 A' },
          { value: 'b', label: '选项 B' },
        ]}
        value="a"
        onChange={() => {}}
        disabled
      />
    </div>
  </div>
  <p style={{ fontSize: 14, color: '#374151', marginTop: 12 }}>
    当前选中：{model || '未选择'}
  </p>
</section>
{/* === 实验 15：API 配置模拟 === */}
<section>
  <h2>15. API 配置模拟</h2>
  <div style={{ 
    background: '#FFFFFF', 
    border: '1px solid #E5E7EB', 
    borderRadius: 12, 
    padding: 24, 
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>
    {/* 第一行：标题 + 开关 */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 18, fontWeight: 600, color: '#1F2937' }}>DeepSeek</span>
      <Switch checked={apiEnabled} onChange={setApiEnabled} />
    </div>

    {/* 第二行：模型选择 */}
    <div>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>模型</p>
      <Select
        options={[
          { value: 'deepseek-chat', label: 'DeepSeek Chat' },
          { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner' },
        ]}
        value={provider}
        onChange={setProvider}
        placeholder="选择模型"
        disabled={!apiEnabled}
      />
    </div>

    {/* 第三行：API Key 输入 */}
    <Input
      label="API Key"
      type="password"
      placeholder={apiEnabled ? '请输入 API Key' : '请先开启'}
      disabled={!apiEnabled}
      value={apiKey}
      onChange={(e) => setApiKey(e.target.value)}
    />

    {/* 底部按钮 */}
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="secondary" size="sm">测试连接</Button>
      <Button variant="primary" size="sm" disabled={!apiEnabled || !apiKey}>保存</Button>
    </div>
  </div>

  {/* 实时状态观察器 */}
  <pre style={{ fontSize: 12, color: '#6B7280', marginTop: 12, background: '#F3F4F6', padding: 8, borderRadius: 4, maxWidth: 500 }}>
    {JSON.stringify({ provider, apiKey, apiEnabled }, null, 2)}
  </pre>
</section>
{/* === 实验 16：Card 测试 === */}
<section>
  <h2>16. Card 卡片测试</h2>
  
  {/* default */}
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
    <Card>
      <h3 style={{ margin: 0, fontSize: 18, color: '#1F2937' }}>默认卡片</h3>
      <p style={{ margin: '8px 0 0', fontSize: 14, color: '#6B7280' }}>这是普通卡片的文字内容。</p>
    </Card>

    {/* story */}
    <Card variant="story" onClick={() => alert('点击故事卡片')}>
      <h3 style={{ margin: 0, fontSize: 18, color: '#1F2937' }}>故事卡片</h3>
      <p style={{ margin: '8px 0 0', fontSize: 14, color: '#6B7280' }}>这个故事有进度信息。</p>
    </Card>

    {/* dashed */}
    <Card variant="dashed">
      <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 14, padding: '20px 0' }}>
        + 添加新配置
      </div>
    </Card>

    {/* error */}
    <Card variant="error">
      <h3 style={{ margin: 0, fontSize: 16, color: '#EF4444' }}>出错了</h3>
      <p style={{ margin: '8px 0 0', fontSize: 14, color: '#991B1B' }}>API 请求失败，请检查网络连接。</p>
    </Card>
  </div>

  {/* 不同内边距 */}
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
    <Card padding="sm">
      <span style={{ fontSize: 14 }}>sm 内边距 (16px)</span>
    </Card>
    <Card padding="md">
      <span style={{ fontSize: 14 }}>md 内边距 (20px)</span>
    </Card>
    <Card padding="lg">
      <span style={{ fontSize: 14 }}>lg 内边距 (24px)</span>
    </Card>
  </div>
</section>
{/* === 实验 17：NavItem 测试 === */}
<section>
  <h2>17. NavItem 导航项测试</h2>

  {/* 展开状态 */}
  <div style={{ width: 220, background: '#FFFFFF', border: '1px solid #E5E7EB', padding: 16, borderRadius: 12 }}>
    <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 0, marginBottom: 12 }}>侧边栏（展开）</p>
    <NavItem icon={<BookOpen size={20} />} label="我的故事" active />
    <NavItem icon={<Settings size={20} />} label="API配置" />
    <NavItem icon={<User size={20} />} label="个人中心" />
  </div>

  {/* 折叠状态 */}
  <div style={{ width: 64, background: '#FFFFFF', border: '1px solid #E5E7EB', padding: '16px 0', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 16 }}>
    <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 12px' }}>折叠</p>
    <NavItem icon={<BookOpen size={20} />} label="我的故事" active collapsed />
    <NavItem icon={<Settings size={20} />} label="API配置" collapsed />
    <NavItem icon={<User size={20} />} label="个人中心" collapsed />
  </div>
</section>
{/* === 实验 18：Sidebar + TopBar 完整布局 === */}
<section>
  <h2>18. 页面布局预览</h2>
  <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden', height: 400, display: 'flex' }}>

    {/* 侧边栏 */}
    <Sidebar
      logo={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Sparkles size={24} color="#7C5CFC" />
          <span style={{ fontSize: 20, fontWeight: 700, color: '#7C5CFC' }}>戏镜</span>
        </div>
      }
    >
      <NavItem icon={<BookOpen size={20} />} label="我的故事" active />
      <NavItem icon={<Settings size={20} />} label="API配置" />
      <NavItem icon={<User size={20} />} label="个人中心" />
    </Sidebar>

    {/* 右侧内容区 */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
      <TopBar title="我的故事" right={<button style={{
        height: 36, padding: '0 16px', background: '#7C5CFC', color: '#FFF',
        border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 500,
      }}>新建故事</button>} />

      <div style={{ flex: 1, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignContent: 'flex-start' }}>
        <Card variant="story" onClick={() => {}}>
          <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#1F2937' }}>暗影编年</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Tag variant="progress">进行中</Tag>
            <span style={{ fontSize: 12, color: '#6B7280' }}>3/12 章</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>DeepSeek Chat · 2024-01-15</span>
            <button style={{
              height: 28, padding: '0 12px', background: '#7C5CFC', color: '#FFF',
              border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer',
            }}>继续</button>
          </div>
        </Card>

        <Card variant="story" onClick={() => {}}>
          <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#1F2937' }}>龙族纪元</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Tag variant="done">已完成</Tag>
            <span style={{ fontSize: 12, color: '#6B7280' }}>12/12 章</span>
          </div>
        </Card>
      </div>
    </div>
  </div>
</section>
{/* === 实验 19：TabBar + TabSwitch 测试 === */}
<section>
  <h2>19. 标签栏测试</h2>

  {/* TabBar */}
  <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: '24px 24px 0' }}>
    <TabBar
      items={[
        { key: 'reading', label: '阅读', icon: <BookOpen size={16} /> },
        { key: 'review', label: '回看', icon: <FileText size={16} /> },
      ]}
      activeKey={activeTab}
      onChange={setActiveTab}
    />
    <div style={{ padding: '24px 0', color: '#6B7280', fontSize: 14 }}>
      当前 tab：{activeTab === 'reading' ? '📖 阅读中...' : '📚 回看章节列表'}
    </div>
  </div>

  {/* TabSwitch */}
  <div style={{ width: 300, marginTop: 16 }}>
    <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>登录/注册切换</p>
    <TabSwitch activeKey={authMode} onChange={setAuthMode} />
    <div style={{ marginTop: 12, padding: 20, background: '#FFFFFF', borderRadius: 8, border: '1px solid #E5E7EB' }}>
      {authMode === 'login' ? (
        <div>
          <Input label="邮箱" placeholder="请输入邮箱" />
          <div style={{ height: 12 }} />
          <Input label="密码" type="password" placeholder="请输入密码" />
          <div style={{ height: 16 }} />
          <Button variant="primary" fullWidth>登录</Button>
        </div>
      ) : (
        <div>
          <Input label="邮箱" placeholder="请输入邮箱" />
          <div style={{ height: 12 }} />
          <Input label="密码" type="password" placeholder="请输入密码" />
          <div style={{ height: 12 }} />
          <Input label="确认密码" type="password" placeholder="请再次输入密码" />
          <div style={{ height: 16 }} />
          <Button variant="primary" fullWidth>注册</Button>
        </div>
      )}
    </div>
  </div>
</section>
    </div>
  )   
}

export default App