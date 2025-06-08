import {
  useAddBookingMutation,
  useUpdateBookingMutation,
  useGetBookingQuery
} from './bookingsApi'
import { useNavigate } from 'react-router-dom'

export default function useBookingForm(id) {
  const { data } = useGetBookingQuery(id, { skip: !id })
  const [addBooking, addStatus] = useAddBookingMutation()
  const [updateBooking, updateStatus] = useUpdateBookingMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    let savedId = id
    if (id) {
      await updateBooking({ id, ...values }).unwrap()
    } else {
      const res = await addBooking(values).unwrap()
      savedId = res?.id || res?.booking?.id
    }
    nav(`/bookings/${savedId}`)
  }

  return { data, submit, addStatus, updateStatus }
}
