import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Profile'],
  endpoints: (b) => ({
    getProfile: b.query({
      query: () => ({ url: 'user-profile', method: 'GET' }),
      providesTags: ['Profile']
    }),
    updateProfile: b.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    uploadProfilePhoto: b.mutation({
      query: ({ file }) => {
        const form = new FormData()
        form.append('photo', file)
        return {
          url: '/account/profile/photo',
          method: 'POST',
          body: form,
        }
      },
    }),
    changePassword: b.mutation({
      query: (body) => ({ url: 'update-password', method: 'POST', body })
    }),
    deactivateAccount: b.mutation({
      query: () => ({ url: 'deactivate-account', method: 'POST' })
    }),
    deleteAccount: b.mutation({
      query: () => ({ url: 'delete-account', method: 'DELETE' })
    })
  })
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeactivateAccountMutation,
  useDeleteAccountMutation,
  useUploadProfilePhotoMutation
} = profileApi
