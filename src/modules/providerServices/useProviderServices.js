import { useListByProviderQuery } from './providerServicesApi'

export default function useProviderServices(providerId) {
  const { data = [], isLoading, error, refetch } = useListByProviderQuery(providerId, { skip: !providerId })
  return { providerServices: data, isLoading, error, refetch }
}
