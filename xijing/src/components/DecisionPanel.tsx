import { useState } from 'react'
import Card from './Card'
import Textarea from './Textarea'
import Button from './Button'

interface DecisionPanelProps {
  situation: string
  placeholder?: string
  onSubmit: (input: string) => void
  submitting?: boolean
}

export default function DecisionPanel({
  situation,
  placeholder = '请描述你的选择...',
  onSubmit,
  submitting = false,
}: DecisionPanelProps) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (input.trim() && !submitting) {
      onSubmit(input.trim())
      setInput('')
    }
  }

  return (
    <Card padding="lg">
      {/* 顶部渐变线 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
      }} />

      {/* 局势描述 */}
      <div style={{
        fontSize: 'var(--font-size-body-sm)',
        color: 'var(--color-secondary)',
        fontWeight: 'var(--font-weight-medium)',
        marginBottom: '16px',
      }}>
        📖 {situation}
      </div>

      {/* 输入区域 */}
      <Textarea
        placeholder={placeholder}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={500}
      />

      {/* 提交按钮 */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="gold"
          onClick={handleSubmit}
          loading={submitting}
          disabled={!input.trim()}
        >
          {submitting ? '生成中...' : '提交选择'}
        </Button>
      </div>
    </Card>
  )
}
