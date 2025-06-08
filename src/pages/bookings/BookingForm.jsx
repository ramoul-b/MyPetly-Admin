import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useBookingForm from '../../modules/bookings/useBookingForm'
import {
  TextField, Button, Stack, MenuItem, Box, Typography, CircularProgress, Alert
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function BookingForm() {
  const { id } = useParams()
  const { data, submit, addStatus, updateStatus } = useBookingForm(id)
  const { register, handleSubmit, reset, formState } = useForm({ defaultValues: data })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      await submit(values)
      setFeedback({ type: 'success', message: t('booking.saved', 'Réservation enregistrée !') })
    } catch {
      setFeedback({ type: 'error', message: t('booking.save_error', 'Erreur lors de l\'enregistrement') })
    }
  }

  const loading = addStatus?.isLoading || updateStatus?.isLoading

  return (
    <Box component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        bgcolor: '#fff',
        p: 4,
        borderRadius: 3,
        boxShadow: 2,
        minHeight: 480
      }}
      noValidate
    >
      <Stack spacing={3}>
        <Typography variant="h5" align="center" fontWeight={600} sx={{ mt: 1, mb: 1 }}>
          {id
            ? t('booking.edit_title', 'Modifier une réservation')
            : t('booking.add_title', 'Ajouter une réservation')
          }
        </Typography>
        <TextField
          label={t('booking.service', 'Service ID')}
          {...register('service_id', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.service_id}
        />
        <TextField
          label={t('booking.provider', 'Provider ID')}
          {...register('provider_id', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.provider_id}
        />
        <TextField
          label={t('booking.animal', 'Animal ID')}
          {...register('animal_id', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.animal_id}
        />
        <TextField
          label={t('booking.date', 'Date')}
          {...register('appointment_date', { required: true })}
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.appointment_date}
        />
        <TextField
          label={t('booking.time', 'Heure')}
          {...register('time', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.time}
        />
        <TextField
          label={t('booking.payment_intent', 'Intent de paiement')}
          {...register('payment_intent', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.payment_intent}
        />
        <TextField
          label={t('booking.currency', 'Devise')}
          {...register('currency', { required: true })}
          select
          fullWidth
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="eur">EUR</MenuItem>
          <MenuItem value="usd">USD</MenuItem>
        </TextField>

        {/* Feedback / Loader */}
        {feedback &&
          <Alert severity={feedback.type} sx={{ mt: 1, mb: 1 }}>
            {feedback.message}
          </Alert>
        }

        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
          sx={{ fontWeight: 600, mt: 1 }}
        >
          {loading
            ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} /> {t('button.saving', 'Enregistrement...')}</>
            : t('button.save', 'Enregistrer')}
        </Button>
      </Stack>
    </Box>
  )
}
