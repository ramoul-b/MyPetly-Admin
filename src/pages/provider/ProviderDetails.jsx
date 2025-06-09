import { Box, Typography, Stack, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProviderQuery } from '../../modules/provider/providerApi'
import { useTranslation } from 'react-i18next'
import useProviderServices from '../../modules/providerServices/useProviderServices'
import { Link } from 'react-router-dom'


export default function ProviderDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetProviderQuery(id)
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const { providerServices = [], isLoading: loadingServices } = useProviderServices({ provider_id: id })

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>{t('provider.not_found', 'Not found')}</div>

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Button variant="outlined" onClick={() => nav('/providers')} sx={{ mb: 2 }}>
        {t('button.back', 'Back')}
      </Button>

      <Stack spacing={1} sx={{ background: '#fff', p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600}>
  {data.name?.[i18n.language] || data.name?.en || ''}
</Typography>

        <Typography>{data.email}</Typography>
        <Typography>{data.phone}</Typography>
        <Typography>{data.address}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => nav(`/providers/${id}/edit`)}>
          {t('button.edit', 'Edit')}
        </Button>
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={1}>Services</Typography>
        {loadingServices ? (
          <Typography>Loading...</Typography>
        ) : providerServices.length === 0 ? (
          <Typography color="text.disabled">No services</Typography>
        ) : (
          <Stack spacing={1}>
            {providerServices.map(ps => (
              <Button
                key={ps.id}
                component={Link}
                to={`/provider-services/${ps.id}`}
                variant="outlined"
                size="small"
              >
                {ps.service?.name?.[i18n.language] || ps.service?.name?.en || `Service #${ps.id}`}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}
