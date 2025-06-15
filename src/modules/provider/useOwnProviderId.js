import useAuth from '../auth/useAuth'
import { useListProvidersQuery } from './providerApi'

export default function useOwnProviderId() {
  const { user } = useAuth()
  const { data: providers = [] } = useListProvidersQuery(undefined, { skip: !user || user.provider_id })
  if (!user) return null
  if (user.provider_id) return user.provider_id
  const provider = providers.find(p => p.user_id === user.id)
  return provider ? provider.id : null
}
