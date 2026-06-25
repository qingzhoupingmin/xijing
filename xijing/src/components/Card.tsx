import { type ReactNode } from 'react'

type CardVariant = 'default' | 'story' | 'form' | 'config' | 'dashed' | 'error'
type CardPadding = 'sm' | 'md' | 'lg'

interface CardProps {
  variant?: CardVariant
  padding?: CardPadding
  children: ReactNode
  onClick?: () => void
}

const paddingMap: Record<CardPadding, string> = {
  sm: '16px',
  md: '20px',
  lg: '24px',
}

export default function Card({ variant = 'default', padding = 'md', children, onClick }: CardProps) {
  const isError = variant === 'error'
  const isDashed = variant === 'dashed'
  const isStory = variant === 'story'

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        background: isError ? 'var(--color-error-surface)' : isDashed ? 'transparent' : 'var(--color-surface-card)',
        border: isError
          ? '1px solid var(--color-error)'
          : isDashed
            ? '2px dashed var(--color-neutral-3)'
            : '1px solid var(--color-neutral-2)',
        borderRadius: 'var(--radius-lg)',
        padding: paddingMap[padding],
        boxShadow: isDashed || isError ? 'none' : 'var(--shadow-sm)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow var(--transition-fast)',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (onClick && !isDashed && !isError) {
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        }
      }}
      onMouseLeave={(e) => {
        if (onClick && !isDashed && !isError) {
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        }
      }}
    >
      {/* story 变体的顶部渐变线 */}
      {isStory && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
          }}
        />
      )}
      {children}
    </div>
  )
}

