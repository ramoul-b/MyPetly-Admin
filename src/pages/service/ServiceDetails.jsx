import { Box, Typography, Stack, Button, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetServiceQuery } from '../../modules/services/servicesApi'
import { useTranslation } from 'react-i18next'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

export default function ServiceDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetServiceQuery(id)
  const { t, i18n } = useTranslation()

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>{t('service.not_found', 'Service not found')}</div>

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4, mb: 6 }}>
      <Button variant="outlined" onClick={() => nav('/services')} sx={{ mb: 2 }}>
        {t('button.back', 'Back')}
      </Button>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {data.name?.[i18n.language] || data.name?.en}
        </Typography>

        <Stack spacing={1} mt={2}>
          <Typography>{data.description?.[i18n.language] || data.description?.en}</Typography>
          <Typography>
            {t('service.active', 'Active')}: {data.active ? (
              <CheckCircleRoundedIcon color="success" sx={{ verticalAlign: 'middle' }} />
            ) : (
              <CancelRoundedIcon color="disabled" sx={{ verticalAlign: 'middle' }} />
            )}
          </Typography>

        </Stack>
      </Paper>
      <Button
        variant="contained"
        onClick={() => nav(`/services/${id}/edit`)}
        sx={{ mt: 4, minWidth: 160, fontWeight: 700, fontSize: 16 }}
      >
        {t('button.edit', 'Edit')}
      </Button>
    </Box>
  )
}
