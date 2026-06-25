import { type ReactNode } from 'react'

interface SidebarProps {
  collapsed?: boolean
  logo?: ReactNode
  children: ReactNode
}

export default function Sidebar({ collapsed = false, logo, children }: SidebarProps) {
  return (
    <div
      style={{
        width: collapsed ? '64px' : '220px',
        height: '100vh',
        background: 'var(--color-surface-sidebar)',
        borderRight: collapsed ? 'none' : '1px solid var(--color-neutral-3)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--transition-normal)',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo 区 */}
      {logo && (
        <div
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0' : '0 16px',
            flexShrink: 0,
          }}
        >
          {logo}
        </div>
      )}

      {/* 导航项 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: collapsed ? '16px 0' : '16px',
          alignItems: collapsed ? 'center' : 'stretch',
        }}
      >
        {children}
      </div>
    </div>
  )
}