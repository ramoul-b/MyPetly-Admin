import { useListPermissionsQuery } from './rolesApi'

export default function usePermissions() {
  const { data = [], isLoading, error, refetch } = useListPermissionsQuery()
  return { permissions: data, isLoading, error, refetch }
}
