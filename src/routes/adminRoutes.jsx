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
import MyServicesList from '../pages/providerServices/MyServicesList'
import ProviderServiceDetails from '../pages/providerServices/ProviderServiceDetails'
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
import useAuth from '../modules/auth/useAuth'

function ServicesIndex() {
  const { can } = useAuth()
  if (can('view_any_service')) return <ServicesList />
  return <RequirePerm allowed="view_own_service"><MyServicesList /></RequirePerm>
}



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
        path: 'my-services',
        element: <RequireRole allowed={['provider']}><MyServicesList /></RequireRole>,
        handle: { title: 'my_services' }
      },
      {
        path: 'provider-services/:id',
        element: (
          <RequirePerm allowed="view_own_provider_service">
            <ProviderServiceDetails />
          </RequirePerm>
        )
      },
      {
        path: 'animals',
        children: [
          { index: true, element: <RequirePerm allowed="view_any_animal"><AnimalsList /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="create_animal"><AnimalForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="edit_any_animal"><AnimalForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="view_any_animal"><AnimalDetails /></RequirePerm> },
        ]
      },
      {
        path: 'collars',
        children: [
          { index: true, element: <RequirePerm allowed="view_any_collar"><CollarsList /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="create_collar"><CollarForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="edit_any_collar"><CollarForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="view_any_collar"><CollarDetails /></RequirePerm> }
        ]
      },
      {
        path: 'services',
        children: [
          { index: true, element: <ServicesIndex /> },
          { path: 'create', element: <RequirePerm allowed="create_service"><ServiceForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="edit_any_service"><ServiceForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="view_any_service"><ServiceDetails /></RequirePerm> }
        ]
      },
      {
        path: 'categories',
        children: [
          { index: true, element: <RequirePerm allowed="view_any_category"><CategoriesList /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="create_category"><CategoryForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="edit_any_category"><CategoryForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="view_any_category"><CategoryDetails /></RequirePerm> }
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
          { index: true, element: <RequirePerm allowed="view_any_booking"><BookingsList /></RequirePerm> },
          { path: 'calendar', element: <RequirePerm allowed="view_any_booking"><BookingCalendar /></RequirePerm> },
          { path: 'create', element: <RequirePerm allowed="create_booking"><BookingForm /></RequirePerm> },
          { path: ':id/edit', element: <RequirePerm allowed="edit_any_booking"><BookingForm /></RequirePerm> },
          { path: ':id', element: <RequirePerm allowed="view_any_booking"><BookingDetails /></RequirePerm> }
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
