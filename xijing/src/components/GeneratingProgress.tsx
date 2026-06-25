interface GeneratingProgressProps {
  progress: number
}

export default function GeneratingProgress({ progress }: GeneratingProgressProps) {
  return (
    <div style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 'var(--font-size-caption)',
        color: 'var(--color-neutral-5)',
      }}>
        <span>AI 正在生成章节...</span>
        <span>{Math.round(progress)}%</span>
      </div>

      {/* 进度条轨道 */}
      <div style={{
        height: '4px',
        background: 'var(--color-neutral-3)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        {/* 进度条填充 */}
        <div
          style={{
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            borderRadius: '2px',
            transition: 'width 300ms ease',
          }}
        />
      </div>
    </div>
  )
}
