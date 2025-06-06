import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const providerApi = createApi({
  reducerPath: 'providerApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Provider'],
  endpoints: (b) => ({
    listProviders: b.query({
      query: () => 'providers',
      providesTags: ['Provider']
    }),
    getProvider: b.query({
      query: (id) => `providers/${id}`
    }),
    addProvider: b.mutation({
      query: (body) => ({ url: 'providers', method: 'POST', body }),
      invalidatesTags: ['Provider']
    }),
    updateProvider: b.mutation({
      query: ({ id, ...body }) => ({
        url: `providers/${id}`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['Provider']
    }),
    uploadImage: b.mutation({
      query: ({ id, file }) => {
        const formData = new FormData()
        formData.append('image', file)
        return {
          url: `providers/${id}/image`,
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['Provider']
    }),
    deleteProvider: b.mutation({
      query: (id) => ({ url: `providers/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Provider']
    })
  })
})

export const {
  useListProvidersQuery,
  useGetProviderQuery,
  useAddProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderMutation,
  useUploadImageMutation: useUploadProviderImageMutation
} = providerApi
