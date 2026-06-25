import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './tokens.css'
import './index.css'

// 布局
import FullscreenLayout from './layouts/FullscreenLayout'
import SideCollapsedLayout from './layouts/SideCollapsedLayout'
import SideNavLayout from './layouts/SideNavLayout'

// 占位（后面替换为真实页面）
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ fontSize: 18, color: '#6B7280' }}>{title} — 待实现</div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideNavLayout activeNav="stories" />,
    children: [
      { index: true, element: <Placeholder title="故事列表" /> },
      { path: 'story/create', element: <Placeholder title="创建故事" /> },
      { path: 'settings/api', element: <SideNavLayout activeNav="api"><Placeholder title="API配置" /></SideNavLayout> },
      { path: 'settings/profile', element: <SideNavLayout activeNav="profile"><Placeholder title="个人中心" /></SideNavLayout> },
    ],
  },
  {
    path: 'login',
    element: <FullscreenLayout />,
    children: [
      { index: true, element: <Placeholder title="登录" /> },
    ],
  },
  {
    path: 'story/:id/playing',
    element: <SideCollapsedLayout />,
    children: [
      { index: true, element: <Placeholder title="故事演绎" /> },
    ],
  },
  {
    path: 'story/:id/review',
    element: <SideCollapsedLayout />,
    children: [
      { index: true, element: <Placeholder title="章节回看" /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)