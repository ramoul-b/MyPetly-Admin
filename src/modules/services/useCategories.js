import { useListCategoriesQuery } from './categoriesApi'

export default function useCategories(params) {
  const { data = [], isLoading, error, refetch } = useListCategoriesQuery(params)
  return { categories: data, isLoading, error, refetch }
}
