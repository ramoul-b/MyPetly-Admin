import { ListItem, ListItemText, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'

export default function SidebarItem ({ item, active }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={item.path}
        selected={active}
      >
        <ListItemText primary={item.label} />
      </ListItemButton>
    </ListItem>
  )
}
