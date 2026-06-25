import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export default function Select({ options, value, placeholder = '请选择', disabled = false, onChange }: SelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  // 点击外部区域关闭下拉
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', minWidth: '200px' }}>
      {/* 触发器 */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen(!open)
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '36px',
          padding: '0 12px',
          fontSize: 'var(--font-size-body-sm)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${open ? 'var(--color-primary)' : 'var(--color-neutral-3)'}`,
          background: 'var(--color-surface-input)',
          color: selectedOption ? 'var(--color-neutral-8)' : 'var(--color-neutral-5)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          textAlign: 'left',
          outline: 'none',
          boxShadow: open ? 'var(--shadow-primary-glow)' : 'none',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span style={{
          fontSize: '10px',
          color: 'var(--color-neutral-5)',
          transition: 'transform var(--transition-fast)',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          ▼
        </span>
      </button>

      {/* 下拉选项 */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-neutral-3)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            maxHeight: '240px',
            overflowY: 'auto',
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              style={{
                padding: '10px 12px',
                fontSize: 'var(--font-size-body-sm)',
                color: opt.value === value ? 'var(--color-primary)' : 'var(--color-neutral-7)',
                cursor: 'pointer',
                backgroundColor: opt.value === value ? 'var(--color-primary-surface)' : 'transparent',
                transition: 'background var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (opt.value !== value) {
                  e.currentTarget.style.background = 'var(--color-neutral-1)'
                }
              }}
              onMouseLeave={(e) => {
                if (opt.value !== value) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}