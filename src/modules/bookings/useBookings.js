import { useGetBookingsQuery } from './bookingsApi'

export default function useBookings(filters = {}) {
  const { data, error, isLoading } = useGetBookingsQuery(filters)
  return {
    bookings: data?.data || [],
    loading: isLoading,
    error,
  }
}
