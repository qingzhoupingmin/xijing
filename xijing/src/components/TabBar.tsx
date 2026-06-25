import { type ReactNode } from 'react'
import TabItem from './TabItem'
interface TabItem {
  key: string
  label: string
  icon?: ReactNode
}

interface TabBarProps {
  items: TabItem[]
  activeKey: string
  onChange: (key: string) => void
}

export default function TabBar({ items, activeKey, onChange }: TabBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        height: '40px',
        borderBottom: '1px solid var(--color-neutral-3)',
      }}
    >
      {items.map((item) => (
        <TabItem
          key={item.key}
          label={item.label}
          icon={item.icon}
          active={item.key === activeKey}
          onClick={() => onChange(item.key)}
        />
      ))}
    </div>
  )
}