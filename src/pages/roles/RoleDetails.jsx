// src/pages/roles/RoleDetails.jsx
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useGetRoleQuery,
  useListPermissionsQuery,
  useAssignPermissionMutation,
  useRemovePermissionMutation
} from '../../modules/roles/rolesApi'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Switch, Snackbar, Box, CircularProgress, Button
} from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function RoleDetails () {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: role, isLoading: loadingRole } = useGetRoleQuery(id)
  const { data: allPermissions, isLoading: loadingPerms } = useListPermissionsQuery()
  const [assignPermission] = useAssignPermissionMutation()
  const [removePermission] = useRemovePermissionMutation()
  const [feedback, setFeedback] = useState(null)
  const [switchLoading, setSwitchLoading] = useState({})

  // Les permissions attribuées à ce rôle (par id)
  const assignedIds = new Set(role?.permissions?.map(p => p.id))

  const handleToggle = async (permissionId, checked) => {
    setSwitchLoading(prev => ({ ...prev, [permissionId]: true }))
    try {
      if (checked) {
        await assignPermission({ roleId: id, permissionId }).unwrap()
      } else {
        await removePermission({ roleId: id, permissionId }).unwrap()
      }
      setFeedback({ type: 'success', msg: t('role.edit_ok', 'Modification enregistrée !') })
    } catch {
      setFeedback({ type: 'error', msg: t('role.edit_fail', 'Erreur lors de la modification.') })
    } finally {
      setSwitchLoading(prev => ({ ...prev, [permissionId]: false }))
    }
  }

  if (loadingRole || loadingPerms) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }
  if (!role) return <Typography color="error">Rôle introuvable</Typography>

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {role.name}
      </Typography>
      <Typography sx={{ mb: 3, color: '#64748B' }}>
        {t('role.permissions_list', 'Permissions attribuées à ce rôle')}
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('permission.name', 'Permission')}</TableCell>
              <TableCell align="center">{t('role.assigned', 'Attribué')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPermissions?.map((perm) => (
              <TableRow key={perm.id}>
                <TableCell>
                  {perm.name}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={assignedIds.has(perm.id)}
                    onChange={e => handleToggle(perm.id, e.target.checked)}
                    color="primary"
                    disabled={switchLoading[perm.id]}
                  />
                  {switchLoading[perm.id] && <CircularProgress size={20} sx={{ ml: 1 }} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{ mt: 4 }} variant="outlined" onClick={() => window.history.back()}>
        {t('button.back', 'Retour')}
      </Button>

      <Snackbar
        open={!!feedback}
        autoHideDuration={2000}
        onClose={() => setFeedback(null)}
        message={feedback?.msg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
