import { api } from '../api'

export const bookingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (params) => ({ url: '/bookings', params }),
    }),
    getBooking: builder.query({
      query: (id) => `/bookings/${id}`,
    }),
    createBooking: builder.mutation({
      query: (data) => ({ url: '/bookings', method: 'POST', body: data }),
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/bookings/${id}`, method: 'PUT', body: data }),
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({ url: `/bookings/${id}`, method: 'DELETE' }),
    }),
  }),
})

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi
