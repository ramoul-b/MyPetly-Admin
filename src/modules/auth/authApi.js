// src/modules/auth/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://vps-88a3af89.vps.ovh.net:8081/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token')
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  }
})

const baseQueryWithRefresh = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra)

  if (result.error?.status === 401) {
    // RE-TRY via /refresh-token
    const refresh = await baseQuery('refresh-token', api, extra)
    if (refresh.data?.access_token) {
      localStorage.setItem('access_token', refresh.data.access_token)
      result = await baseQuery(args, api, extra)
    } else {
      api.dispatch({ type: 'auth/logout' })
    }
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation({
      // IMPORTANT : pas de “/” devant
      query: (body) => ({ url: 'login', method: 'POST', body })
    })
  })
})

export const { useLoginMutation } = authApi
export { baseQueryWithRefresh }         // ← ajoute ceci

