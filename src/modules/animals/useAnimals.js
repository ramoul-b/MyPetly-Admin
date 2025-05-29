import { useListAnimalsQuery } from './animalsApi'

export default function useAnimals() {
  const { data = [], isLoading, error, refetch } = useListAnimalsQuery()
  return { animals: data, isLoading, error, refetch }
}
