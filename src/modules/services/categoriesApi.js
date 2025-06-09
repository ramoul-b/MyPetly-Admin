import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Category'],
  endpoints: (b) => ({
    listCategories: b.query({
      query: () => 'categories',
      providesTags: ['Category']
    }),
    getCategory: b.query({
      query: (id) => `categories/${id}`,
      providesTags: (r, e, id) => [{ type: 'Category', id }]
    }),
    addCategory: b.mutation({
      query: (body) => ({ url: 'categories', method: 'POST', body }),
      invalidatesTags: ['Category']
    }),
    updateCategory: b.mutation({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['Category']
    }),
    deleteCategory: b.mutation({
      query: (id) => ({ url: `categories/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Category']
    })
  })
})

export const {
  useListCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApi
