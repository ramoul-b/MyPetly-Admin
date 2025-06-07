import { Box, Typography, Stack, FormControlLabel, Switch, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetRoleQuery, useListPermissionsQuery, useAssignPermissionMutation, useRemovePermissionMutation } from '../../modules/roles/rolesApi'
import { useTranslation } from 'react-i18next'

export default function RoleDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const { t } = useTranslation()
  const { data: role, isLoading } = useGetRoleQuery(id)
  const { permissions = [] } = useListPermissionsQuery(undefined, { selectFromResult: ({ data }) => ({ permissions: data }) })
  const [assign] = useAssignPermissionMutation()
  const [remove] = useRemovePermissionMutation()

  if (isLoading) return <div>Loading...</div>
  if (!role) return <div>{t('role.not_found', 'Role not found')}</div>

  const toggle = async (permId, checked) => {
    if (checked) await assign({ roleId: id, permissionId: permId })
    else await remove({ roleId: id, permissionId: permId })
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>{role.name}</Typography>
      <Stack spacing={1}>
        {permissions.map(p => (
          <FormControlLabel
            key={p.id}
            control={<Switch
              checked={role.permissions?.includes(p.name)}
              onChange={e => toggle(p.id, e.target.checked)}
            />}
            label={p.name}
          />
        ))}
      </Stack>
      <Button sx={{ mt: 3 }} variant="contained" onClick={() => nav(`/roles/${id}/edit`)}>
        {t('button.edit', 'Edit')}
      </Button>
    </Box>
  )
}
