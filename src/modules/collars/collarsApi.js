import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const collarsApi = createApi({
  reducerPath: 'collarsApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Collar'],
  endpoints: (b) => ({
    listCollars: b.query({
      query: (params) => ({ url: 'collars', params }),
      providesTags: ['Collar']
    }),
    getCollar: b.query({
      query: (id) => `collars/${id}`,
      providesTags: (r, e, id) => [{ type: 'Collar', id }]
    }),
    addCollar: b.mutation({
      query: (body) => ({ url: 'collars', method: 'POST', body }),
      invalidatesTags: ['Collar']
    }),
    updateCollar: b.mutation({
      query: ({ id, ...body }) => ({
        url: `collars/${id}`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['Collar']
    }),
    deleteCollar: b.mutation({
      query: (id) => ({ url: `collars/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Collar']
    }),
    assignCollar: b.mutation({
      query: ({ collarId, animalId }) => ({
        url: `collars/${collarId}/assign/${animalId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Collar']
    })
  })
})

export const {
  useListCollarsQuery,
  useGetCollarQuery,
  useAddCollarMutation,
  useUpdateCollarMutation,
  useDeleteCollarMutation,
  useAssignCollarMutation
} = collarsApi
