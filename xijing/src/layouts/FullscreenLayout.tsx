import { Outlet } from 'react-router-dom'

export default function FullscreenLayout() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-surface-page)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 紫色光晕背景 */}.
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <Outlet />
    </div>
  )
}