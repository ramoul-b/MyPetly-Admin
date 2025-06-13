// routes/publicRoutes.js
import LoginPage from '../modules/auth/LoginPage'
import ForbiddenPage from '../pages/ForbiddenPage'

export default [
  { path: '/login', element: <LoginPage /> },
  { path: '/403', element: <ForbiddenPage /> }
]
