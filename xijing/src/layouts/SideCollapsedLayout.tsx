import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import NavItem from '../components/NavItem'
import { BookOpen, Settings, User, Menu } from 'lucide-react'

export default function SideCollapsedLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar collapsed>
        <NavItem icon={<BookOpen size={20} />} label="我的故事" collapsed />
        <NavItem icon={<Settings size={20} />} label="API配置" collapsed />
        <NavItem icon={<User size={20} />} label="个人中心" collapsed />
      </Sidebar>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <div style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          background: '#F9FAFB',
        }}>
          <div style={{ width: '100%', maxWidth: 720, padding: '24px 0' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}