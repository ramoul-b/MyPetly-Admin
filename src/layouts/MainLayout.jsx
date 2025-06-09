import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, Box, IconButton, CssBaseline, Stack, Tooltip, alpha, Avatar, Menu, MenuItem
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PetsIcon from '@mui/icons-material/Pets'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LangSwitch from '../components/LangSwitch'
import RoleBadge from '../components/RoleBadge'
import { useTranslation } from 'react-i18next'
import logout from '../modules/auth/logout'
import useAuth from '../modules/auth/useAuth'
import LogoMyPetly from '../assets/LogoMyPetly.png'
import PeopleIcon from '@mui/icons-material/People'
import BusinessIcon from '@mui/icons-material/Business'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import ScheduleIcon from '@mui/icons-material/Schedule'
import CategoryIcon from '@mui/icons-material/Category'

const drawerWidth = 220

const menu = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Animals', path: '/animals', icon: <PetsIcon /> },
  { label: 'Users', path: '/users', icon: <PeopleIcon /> },
  { label: 'Providers', path: '/providers', icon: <BusinessIcon /> },
  { label: 'Services', path: '/services', icon: <MiscellaneousServicesIcon /> },
  { label: 'Categories', path: '/categories', icon: <CategoryIcon /> },
  { label: 'Roles', path: '/roles', icon: <PeopleIcon /> },
  { label: 'Permissions', path: '/permissions', icon: <BusinessIcon /> },
  { label: 'Bookings', path: '/bookings', icon: <ScheduleIcon /> }
]


export default function MainLayout() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { user } = useAuth()
  const [anchor, setAnchor] = useState(null)
const pageTitles = {
  '/': t('page.dashboard', 'Dashboard'),
  '/animals': t('page.animals', 'Animals'),
  '/providers': t('page.providers', 'Providers'),
  '/services': t('page.services', 'Services'),
  '/categories': t('page.categories', 'Categories'),
  '/users': t('page.users', 'Users'),
  '/roles': t('page.roles', 'Roles'),
  '/permissions': t('page.permissions', 'Permissions'),
  '/bookings': t('page.bookings', 'Bookings'),
}

const pageTitle = pageTitles[pathname] || 'MyPetly Admin'


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <CssBaseline />

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 0,
            background: '#fff',
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            boxShadow: '2px 0 8px 0 #e6e8f0',
          }
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
          <img src={LogoMyPetly} alt="Logo" width="100%" />
        </Toolbar>
        <List sx={{ mt: 2 }}>
          {menu.map(m => (
            <ListItemButton
              key={m.path}
              component={Link}
              to={m.path}
              selected={pathname === m.path}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 1,
                '&.Mui-selected': {
                  background: theme => alpha(theme.palette.primary.main, 0.12),
                  color: 'primary.main',
                  fontWeight: 600,
                  '& .MuiListItemIcon-root': { color: 'primary.main' }
                }
              }}
            >
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText primary={m.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: '#2475c2',
          color: '#fff',
          boxShadow: '0 2px 8px 0 #e2e8f0'
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: 3, display: 'flex' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: '#fff',
              letterSpacing: 1,
              textDecoration: 'none',
              mr: 3
            }}
          >
            {pageTitle}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title={t('button.language')} placement="left">
              <Box><LangSwitch /></Box>
            </Tooltip>
            <RoleBadge />
            <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ p: 0 }}>
              <Avatar src={user?.photo} />
            </IconButton>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
              <MenuItem component={Link} to="/profile" onClick={() => setAnchor(null)}>
                {t('button.profile')}
              </MenuItem>
              <MenuItem onClick={logout}>{t('button.logout')}</MenuItem>
            </Menu>
            <Tooltip title={t('button.profile')}>
              <IconButton
                color="inherit"
                component={Link}
                to="/profile"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.09)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.20)' },
                  boxShadow: 0
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('button.logout')}>
  <IconButton
    color="inherit"
    sx={{
      bgcolor: 'rgba(255,255,255,0.09)',
      '&:hover': { bgcolor: 'rgba(255,255,255,0.20)' },
      boxShadow: 0
    }}
    onClick={logout}
  >
    <LogoutIcon />
  </IconButton>
</Tooltip>

          </Stack>
        </Toolbar>
      </AppBar>

      {/* Contenu */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, background: '#f8fafc', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
