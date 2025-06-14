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
          { index: true, element: <RequirePerm allowed="view_any_service"><ServicesList /></RequirePerm> },
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
