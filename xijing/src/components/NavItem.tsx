import { type ReactNode } from 'react'

interface NavItemProps {
  icon?: ReactNode
  label: string
  active?: boolean
  collapsed?: boolean
  onClick?: () => void
}

export default function NavItem({ icon, label, active = false, collapsed = false, onClick }: NavItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '44px',
        padding: collapsed ? '12px' : '12px 16px',
        gap: '12px',
        fontSize: 'var(--font-size-body-sm)',
        fontWeight: 'var(--font-weight-medium)',
        borderRadius: 'var(--radius-md)',
        background: active ? 'var(--color-surface-sidebar-active-bg)' : 'transparent',
        color: active ? 'var(--color-primary)' : 'var(--color-neutral-7)',
        cursor: 'pointer',
        borderLeft: active && !collapsed ? '3px solid var(--color-primary)' : '3px solid transparent',
        transition: 'background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast)',
        userSelect: 'none',
      }}
    >
      {icon && (
        <span style={{
          display: 'inline-flex',
          color: active ? 'var(--color-primary)' : 'var(--color-neutral-5)',
          transition: 'color var(--transition-fast)',
        }}>
          {icon}
        </span>
      )}
      {!collapsed && <span>{label}</span>}
    </div>
  )
}