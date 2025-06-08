import { useListBookingsQuery } from './bookingsApi'

export default function useBookings() {
  const { data = [], isLoading, error, refetch } = useListBookingsQuery()
  return { bookings: data, isLoading, error, refetch }
}
