import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import AnimalsList from './pages/AnimalsList'
import AnimalForm from './pages/AnimalForm'
import LoginPage from './modules/auth/LoginPage'
import RequireAuth from './modules/auth/RequireAuth'

export default function App () {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* zone protégée */}
      <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="animals" element={<AnimalsList />} />
        <Route path="animals/create" element={<AnimalForm />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}
