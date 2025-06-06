import { useListUsersQuery } from './usersApi'

export default function useUsers() {
  const { data = [], isLoading, error, refetch } = useListUsersQuery()
  return { users: data, isLoading, error, refetch }
}
