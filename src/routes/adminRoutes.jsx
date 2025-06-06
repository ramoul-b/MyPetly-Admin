import MainLayout   from '../layouts/MainLayout'
import RequireAuth  from '../modules/auth/RequireAuth'
import RequireRole  from '../modules/auth/RequireRole'
import Dashboard    from '../pages/Dashboard'
import AnimalsList    from '../pages/animal/AnimalsList'
import AnimalForm from '../pages/animal/AnimalForm'
import AnimalDetails from '../pages/animal/AnimalDetails'
import UsersList from '../pages/users/UsersList'
import UserDetails from '../pages/users/UserDetails' 
import UserForm from '../pages/users/UserForm'   
import ProvidersList from '../pages/provider/ProvidersList'
import ProviderForm from '../pages/provider/ProviderForm'
import ProviderDetails from '../pages/provider/ProviderDetails'

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
        children: [
          {
            index: true,
            element: <RequireRole allowed={['super_admin']}><UsersList /></RequireRole>,
            handle: { title: 'users' }
          },
          {
            path: ':id',
            element: <RequireRole allowed={['super_admin']}><UserDetails /></RequireRole>
          },
          {
            path: ':id/edit',
            element: <RequireRole allowed={['super_admin']}><UserForm /></RequireRole>
          },
          {
            path: 'create',
            element: <RequireRole allowed={['super_admin']}><UserForm /></RequireRole>
          },
        ]
      },
      {
        path: 'providers',
        children: [
          {
            index: true,
            element: <RequireRole allowed={['super_admin']}><ProvidersList /></RequireRole>,
            handle: { title: 'providers' }
          },
          {
            path: ':id',
            element: <RequireRole allowed={['super_admin']}><ProviderDetails /></RequireRole>
          },
          {
            path: ':id/edit',
            element: <RequireRole allowed={['super_admin']}><ProviderForm isEdit={true} /></RequireRole>
          },
          {
            path: 'create',
            element: <RequireRole allowed={['super_admin']}><ProviderForm /></RequireRole>
          },
        ]
      }
    ]
  }
]
