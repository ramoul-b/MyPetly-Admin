// src/App.jsx
import { AuthProvider } from './modules/auth/AuthProvider'
import AppRoutes from './routes'

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}