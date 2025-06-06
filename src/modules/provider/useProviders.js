import { useListProvidersQuery } from './providerApi'

export default function useProviders() {
  const { data = [], isLoading, error, refetch } = useListProvidersQuery()
  return { providers: data, isLoading, error, refetch }
}
