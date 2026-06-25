import { type ReactNode } from 'react'

interface TabItemProps {
  label: string
  icon?: ReactNode
  active?: boolean
  onClick?: () => void
}

export default function TabItem({ label, icon, active = false, onClick }: TabItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        height: '40px',
        padding: '0 4px',
        fontSize: 'var(--font-size-body-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: active ? 'var(--color-primary)' : 'var(--color-neutral-6)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'color var(--transition-fast)',
        whiteSpace: 'nowrap',
      }}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {label}
      {/* 底部下划线 */}
      {active && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--color-primary)',
            borderRadius: '1px',
          }}
        />
      )}
    </button>
  )
}