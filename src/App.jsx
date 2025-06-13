// src/App.jsx
import { AuthProvider } from './modules/auth/AuthProvider'
import AppRoutes from './routes'
import GlobalSnackbar from './components/GlobalSnackbar'

export default function App() {
  return (
    <AuthProvider>
      <GlobalSnackbar />
      <AppRoutes />
    </AuthProvider>
  )
}