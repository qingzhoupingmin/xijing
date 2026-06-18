import { type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
}

export default function Input({ label, error, style, ...rest }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-neutral-7)', fontWeight: 'var(--font-weight-medium)' }}>
          {label}
        </label>
      )}
      <input
        style={{
          height: '36px',
          padding: '0 12px',
          fontSize: 'var(--font-size-body-sm)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-neutral-3)'}`,
          background: 'var(--color-surface-input)',
          color: 'var(--color-neutral-8)',
          outline: 'none',
          width: '100%',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          ...style,
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = 'var(--color-primary)'
            e.currentTarget.style.boxShadow = 'var(--shadow-primary-glow)'
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = 'var(--color-neutral-3)'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
        {...rest}
      />
      {error && (
        <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-error)' }}>
          {error}
        </span>
      )}
    </div>
  )
}