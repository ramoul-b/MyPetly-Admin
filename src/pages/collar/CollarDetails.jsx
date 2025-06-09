import { Box, Typography, Stack, Button, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCollarQuery } from '../../modules/collars/collarsApi'

export default function CollarDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetCollarQuery(id)

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Collar not found</div>

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4, mb: 6 }}>
      <Button variant="outlined" onClick={() => nav('/collars')} sx={{ mb: 2 }}>
        Back
      </Button>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Collar #{data.id}
        </Typography>
        <Stack spacing={1}>
          <Typography><b>NFC ID:</b> {data.nfc_id || '--'}</Typography>
          <Typography><b>QR Code:</b> {data.qr_code_url || '--'}</Typography>
          <Typography><b>Animal ID:</b> {data.animal_id}</Typography>
        </Stack>
      </Paper>
      <Button
        variant="contained"
        onClick={() => nav(`/collars/${id}/edit`)}
        sx={{ mt: 4, minWidth: 160, fontWeight: 700, fontSize: 16 }}
      >
        Edit
      </Button>
    </Box>
  )
}
