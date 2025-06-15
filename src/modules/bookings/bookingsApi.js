import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Booking'],
  endpoints: (b) => ({
    listBookings: b.query({
      query: (params) => {
        let url = 'bookings'
        if (params) {
          const qs = new URLSearchParams(params).toString()
          if (qs) url += `?${qs}`
        }
        return url
      },
      providesTags: ['Booking']
    }),
    getBooking: b.query({
      query: (id) => `bookings/${id}`,
      providesTags: (result, error, id) => [{ type: 'Booking', id }]
    }),
    addBooking: b.mutation({
      query: (body) => ({ url: 'bookings', method: 'POST', body }),
      invalidatesTags: ['Booking']
    }),
    updateBooking: b.mutation({
      query: ({ id, ...body }) => ({
        url: `bookings/${id}`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['Booking']
    }),
    deleteBooking: b.mutation({
      query: (id) => ({ url: `bookings/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Booking']
    }),
  })
})

export const {
  useListBookingsQuery,
  useGetBookingQuery,
  useAddBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation
} = bookingsApi
