import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import AnimalsList from './pages/animal/AnimalsList'
import AnimalForm from './pages/animal/AnimalForm'
import LoginPage from './modules/auth/LoginPage'
import RequireAuth from './modules/auth/RequireAuth'
import RequireRole from './modules/auth/RequireRole'
import UsersList from './pages/UsersList'
import ForbiddenPage from './pages/ForbiddenPage'
import NotFoundPage from './pages/NotFoundPage'
import RequirePerm from './modules/auth/RequirePerm'
// App.jsx
import AppRoutes from './routes'



const ANIMAL_ROLES    = ['Admin', 'Manager']
const SUPERADMIN_ROLE = ['super_admin']   


export default function App () { return <AppRoutes /> }
