interface TabSwitchProps {
  activeKey: 'login' | 'register'
  onChange: (key: 'login' | 'register') => void
}

export default function TabSwitch({ activeKey, onChange }: TabSwitchProps) {
  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--color-neutral-2)',
        borderRadius: 'var(--radius-md)',
        padding: '2px',
      }}
    >
      <button
        type="button"
        onClick={() => onChange('login')}
        style={{
          flex: 1,
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--font-size-body-sm)',
          fontWeight: 'var(--font-weight-medium)',
          borderRadius: 'var(--radius-sm)',
          border: 'none',
          background: activeKey === 'login' ? 'var(--color-primary)' : 'transparent',
          color: activeKey === 'login' ? '#FFFFFF' : 'var(--color-neutral-6)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
      >
        登录
      </button>
      <button
        type="button"
        onClick={() => onChange('register')}
        style={{
          flex: 1,
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--font-size-body-sm)',
          fontWeight: 'var(--font-weight-medium)',
          borderRadius: 'var(--radius-sm)',
          border: 'none',
          background: activeKey === 'register' ? 'var(--color-primary)' : 'transparent',
          color: activeKey === 'register' ? '#FFFFFF' : 'var(--color-neutral-6)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
      >
        注册
      </button>
    </div>
  )
}