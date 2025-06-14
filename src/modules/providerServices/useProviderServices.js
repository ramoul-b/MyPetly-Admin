import {
  useListProviderServicesQuery,
  useListByProviderQuery
} from './providerServicesApi'

export default function useProviderServices(providerId) {
  const listByProvider = useListByProviderQuery(providerId, { skip: !providerId })
  const listMine = useListProviderServicesQuery(undefined, { skip: !!providerId })

  const { data = [], isLoading, error, refetch } =
    providerId ? listByProvider : listMine

  return { providerServices: data, isLoading, error, refetch }
}
