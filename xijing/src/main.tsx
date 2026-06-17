import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './tokens.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/stories" replace />,
  },
  {
    path: '/stories',
    element: <div>故事列表 - 待实现</div>,
  },
  {
    path: '/story/create',
    element: <div>创建故事 - 待实现</div>,
  },
  {
    path: '/story/:id/playing',
    element: <div>故事演绎 - 待实现</div>,
  },
  {
    path: '/story/:id/review',
    element: <div>章节回看 - 待实现</div>,
  },
  {
    path: '/settings/api',
    element: <div>API配置 - 待实现</div>,
  },
  {
    path: '/settings/profile',
    element: <div>个人中心 - 待实现</div>,
  },
  {
    path: '/login',
    element: <div>登录 - 待实现</div>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)