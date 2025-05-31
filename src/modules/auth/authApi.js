// src/modules/auth/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from './authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? 'https://api.mypetly.co/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token')
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  }
})

const baseQueryWithRefresh = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra)

  if (result.error?.status === 401 && !args.url?.includes('login')) {
    // ✅ POST et objet complet
    const refresh = await baseQuery(
      { url: 'refresh-token', method: 'POST' },
      api,
      extra
    )

    if (refresh.data?.access_token) {
      localStorage.setItem('access_token', refresh.data.access_token)
      api.dispatch(setCredentials(refresh.data))
      // rejoue la requête initiale
      result = await baseQuery(args, api, extra)
    } else {
      api.dispatch(logout())
    }
  }
  return result
} 

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: 'login', method: 'POST', body })
    }),
    refresh: builder.mutation({               // optionnel mais utile
      query: () => ({ url: 'refresh-token', method: 'POST' })
    })
  })
})

export const { useLoginMutation } = authApi