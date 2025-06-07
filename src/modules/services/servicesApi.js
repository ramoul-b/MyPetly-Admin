import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Service'],
  endpoints: (b) => ({
    listServices: b.query({
      query: (params) => ({ url: 'services', params }),
      providesTags: ['Service']
    }),
    getService: b.query({
      query: (id) => `services/${id}`,
      providesTags: (r, e, id) => [{ type: 'Service', id }]
    }),
    addService: b.mutation({
      query: (body) => ({ url: 'services', method: 'POST', body }),
      invalidatesTags: ['Service']
    }),
    updateService: b.mutation({
      query: ({ id, ...body }) => ({
        url: `services/${id}`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['Service']
    }),
    deleteService: b.mutation({
      query: (id) => ({ url: `services/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Service']
    }),
    assignProviders: b.mutation({
      query: ({ id, providers }) => ({
        url: `services/${id}/providers`,
        method: 'POST',
        body: { providers }
      }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Service', id }]
    }),
    removeProvider: b.mutation({
      query: ({ id, providerId }) => ({
        url: `services/${id}/providers/${providerId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Service', id }]
    })
  })
})

export const {
  useListServicesQuery,
  useGetServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useAssignProvidersMutation,
  useRemoveProviderMutation
} = servicesApi
