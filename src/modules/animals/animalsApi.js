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
      query: (id) => `animals/${id}`,
      providesTags: (result, error, id) => [{ type: 'Animal', id }]
    }),
    addAnimal: b.mutation({
      query: (body) => ({ url: 'animals', method: 'POST', body }),
      invalidatesTags: ['Animal']
    }),
    updateAnimal: b.mutation({
  query: ({ id, ...body }) => {
    // body peut être un FormData ou un objet
    return {
      url: `animals/${id}`,
      method: 'PUT',
      body,
      // Ajoute ceci pour forcer le content-type automatique sur FormData
      ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
    }
  },
  invalidatesTags: ['Animal']
  }),
  uploadImage: b.mutation({
  query: ({ id, file }) => {
    const formData = new FormData();
    formData.append('image', file);
    return {
      url: `animals/${id}/image`,
      method: 'POST',
      body: formData,
    };
  },
  invalidatesTags: (result, error, { id }) => [{ type: 'Animal', id }],
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
  useDeleteAnimalMutation,
  useUploadImageMutation
} = animalsApi
