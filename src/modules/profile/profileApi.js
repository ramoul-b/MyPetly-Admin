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
      query: (body) => ({ url: 'account/profile', method: 'POST', body }),
      invalidatesTags: ['Profile']
    }),
    changePassword: b.mutation({
      query: (body) => ({ url: 'account/change-password', method: 'PUT', body })
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
  useDeleteAccountMutation
} = profileApi
