import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Role', 'Permission'],
  endpoints: (b) => ({
    listRoles: b.query({
      query: () => 'roles',
      providesTags: ['Role']
    }),
    getRole: b.query({
      query: (id) => `roles/${id}`,
      providesTags: (r, e, id) => [{ type: 'Role', id }]
    }),
    addRole: b.mutation({
      query: (body) => ({ url: 'roles', method: 'POST', body }),
      invalidatesTags: ['Role']
    }),
    updateRole: b.mutation({
      query: ({ id, ...body }) => ({ url: `roles/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Role']
    }),
    deleteRole: b.mutation({
      query: (id) => ({ url: `roles/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Role']
    }),
    listPermissions: b.query({
      query: () => 'permissions',
      providesTags: ['Permission']
    }),
    addPermission: b.mutation({
      query: (body) => ({ url: 'permissions', method: 'POST', body }),
      invalidatesTags: ['Permission']
    }),
    updatePermission: b.mutation({
      query: ({ id, ...body }) => ({ url: `permissions/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Permission']
    }),
    deletePermission: b.mutation({
      query: (id) => ({ url: `permissions/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Permission']
    }),
    assignPermission: b.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `roles/${roleId}/permissions`,
        method: 'POST',
        body: { permissionId }
      }),
      invalidatesTags: (r, e, { roleId }) => [{ type: 'Role', id: roleId }]
    }),
    removePermission: b.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `roles/${roleId}/permissions/${permissionId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (r, e, { roleId }) => [{ type: 'Role', id: roleId }]
    })
  })
})

export const {
  useListRolesQuery,
  useGetRoleQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useListPermissionsQuery,
  useAddPermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useAssignPermissionMutation,
  useRemovePermissionMutation
} = rolesApi
