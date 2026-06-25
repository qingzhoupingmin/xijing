interface Chapter {
  id: string
  title: string
}

interface ChapterListProps {
  chapters: Chapter[]
  activeChapter?: string
  onChapterClick: (id: string) => void
}

export default function ChapterList({ chapters, activeChapter, onChapterClick }: ChapterListProps) {
  return (
    <div style={{
      width: '220px',
      height: '100%',
      background: 'var(--color-surface-sidebar)',
      borderRight: '1px solid var(--color-neutral-3)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* 标题 */}
      <div style={{
        padding: '16px 20px',
        fontSize: 'var(--font-size-body-sm)',
        color: 'var(--color-neutral-6)',
        fontWeight: 'var(--font-weight-medium)',
        borderBottom: '1px solid var(--color-neutral-2)',
      }}>
        章节目录
      </div>

      {/* 章节列表 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {chapters.map((chapter) => {
          const active = chapter.id === activeChapter
          return (
            <div
              key={chapter.id}
              onClick={() => onChapterClick(chapter.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '44px',
                padding: '0 20px',
                fontSize: 'var(--font-size-body-sm)',
                color: active ? 'var(--color-primary)' : 'var(--color-neutral-6)',
                background: active ? 'var(--color-primary-surface)' : 'transparent',
                borderLeft: active ? '3px solid var(--color-primary)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast)',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = 'var(--color-neutral-1)'
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = 'transparent'
              }}
            >
              {chapter.title}
            </div>
          )
        })}
        {chapters.length === 0 && (
          <div style={{ padding: '20px', fontSize: 14, color: '#9CA3AF', textAlign: 'center' }}>
            暂无章节
          </div>
        )}
      </div>
    </div>
  )
}
