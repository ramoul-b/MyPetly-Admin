import { useNavigate } from 'react-router-dom'
import {
  useAddProviderMutation,
  useUpdateProviderMutation,
  useGetProviderQuery
} from './providerApi'

export default function useProviderForm(id) {
  const { data } = useGetProviderQuery(id, { skip: !id })
  const [addProvider, addStatus] = useAddProviderMutation()
  const [updateProvider, updateStatus] = useUpdateProviderMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    if (id) {
      await updateProvider({ id, ...values }).unwrap()
    } else {
      await addProvider(values).unwrap()
    }
    nav('/providers')
  }

  const loading = addStatus.isLoading || updateStatus.isLoading

  return { data, submit, loading, addStatus, updateStatus }
}
