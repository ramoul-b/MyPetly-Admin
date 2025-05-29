import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Animal'],
  endpoints: (b) => ({
    listAnimals:  b.query({
      query: () => 'animals',
      providesTags: ['Animal']
    }),
    getAnimal: b.query({
      query: (id) => `animals/${id}`
    }),
    addAnimal: b.mutation({
      query: (body) => ({ url: 'animals', method: 'POST', body }),
      invalidatesTags: ['Animal']
    }),
    updateAnimal: b.mutation({
      query: ({ id, ...body }) => ({ url: `animals/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Animal']
    }),
    deleteAnimal: b.mutation({
      query: (id) => ({ url: `animals/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Animal']
    }),
  })
})

export const {
  useListAnimalsQuery,
  useGetAnimalQuery,
  useAddAnimalMutation,
  useUpdateAnimalMutation,
  useDeleteAnimalMutation
} = animalsApi
