import {
  Box, Typography, Chip, Stack, Divider, Button, Grid, Paper
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetBookingQuery } from '../../modules/bookings/bookingsApi'

export default function BookingDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetBookingQuery(id)

  if (isLoading) return <div>Chargement…</div>
  if (!data) return <div>Réservation introuvable</div>

  const booking = data

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4, mb: 6 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => nav('/bookings')}
        sx={{ mb: 2 }}
      >
        Retour
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700}>
              {booking.animal_name} / {booking.service_name}
            </Typography>
            <Stack direction="row" spacing={1} mt={1} mb={2}>
              <Chip
                label={booking.payment_status === 'paid' ? 'Payé' : booking.payment_status}
                color={booking.payment_status === 'paid' ? 'success' : 'warning'}
                size="small"
              />
              <Chip
                label={booking.status || 'N/A'}
                color={booking.status === 'confirmed' ? 'success' : 'warning'}
                size="small"
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><b>Date :</b> {booking.appointment_date}</Typography>
                <Typography><b>Heure :</b> {booking.time}</Typography>
                <Typography><b>Animal :</b> {booking.animal_name}</Typography>
                <Typography><b>Utilisateur :</b> {booking.user_name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><b>ID :</b> {booking.id}</Typography>
                <Typography><b>Service :</b> {booking.service_name}</Typography>
                <Typography><b>Provider :</b> {booking.provider_name}</Typography>
                <Typography><b>Intent paiement :</b> {booking.payment_intent}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>

      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => nav(`/bookings/${id}/edit`)}
        sx={{ mt: 4, minWidth: 160, fontWeight: 700, fontSize: 16 }}
      >
        Modifier
      </Button>
    </Box>
  )
}
