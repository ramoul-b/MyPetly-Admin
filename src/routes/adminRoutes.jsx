import MainLayout   from '../layouts/MainLayout'
import RequireAuth  from '../modules/auth/RequireAuth'
import RequireRole  from '../modules/auth/RequireRole'
import Dashboard    from '../pages/Dashboard'
import UsersList    from '../pages/UsersList'
import ProfilePage  from '../modules/profile/ProfilePage'
import AnimalsList    from '../pages/animal/AnimalsList'
import AnimalForm from '../pages/animal/AnimalForm'
import AnimalDetails from '../pages/animal/AnimalDetails'
import UserDetails from '../pages/users/UserDetails' 
import UserForm from '../pages/users/UserForm'   
import ProvidersList from '../pages/provider/ProvidersList'
import ProviderForm from '../pages/provider/ProviderForm'
import ProviderDetails from '../pages/provider/ProviderDetails'
import RolesList from '../pages/roles/RolesList'
import RoleForm from '../pages/roles/RoleForm'
import RoleDetails from '../pages/roles/RoleDetails'
import PermissionsList from '../pages/roles/PermissionsList'
import PermissionForm from '../pages/roles/PermissionForm'
import Profile from '../pages/profile/Profile'


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
        path: 'profile',
        element: <ProfilePage />,
        handle: { title: 'profile' }
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
        path: 'providers',
        children: [
          { index: true, element: <ProvidersList /> },
          { path: 'create', element: <ProviderForm /> },
          { path: ':id/edit', element: <ProviderForm /> },
          { path: ':id', element: <ProviderDetails /> }
        ]
      },
      {
        path: 'roles',
        children: [
          { index: true, element: <RolesList /> },
          { path: 'create', element: <RoleForm /> },
          { path: ':id/edit', element: <RoleForm /> },
          { path: ':id', element: <RoleDetails /> }
        ]
      },
      {
        path: 'permissions',
        children: [
          { index: true, element: <PermissionsList /> },
          { path: 'create', element: <PermissionForm /> },
          { path: ':id/edit', element: <PermissionForm /> }
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
