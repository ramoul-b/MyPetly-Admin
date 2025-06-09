import {
  useAddCollarMutation,
  useUpdateCollarMutation,
  useGetCollarQuery
} from './collarsApi'
import { useNavigate } from 'react-router-dom'

export default function useCollarForm(id) {
  const { data } = useGetCollarQuery(id, { skip: !id })
  const [addCollar, addStatus] = useAddCollarMutation()
  const [updateCollar, updateStatus] = useUpdateCollarMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    if (id) {
      await updateCollar({ id, ...values }).unwrap()
      nav(`/collars/${id}`)
    } else {
      await addCollar(values).unwrap()
      nav('/collars')
    }
  }

  return { data, submit, loading: addStatus.isLoading || updateStatus.isLoading }
}
