import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useCollarForm from '../../modules/collars/useCollarForm'
import useAnimals from '../../modules/animals/useAnimals'
import { TextField, Button, Stack, Box, Typography, CircularProgress, Alert, MenuItem } from '@mui/material'
import { useParams } from 'react-router-dom'

export default function CollarForm() {
  const { id } = useParams()
  const { data, submit, loading } = useCollarForm(id)
  const { animals } = useAnimals()
  const { register, handleSubmit, reset } = useForm({ defaultValues: { nfc_id: '', animal_id: '' } })
  const [feedback, setFeedback] = useState(null)

  useEffect(() => { if (data) reset({ nfc_id: data.nfc_id || '', animal_id: data.animal_id }) }, [data, reset])

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
          {id ? 'Edit collar' : 'New collar'}
        </Typography>
        <TextField label="NFC ID" {...register('nfc_id')} fullWidth />
        <TextField select label="Animal" {...register('animal_id')} fullWidth>
          {animals.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
        </TextField>
        {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}
        <Button variant="contained" size="large" type="submit" disabled={loading} sx={{ fontWeight: 600 }}>
          {loading ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />Saving...</> : 'Save'}
        </Button>
      </Stack>
    </Box>
  )
}
