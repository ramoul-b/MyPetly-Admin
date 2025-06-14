import { Box, Typography, Stack, Button, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import useProviderService from '../../modules/providerServices/useProviderService'
import ProviderServiceForm from './ProviderServiceForm'
import useAuth from '../../modules/auth/useAuth'

export default function ProviderServiceDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading, remove } = useProviderService(id)
  const { t, i18n } = useTranslation()
  const { can } = useAuth()
  const [editing, setEditing] = useState(false)

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>{t('provider_service.not_found', 'Not found')}</div>

  const handleDelete = async () => {
    if (window.confirm(t('confirm_delete', 'Confirm deletion?'))) {
      await remove()
      nav('/services')
    }
  }

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4, mb: 6 }}>
      <Button variant="outlined" onClick={() => nav('/services')} sx={{ mb: 2 }}>
        {t('button.back', 'Back')}
      </Button>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {data.service?.name?.[i18n.language] || data.service?.name?.en || ''}
        </Typography>
        <Stack spacing={1} mt={2}>
          <Typography>
            {t('provider_service.price', 'Price')}: {data.price}
          </Typography>
          <Typography>
            {t('provider_service.duration', 'Duration')}: {data.duration}
          </Typography>
          <Typography>
            {t('provider_service.available', 'Available')}: {data.available ? (
              <CheckCircleRoundedIcon color="success" sx={{ verticalAlign: 'middle' }} />
            ) : (
              <CancelRoundedIcon color="disabled" sx={{ verticalAlign: 'middle' }} />
            )}
          </Typography>
        </Stack>
      </Paper>
      {can('edit_own_provider_service') && (
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => setEditing(true)}
          sx={{ mt: 4, mr: 2, minWidth: 160, fontWeight: 700, fontSize: 16 }}
        >
          {t('button.edit', 'Edit')}
        </Button>
      )}
      {can('delete_own_provider_service') && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ mt: 4, minWidth: 160, fontWeight: 700, fontSize: 16 }}
        >
          {t('button.delete', 'Delete')}
        </Button>
      )}
      {editing && (
        <ProviderServiceForm
          open={editing}
          initial={data}
          onClose={(saved) => {
            setEditing(false)
            if (saved) nav(0)
          }}
        />
      )}
    </Box>
  )
}
