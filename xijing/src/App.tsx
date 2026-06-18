import Button from './components/Button'
import Input from './components/Input'
import Textarea from './components/Textarea'

function App() {
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
        </div>
      </section>

    </div>
  )
}

export default App