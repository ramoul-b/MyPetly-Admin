// routes/index.jsx
import { useRoutes } from 'react-router-dom'
import publicRoutes from './publicRoutes'
import adminRoutes  from './adminRoutes'

export default function AppRoutes () {
  return useRoutes([...publicRoutes, ...adminRoutes])
}
