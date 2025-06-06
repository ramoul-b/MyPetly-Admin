import { Box, Typography, Stack, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProviderQuery } from '../../modules/provider/providerApi'
import { useTranslation } from 'react-i18next'

export default function ProviderDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetProviderQuery(id)
  const { t } = useTranslation()

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>{t('provider.not_found', 'Not found')}</div>

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Button variant="outlined" onClick={() => nav('/providers')} sx={{ mb: 2 }}>
        {t('button.back', 'Back')}
      </Button>

      <Stack spacing={1} sx={{ background: '#fff', p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600}>{data.name}</Typography>
        <Typography>{data.email}</Typography>
        <Typography>{data.phone}</Typography>
        <Typography>{data.address}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => nav(`/providers/${id}/edit`)}>
          {t('button.edit', 'Edit')}
        </Button>
      </Stack>
    </Box>
  )
}
