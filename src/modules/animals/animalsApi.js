import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'   // ré-utilise ton baseQuery

export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Animals'],
  endpoints: b => ({
    listAnimals:  b.query({ query: () => 'animals', providesTags: ['Animals'] }),
    addAnimal:    b.mutation({ query: body => ({ url:'animals', method:'POST', body }), invalidatesTags:['Animals'] })
  })
})

export const { useListAnimalsQuery, useAddAnimalMutation } = animalsApi
