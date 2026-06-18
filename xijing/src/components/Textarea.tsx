import { type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const Textarea = ({ label, style, ...rest }: TextareaProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-neutral-7)', fontWeight: 'var(--font-weight-medium)' }}>
          {label}
        </label>
      )}
      <textarea
        style={{
          padding: '12px',
          fontSize: 'var(--font-size-body-sm)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-neutral-3)',
          background: 'var(--color-surface-input)',
          color: 'var(--color-neutral-8)',
          lineHeight: 1.6,
          outline: 'none',
          width: '100%',
          resize: 'vertical',
          minHeight: '80px',
          fontFamily: 'inherit',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.boxShadow = 'var(--shadow-primary-glow)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-neutral-3)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        {...rest}
      />
    </div>
  )
}

export default Textarea