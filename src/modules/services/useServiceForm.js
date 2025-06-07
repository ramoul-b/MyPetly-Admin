import { useNavigate } from 'react-router-dom'
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
  useGetServiceQuery,
  useAssignProvidersMutation,
  useRemoveProviderMutation
} from './servicesApi'

export default function useServiceForm(id) {
  const { data } = useGetServiceQuery(id, { skip: !id })
  const [addService, addStatus] = useAddServiceMutation()
  const [updateService, updateStatus] = useUpdateServiceMutation()
  const [assignProviders] = useAssignProvidersMutation()
  const [removeProvider] = useRemoveProviderMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    let savedId = id
    if (id) {
      await updateService({ id, ...values }).unwrap()
    } else {
      const res = await addService(values).unwrap()
      savedId = res?.id || res?.service?.id
    }
    nav('/services/' + savedId)
  }

  const assign = async (serviceId, providers) => {
    await assignProviders({ id: serviceId, providers }).unwrap()
  }

  const unassign = async (serviceId, providerId) => {
    await removeProvider({ id: serviceId, providerId }).unwrap()
  }

  const loading = addStatus.isLoading || updateStatus.isLoading

  return { data, submit, assign, unassign, loading, addStatus, updateStatus }
}
