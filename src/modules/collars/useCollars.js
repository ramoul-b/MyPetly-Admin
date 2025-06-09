import { useListCollarsQuery } from './collarsApi'

export default function useCollars(params) {
  const { data = [], isLoading, error, refetch } = useListCollarsQuery(params)
  return { collars: data, isLoading, error, refetch }
}
