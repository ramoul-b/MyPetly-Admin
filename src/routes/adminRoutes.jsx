import MainLayout   from '../layouts/MainLayout'
import RequireAuth  from '../modules/auth/RequireAuth'
import RequireRole  from '../modules/auth/RequireRole'
import RequirePerm  from '../modules/auth/RequirePerm'
import Dashboard    from '../pages/Dashboard'
import UsersList    from '../pages/users/UsersList'
import AnimalsList    from '../pages/animal/AnimalsList'
import AnimalForm from '../pages/animal/AnimalForm'
import AnimalDetails from '../pages/animal/AnimalDetails'
import UserDetails from '../pages/users/UserDetails' 
import UserForm from '../pages/users/UserForm'   
import ProvidersList from '../pages/provider/ProvidersList'
import ProviderForm from '../pages/provider/ProviderForm'
import ProviderDetails from '../pages/provider/ProviderDetails'
import ServicesList from '../pages/service/ServicesList'
import ServiceForm from '../pages/service/ServiceForm'
import ServiceDetails from '../pages/service/ServiceDetails'
import CategoriesList from '../pages/category/CategoriesList'
import CategoryForm from '../pages/category/CategoryForm'
import CategoryDetails from '../pages/category/CategoryDetails'
import RolesList from '../pages/roles/RolesList'
import RoleForm from '../pages/roles/RoleForm'
import RoleDetails from '../pages/roles/RoleDetails'
import PermissionsList from '../pages/roles/PermissionsList'
import PermissionForm from '../pages/roles/PermissionForm'
import ProfilePage from '../pages/profile/Profile'
import BookingsList from '../pages/bookings/BookingsList'
import BookingForm from '../pages/bookings/BookingForm'
import BookingDetails from '../pages/bookings/BookingDetails'
import BookingCalendar from '../pages/bookings/BookingCalendar'
import CollarsList from '../pages/collar/CollarsList'
import CollarForm from '../pages/collar/CollarForm'
import CollarDetails from '../pages/collar/CollarDetails'


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
          { index: true, element: <RequirePerm allowed="animals.read"><AnimalsList /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="animals.create"><AnimalForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="animals.edit"><AnimalForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="animals.read"><AnimalDetails /></RequirePerm> },
        ]
      },
      {
        path: 'collars',
        children: [
          { index: true, element: <RequirePerm allowed="collars.read"><CollarsList /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="collars.create"><CollarForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="collars.edit"><CollarForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="collars.read"><CollarDetails /></RequirePerm> }
        ]
      },
      {
        path: 'services',
        children: [
          { index: true, element: <RequirePerm allowed="services.read"><ServicesList /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="services.create"><ServiceForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="services.edit"><ServiceForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="services.read"><ServiceDetails /></RequirePerm> }
        ]
      },
      {
        path: 'categories',
        children: [
          { index: true, element: <RequirePerm allowed="categories.read"><CategoriesList /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="categories.create"><CategoryForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="categories.edit"><CategoryForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="categories.read"><CategoryDetails /></RequirePerm> }
        ]
      },
      {
        path: 'roles',
        children: [
          { index: true, element: <RequireRole allowed={['super_admin']}><RolesList /></RequireRole> },
          { path: 'create', element: <RequireRole allowed={['super_admin']}><RoleForm /></RequireRole> },
          { path: ':id/edit', element: <RequireRole allowed={['super_admin']}><RoleForm /></RequireRole> },
          { path: ':id', element: <RequireRole allowed={['super_admin']}><RoleDetails /></RequireRole> }
        ]
      },
      {
        path: 'bookings',
        children: [
          { index: true, element: <RequirePerm allowed="bookings.read"><BookingsList /></RequirePerm> },
          { path: 'calendar', element: <RequirePerm allowed="bookings.read"><BookingCalendar /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="bookings.create"><BookingForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="bookings.edit"><BookingForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="bookings.read"><BookingDetails /></RequirePerm> }
        ]
      },
      {
        path: 'permissions',
        children: [
          { index: true, element: <RequireRole allowed={['super_admin']}><PermissionsList /></RequireRole> },
          { path: 'create', element: <RequireRole allowed={['super_admin']}><PermissionForm /></RequireRole> },
          { path: ':id/edit', element: <RequireRole allowed={['super_admin']}><PermissionForm /></RequireRole> }
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
