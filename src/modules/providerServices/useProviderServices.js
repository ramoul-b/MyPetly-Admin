import { useListProviderServicesQuery } from './providerServicesApi'

export default function useProviderServices(params) {
  const { data = [], isLoading, error, refetch } = useListProviderServicesQuery(params)
  return { providerServices: data, isLoading, error, refetch }
}
