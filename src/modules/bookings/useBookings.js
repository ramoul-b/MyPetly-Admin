import { useListBookingsQuery } from './bookingsApi'

export default function useBookings(params) {
  const { data = [], isLoading, error, refetch } = useListBookingsQuery(params)
  return { bookings: data, isLoading, error, refetch }
}
