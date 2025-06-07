import { useListRolesQuery } from './rolesApi'

export default function useRoles() {
  const { data = [], isLoading, error, refetch } = useListRolesQuery()
  return { roles: data, isLoading, error, refetch }
}
