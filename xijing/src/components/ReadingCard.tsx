import Card from './Card'

interface ReadingCardProps {
  title?: string
  content: string
  maxWidth?: number
}

export default function ReadingCard({ title, content, maxWidth = 720 }: ReadingCardProps) {
  return (
    <Card padding="lg" style={{ maxWidth, width: '100%' }}>
      {title && (
        <h2 style={{
          margin: '0 0 24px',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-neutral-8)',
          lineHeight: 'var(--line-height-tight)',
        }}>
          {title}
        </h2>
      )}
      <div style={{
        fontSize: 'var(--font-size-body)',
        color: 'var(--color-neutral-7)',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {content}
      </div>
    </Card>
  )
}
