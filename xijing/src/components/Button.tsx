import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger' | 'gold' | 'gradient' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
  children?: ReactNode
}

const variantStyles: Record<ButtonVariant, { bg: string; hover: string; color: string; border?: string }> = {
  primary:   { bg: 'var(--color-primary)', hover: 'var(--color-primary-light)', color: '#FFFFFF' },
  secondary: { bg: 'transparent',                  hover: 'var(--color-neutral-1)',    color: 'var(--color-neutral-7)', border: 'var(--color-neutral-3)' },
  text:      { bg: 'transparent',                  hover: 'var(--color-neutral-2)',    color: 'var(--color-neutral-7)' },
  danger:    { bg: 'var(--color-error)',           hover: '#DC2626',                   color: '#FFFFFF' },
  gold:      { bg: 'var(--color-secondary)',       hover: 'var(--color-secondary-light)', color: '#FFFFFF' },
  gradient:  { bg: 'linear-gradient(135deg, #7C5CFC, #9B82FC)', hover: '',             color: '#FFFFFF' },
  success:   { bg: 'var(--color-success)',           hover: '#4ADE80',                   color: '#FFFFFF' },
}

const sizeStyles: Record<ButtonSize, { height: string; padding: string; fontSize: string; radius: string }> = {
  sm: { height: '28px', padding: '8px 12px', fontSize: '12px', radius: 'var(--radius-sm)' },
  md: { height: '36px', padding: '12px 16px', fontSize: 'var(--font-size-body-sm)', radius: 'var(--radius-md)' },
  lg: { height: '44px', padding: '16px 24px', fontSize: 'var(--font-size-body)', radius: 'var(--radius-md)' },
}

function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  children,
  style,
  ...rest
}: ButtonProps) {
  const v = variantStyles[variant]
  const s = sizeStyles[size]

  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        borderRadius: s.radius,
        fontWeight: 'var(--font-weight-medium)',
        color: v.color,
        background: v.bg,
        border: v.border ? `1px solid ${v.border}` : 'none',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : undefined,
        transition: 'all var(--transition-fast)',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading && variant !== 'gradient') {
          e.currentTarget.style.background = v.hover
        }
        if (!disabled && variant === 'secondary') {
          e.currentTarget.style.borderColor = 'var(--color-neutral-4)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = v.bg
        }
        if (variant === 'secondary') {
          e.currentTarget.style.borderColor = v.border || 'transparent'
        }
      }}
      {...rest}
    >
      {loading ? (
        <span style={{ display: 'inline-block', width: s.fontSize, height: s.fontSize, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      ) : icon ? (
        <span style={{ display: 'inline-flex' }}>{icon}</span>
      ) : null}
      {children && <span>{children}</span>}
    </button>
  )
}

export default Button