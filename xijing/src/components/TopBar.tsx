import { type ReactNode } from 'react'

interface TopBarProps {
  title?: string
  breadcrumb?: string
  left?: ReactNode
  right?: ReactNode
}

export default function TopBar({ title, breadcrumb, left, right }: TopBarProps) {
  return (
    <div
      style={{
        height: '56px',
        minHeight: '56px',
        background: 'var(--color-surface-topbar)',
        borderBottom: '1px solid var(--color-neutral-3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* 左侧区域 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        {left}
        {breadcrumb && (
          <span style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-neutral-6)', whiteSpace: 'nowrap' }}>
            {breadcrumb}
          </span>
        )}
        {title && (
          <span style={{ fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-8)' }}>
            {title}
          </span>
        )}
      </div>

      {/* 右侧操作区 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {right}
      </div>
    </div>
  )
}