import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../auth/useAuth'
import {
  useGetProviderServiceQuery,
  useUpdateProviderServiceMutation,
  useDeleteProviderServiceMutation
} from './providerServicesApi'

export default function useProviderService(id) {
  const nav = useNavigate()
  const { user } = useAuth()
  const { data, ...query } = useGetProviderServiceQuery(id, { skip: !id })
  const [updateProviderService, updateStatus] = useUpdateProviderServiceMutation()
  const [deleteProviderService, deleteStatus] = useDeleteProviderServiceMutation()

  useEffect(() => {
    if (data && user && data.provider_id !== user.provider_id) {
      nav('/403', { replace: true })
    }
  }, [data, user, nav])

  const validate = () => {
    if (data && user && data.provider_id !== user.provider_id) {
      nav('/403', { replace: true })
      return false
    }
    return true
  }

  const update = async (values) => {
    if (!validate()) return
    await updateProviderService({ id, ...values }).unwrap()
  }

  const remove = async () => {
    if (!validate()) return
    await deleteProviderService(id).unwrap()
  }

  const loading = updateStatus.isLoading || deleteStatus.isLoading

  return { data, ...query, update, remove, loading, updateStatus, deleteStatus }
}
