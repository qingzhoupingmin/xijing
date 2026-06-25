import { type ReactNode, useEffect } from 'react'

interface DialogProps {
  open: boolean
  title?: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
  width?: number
}

export default function Dialog({ open, title, children, footer, onClose, width = 560 }: DialogProps) {
  // 阻止背景滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  // ESC 关闭
  useEffect(() => {
    if (!open) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1040,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 遮罩层 */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-surface-overlay)',
        }}
      />

      {/* 弹窗卡片 */}
      <div
        style={{
          position: 'relative',
          width,
          maxWidth: '90vw',
          maxHeight: '80vh',
          background: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'dialogIn var(--transition-normal)',
        }}
      >
        {/* 头部 */}
        {title && (
          <div style={{
            padding: '24px 24px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-neutral-8)',
            }}>
              {title}
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', background: 'none', fontSize: 18,
                color: 'var(--color-neutral-5)', cursor: 'pointer',
                borderRadius: 6,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-neutral-1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* 内容区 */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>{children}</div>

        {/* 底部操作区 */}
        {footer && (
          <div style={{
            padding: '0 24px 24px',
            borderTop: '0px solid var(--color-neutral-2)',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
