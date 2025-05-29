import { NavLink } from 'react-router-dom'
import useAuth from '../modules/auth/useAuth'
import { ListItem, ListItemText } from '@mui/material'

export default function SidebarItem ({ item, roles = [] }) {
  const { roles: myRoles } = useAuth()

  /* filtre sans fonction “is()” */
  if (roles.length && !roles.some(r => myRoles.includes(r))) return null

  return (
    <ListItem component={NavLink} to={item.path} sx={{ textDecoration:'none' }}>
      <ListItemText primary={item.label} />
    </ListItem>
  )
}
