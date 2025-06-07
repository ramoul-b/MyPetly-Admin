import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['User'],
  endpoints: (b) => ({
    listUsers: b.query({
      query: () => 'users',
      providesTags: ['User']
    }),
    getUser: b.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }]
    }),
    addUser: b.mutation({
      query: (body) => ({ url: 'users', method: 'POST', body }),
      invalidatesTags: ['User']
    }),
    updateUser: b.mutation({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: b.mutation({
      query: (id) => ({ url: `users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['User']
    }),
    // (optionnel) upload photo user
    uploadImage: b.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('image', file);
        return {
          url: `users/${id}/image`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  })
})

export const {
  useListUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadImageMutation,
} = usersApi
