import { Outlet, Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Drawer, List, Box } from '@mui/material'
import SidebarItem from '../components/SidebarItem'
import LangSwitch from '../components/LangSwitch'

const drawerWidth = 220
const menu = [
  { label: 'Dashboard', path: '/' },
  { label: 'Animals',   path: '/animals' }
]

export default function MainLayout () {
  const { pathname } = useLocation()

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer */}
      <Drawer variant="permanent" sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
      }}>
        <Toolbar />
        <List>
          {menu.map(item => (
            <SidebarItem key={item.path} item={item} active={pathname === item.path} />
          ))}
        </List>
      </Drawer>

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component={Link} to="/" color="inherit" sx={{ textDecoration:'none' }}>
            MyPetly Admin
          </Typography>
          <LangSwitch />
        </Toolbar>
      </AppBar>

      {/* Contenu */}
      <Box component="main" sx={{ flexGrow:1, p:3, mt:8 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
