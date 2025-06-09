import { useNavigate } from 'react-router-dom'
import {
  useAddProviderServiceMutation,
  useUpdateProviderServiceMutation,
  useGetProviderServiceQuery
} from './providerServicesApi'

export default function useProviderServiceForm(id) {
  const { data } = useGetProviderServiceQuery(id, { skip: !id })
  const [addProviderService, addStatus] = useAddProviderServiceMutation()
  const [updateProviderService, updateStatus] = useUpdateProviderServiceMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    if (id) {
      await updateProviderService({ id, ...values }).unwrap()
    } else {
      await addProviderService(values).unwrap()
    }
    nav('/provider-services')
  }

  const loading = addStatus.isLoading || updateStatus.isLoading

  return { data, submit, loading, addStatus, updateStatus }
}
