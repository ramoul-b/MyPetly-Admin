import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const providerServicesApi = createApi({
  reducerPath: 'providerServicesApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['ProviderService'],
  endpoints: (b) => ({
    listProviderServices: b.query({
      query: (params) => ({ url: 'provider-services', params }),
      providesTags: ['ProviderService']
    }),
    getProviderService: b.query({
      query: (id) => `provider-services/${id}`,
      providesTags: (r, e, id) => [{ type: 'ProviderService', id }]
    }),
    addProviderService: b.mutation({
      query: (body) => ({ url: 'provider-services', method: 'POST', body }),
      invalidatesTags: ['ProviderService']
    }),
    updateProviderService: b.mutation({
      query: ({ id, ...body }) => ({
        url: `provider-services/${id}`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['ProviderService']
    }),
    deleteProviderService: b.mutation({
      query: (id) => ({ url: `provider-services/${id}`, method: 'DELETE' }),
      invalidatesTags: ['ProviderService']
    })
  })
})

export const {
  useListProviderServicesQuery,
  useGetProviderServiceQuery,
  useAddProviderServiceMutation,
  useUpdateProviderServiceMutation,
  useDeleteProviderServiceMutation
} = providerServicesApi
