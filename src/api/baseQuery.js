import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (h) => {
    const t = localStorage.getItem('access_token')
    if (t) h.set('authorization', `Bearer ${t}`)
    return h
  }
})

export const baseQueryWithRefresh = async (args, api, extra) => {
  let res = await rawBaseQuery(args, api, extra)
  if (res.error?.status === 401) {
    const r = await rawBaseQuery('refresh-token', api, extra)
    if (r.data?.access_token) {
      localStorage.setItem('access_token', r.data.access_token)
      res = await rawBaseQuery(args, api, extra)
    } else api.dispatch({ type: 'auth/logout' })
  }
  return res
}
