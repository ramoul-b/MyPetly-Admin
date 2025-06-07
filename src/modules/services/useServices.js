import { useListServicesQuery } from './servicesApi'

export default function useServices(params) {
  const { data = [], isLoading, error, refetch } = useListServicesQuery(params)
  return { services: data, isLoading, error, refetch }
}
