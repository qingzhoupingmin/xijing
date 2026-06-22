import { type ReactNode } from 'react'

type TagVariant = 'progress' | 'done' | 'abandoned' | 'info' | 'warning' | 'success'
type TagSize = 'sm' | 'md' | 'lg'

interface TagProps {
  variant?: TagVariant
  size?: TagSize
  bordered?: boolean
  children: ReactNode
}

const variantStyles: Record<TagVariant, { bg: string; color: string }> = {
  progress:  { bg: 'var(--color-primary-surface)',   color: 'var(--color-primary)' },
  done:      { bg: 'var(--color-secondary-surface)', color: 'var(--color-secondary-dark)' },
  abandoned: { bg: 'var(--color-neutral-1)',         color: 'var(--color-neutral-5)' },
  info:      { bg: 'var(--color-info-surface)',      color: 'var(--color-info)' },
  warning:   { bg: 'var(--color-warning-surface)',    color: 'var(--color-warning)' },
  success:   { bg: 'var(--color-success-surface)',    color: 'var(--color-success)' },
}

const sizeStyles: Record<TagSize, { padding: string; fontSize: string }> = {
  sm: { padding: '1px 6px', fontSize: '10px' },
  md: { padding: '2px 8px', fontSize: 'var(--font-size-caption)' },
  lg: { padding: '4px 12px', fontSize: '14px' },
}

const Tag = ({ variant = 'progress', size = 'md', bordered = false, children }: TagProps) => {
  const v = variantStyles[variant]
  const s = sizeStyles[size]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: s.padding,
        fontSize: s.fontSize,
        borderRadius: 'var(--radius-sm)',
        fontWeight: 'var(--font-weight-medium)',
        background: v.bg,
        border: bordered ? `1px solid ${v.color}` : 'none',  
        color: v.color,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

export default Tag