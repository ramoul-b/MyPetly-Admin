import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useServiceForm from '../../modules/services/useServiceForm'
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Switch from '@mui/material/Switch'

export default function ServiceForm () {
  
  const { id } = useParams()
  const defaultLangObj = { en: '', fr: '', it: '' }
  const { data, submit, loading } = useServiceForm(id)
  console.log('data ServiceForm:', data)

  const defaultValues = {
    name: { ...defaultLangObj, ...data?.name },
    description: { ...defaultLangObj, ...data?.description },
    active: data?.active ?? true
  }
  const { register, handleSubmit, setValue, watch, reset } = useForm({ defaultValues })

  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)

  React.useEffect(() => {
    if (data) {
      reset({
        name: { ...defaultLangObj, ...data.name },
        description: { ...defaultLangObj, ...data.description },
        active: data.active // ← correction ici
      })
    }
  }, [data, reset])



  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      await submit(values)
      setFeedback({ type: 'success', message: t('service.saved', 'Saved!') })
    } catch (error) {
      console.error(error)
      setFeedback({ type: 'error', message: t('service.save_error', 'Save error') })
    }
  }

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
        minHeight: 400
      }}
      noValidate
    >
      <Stack spacing={3}>
        <Typography variant="h5" align="center" fontWeight={600} sx={{ mt: 1, mb: 1 }}>
          {id ? t('service.edit_title', 'Edit service') : t('service.create_title', 'New service')}
        </Typography>

        <TextField label={t('service.label_en', 'Name (EN)')} {...register('name.en')} fullWidth />
        <TextField label={t('service.label_fr', 'Name (FR)')} {...register('name.fr')} fullWidth />
        <TextField label={t('service.label_it', 'Name (IT)')} {...register('name.it')} fullWidth />

        <TextField
          label={t('service.desc_en', 'Description (EN)')}
          {...register('description.en')}
          fullWidth
          multiline
          minRows={3}
        />
        <TextField
          label={t('service.desc_fr', 'Description (FR)')}
          {...register('description.fr')}
          fullWidth
          multiline
          minRows={3}
        />
        <TextField
          label={t('service.desc_it', 'Description (IT)')}
          {...register('description.it')}
          fullWidth
          multiline
          minRows={3}
        />

        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={!!watch('active')}
              onChange={e => setValue('active', e.target.checked)}
            />
          }
          label={t('service.active', 'Active')}
        />
        {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}

        <Button variant="contained" size="large" type="submit" disabled={loading} sx={{ fontWeight: 600 }}>
          {loading ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />{t('button.saving', 'Saving...')}</> : t('button.save', 'Save')}
        </Button>
      </Stack>
    </Box>
  )
}
