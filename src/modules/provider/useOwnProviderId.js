import useAuth from '../auth/useAuth'
import { useListProvidersQuery, useGetProviderByUserQuery } from './providerApi'

export default function useOwnProviderId() {
  const { user, is } = useAuth()
  const isAdmin = is('admin') || is('super_admin')
  const { data: providerData } = useGetProviderByUserQuery(user?.id, {
    skip: !user || user.provider_id || isAdmin
  })
  const { data: providers = [] } = useListProvidersQuery(undefined, {
    skip: !user || user.provider_id || !isAdmin
  })
  if (!user) return null
  if (user.provider_id) return user.provider_id
  if (!isAdmin) return providerData ? providerData.id : null
  const provider = providers.find(p => p.user_id === user.id)
  return provider ? provider.id : null
}
