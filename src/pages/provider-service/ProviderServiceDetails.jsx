import { Box, Typography, Stack, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProviderServiceQuery } from '../../modules/providerServices/providerServicesApi'

export default function ProviderServiceDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetProviderServiceQuery(id)

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Not found</div>

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Button variant="outlined" onClick={() => nav('/provider-services')} sx={{ mb: 2 }}>
        Back
      </Button>

      <Stack spacing={1} sx={{ background: '#fff', p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600}>Provider Service #{data.id}</Typography>
        <Typography>Provider: {data.provider_id}</Typography>
        <Typography>Service: {data.service_id}</Typography>
        <Typography>Price: {data.price}</Typography>
        <Typography>Duration: {data.duration}</Typography>
        <Typography>Available: {String(data.available)}</Typography>
        <Typography>Description: {data.description}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => nav(`/provider-services/${id}/edit`)}>
          Edit
        </Button>
      </Stack>
    </Box>
  )
}
