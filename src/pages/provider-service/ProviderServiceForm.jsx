import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useProviderServiceForm from '../../modules/providerServices/useProviderServiceForm'
import useProviders from '../../modules/provider/useProviders'
import useServices from '../../modules/services/useServices'
import { TextField, Button, Stack, Box, Typography, CircularProgress, Alert, MenuItem, Switch, FormControlLabel } from '@mui/material'
import { useParams } from 'react-router-dom'

export default function ProviderServiceForm() {
  const { id } = useParams()
  const { data, submit, loading } = useProviderServiceForm(id)
  const { providers } = useProviders()
  const { services } = useServices()
  const { register, handleSubmit, reset, setValue, watch } = useForm({ defaultValues: { provider_id: '', service_id: '', price: '', description: '', duration: '', available: true } })
  const [feedback, setFeedback] = useState(null)

  useEffect(() => { if (data) reset({ ...data }) }, [data, reset])

  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      await submit(values)
      setFeedback({ type: 'success', message: 'Saved!' })
    } catch {
      setFeedback({ type: 'error', message: 'Save error' })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto', mt: 4, bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2 }} noValidate>
      <Stack spacing={3}>
        <Typography variant="h5" align="center" fontWeight={600}>
          {id ? 'Edit provider service' : 'New provider service'}
        </Typography>
        <TextField select label="Provider" {...register('provider_id')} fullWidth>
          {providers.map(p => <MenuItem key={p.id} value={p.id}>{typeof p.name === 'object' ? p.name.en || Object.values(p.name)[0] : p.name}</MenuItem>)}
        </TextField>
        <TextField select label="Service" {...register('service_id')} fullWidth>
          {services.map(s => <MenuItem key={s.id} value={s.id}>{typeof s.name === 'object' ? s.name.en || Object.values(s.name)[0] : s.name}</MenuItem>)}
        </TextField>
        <TextField label="Price" type="number" {...register('price')} fullWidth />
        <TextField label="Description" {...register('description')} fullWidth multiline minRows={3} />
        <TextField label="Duration" type="number" {...register('duration')} fullWidth />
        <FormControlLabel control={<Switch checked={!!watch('available')} onChange={e => setValue('available', e.target.checked)} />} label="Available" />
        {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}
        <Button variant="contained" size="large" type="submit" disabled={loading} sx={{ fontWeight: 600 }}>
          {loading ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />Saving...</> : 'Save'}
        </Button>
      </Stack>
    </Box>
  )
}
