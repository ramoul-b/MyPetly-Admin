// src/routes/adminRoutes.jsx
import MainLayout   from '../layouts/MainLayout'
import RequireAuth  from '../modules/auth/RequireAuth'
import RequireRole  from '../modules/auth/RequireRole'
import Dashboard    from '../pages/Dashboard'
import UsersList    from '../pages/UsersList'
import AnimalsList    from '../pages/animal/AnimalsList'
import AnimalForm from '../pages/animal/AnimalForm'
import AnimalDetails from '../pages/animal/AnimalDetails'




export default [
  {
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: { title: 'dashboard' }
      },
      {
        path: 'animals',
        children: [
          { index: true, element: <AnimalsList /> },
          { path: 'create', element: <AnimalForm /> },
          { path: ':id/edit', element: <AnimalForm /> },
          { path: ':id', element: <AnimalDetails /> },
        ]
      },
      {
        path: 'users',
        element: <RequireRole allowed={['super_admin']}><UsersList /></RequireRole>,
        handle: { title: 'users' }
      }
    ]
  }
]


