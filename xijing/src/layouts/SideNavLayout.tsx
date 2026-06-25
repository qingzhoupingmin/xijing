import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import NavItem from '../components/NavItem'
import { BookOpen, Settings, User } from 'lucide-react'
import { type ReactNode } from 'react'

interface SideNavLayoutProps {
  activeNav?: 'stories' | 'api' | 'profile'
  children?: ReactNode
}

export default function SideNavLayout({ activeNav = 'stories', children }: SideNavLayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        logo={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#7C5CFC' }}>戏境</span>
          </div>
        }
      >
        <NavItem icon={<BookOpen size={20} />} label="我的故事" active={activeNav === 'stories'} />
        <NavItem icon={<Settings size={20} />} label="API配置" active={activeNav === 'api'} />
        <NavItem icon={<User size={20} />} label="个人中心" active={activeNav === 'profile'} />
      </Sidebar>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <div style={{ flex: 1, overflow: 'auto', padding: 24, background: '#F9FAFB' }}>
          {children || <Outlet />}
        </div>
      </div>
    </div>
  )
}