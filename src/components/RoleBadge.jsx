import { useState } from 'react'
import { Chip, Menu, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setActiveRole } from '../modules/auth/authSlice'
import useAuth from '../modules/auth/useAuth'
import { useTranslation } from 'react-i18next'

export default function RoleBadge () {
  const { roles, activeRole } = useAuth()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [anchor, setAnchor] = useState(null)

  const roleLabel = activeRole || roles[0] || '—'
  const clickable = roles.length > 1

  const handleClick = e => clickable && setAnchor(e.currentTarget)
  const handleSelect = r => { dispatch(setActiveRole(r)); setAnchor(null) }

  return (
    <>
      <Chip
        label={t('roles.' + roleLabel, roleLabel)}
        color="success"
        size="small"
        clickable={clickable}
        onClick={handleClick}
        sx={{
          fontWeight: 600,
          bgcolor: 'rgba(255,255,255,0.11)',
          color: '#fff',
          ml: 1,
          textTransform: 'capitalize'
        }}
      />
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={()=>setAnchor(null)}>
        {roles.map(r => (
          <MenuItem key={r} selected={r === activeRole} onClick={()=>handleSelect(r)}>
            {t('roles.' + r, r)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
