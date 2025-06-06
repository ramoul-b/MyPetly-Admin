import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useProviderForm from '../../modules/provider/useProviderForm'
import { TextField, Button, Stack, Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PhotoUploader from '../../components/PhotoUploader'
import { useUploadProviderImageMutation } from '../../modules/provider/providerApi'

export default function ProviderForm() {
  const { id } = useParams()
  const { data, submit, loading } = useProviderForm(id)
  const { register, handleSubmit, reset, setValue, watch, formState } = useForm({ defaultValues: data })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)
  const [uploadImage] = useUploadProviderImageMutation()

  React.useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      await submit(values)
      if (values.logo instanceof File || values.logo instanceof Blob) {
        const res = await uploadImage({ id, file: values.logo }).unwrap()
        if (res.logo) setValue('logo', res.logo)
      }
      setFeedback({ type: 'success', message: t('provider.saved', 'Saved!') })
    } catch (err) {
      setFeedback({ type: 'error', message: t('provider.save_error', 'Save error') })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        bgcolor: '#fff',
        p: 4,
        borderRadius: 3,
        boxShadow: 2,
        minHeight: 400
      }}
      noValidate
    >
      <Stack spacing={3}>
        <PhotoUploader
          value={watch('logo') || data?.logo}
          onChange={file => setValue('logo', file)}
        />

        <Typography variant="h5" align="center" fontWeight={600} sx={{ mt: 1, mb: 1 }}>
          {id ? t('provider.edit_title', 'Edit provider') : t('provider.create_title', 'New provider')}
        </Typography>

        <TextField
          label={t('provider.name', 'Name')}
          {...register('name', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.name}
        />
        <TextField
          label={t('provider.email', 'Email')}
          {...register('email')}
          fullWidth
          type="email"
        />
        <TextField label={t('provider.phone', 'Phone')} {...register('phone')} fullWidth />
        <TextField label={t('provider.address', 'Address')} {...register('address')} fullWidth />

        {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}

        <Button variant="contained" size="large" type="submit" disabled={loading} sx={{ fontWeight: 600 }}>
          {loading ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />{t('button.saving', 'Saving...')}</> : t('button.save', 'Save')}
        </Button>
      </Stack>
    </Box>
  )
}
