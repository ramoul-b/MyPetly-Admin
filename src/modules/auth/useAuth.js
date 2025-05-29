import { useSelector } from 'react-redux'
import { selectUser, selectRoles, selectPerms, selectActiveRole } from './authSlice'
import { useCallback } from 'react'

export default function useAuth () {
  const user  = useSelector(selectUser)
  const roles = useSelector(selectRoles)
  const perms = useSelector(selectPerms)
  const active = useSelector(selectActiveRole)

  /* fonctions MEMOISÉES → plus de boucle */
  const is  = useCallback(r => roles.includes(r), [roles])
  const can = useCallback(p => perms.includes(p), [perms])

  return { user, roles, perms, activeRole:active, is, can }
}
