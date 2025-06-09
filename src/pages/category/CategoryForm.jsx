import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useCategoryForm from '../../modules/services/useCategoryForm'
import { TextField, Button, Stack, Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function CategoryForm() {
  const { id } = useParams()
  const defaultLangObj = { en: '', fr: '', it: '' }
  const { data, submit, loading } = useCategoryForm(id)
  const { register, handleSubmit, reset } = useForm({ defaultValues: { name: defaultLangObj, color: '', icon: '', ...data } })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)

  React.useEffect(() => { if (data) reset({ name: { ...defaultLangObj, ...data.name }, color: data.color || '', icon: data.icon || '' }) }, [data, reset])

  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      await submit(values)
      setFeedback({ type: 'success', message: t('category.saved', 'Saved!') })
    } catch {
      setFeedback({ type: 'error', message: t('category.save_error', 'Save error') })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto', mt: 4, bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2 }} noValidate>
      <Stack spacing={3}>
        <Typography variant="h5" align="center" fontWeight={600}>
          {id ? t('category.edit_title', 'Edit category') : t('category.create_title', 'New category')}
        </Typography>
        <TextField label={t('category.name_en', 'Name (EN)')} {...register('name.en')} fullWidth />
        <TextField label={t('category.name_fr', 'Name (FR)')} {...register('name.fr')} fullWidth />
        <TextField label={t('category.name_it', 'Name (IT)')} {...register('name.it')} fullWidth />
        <TextField label={t('category.icon', 'Icon')} {...register('icon')} fullWidth />
        <TextField label={t('category.color', 'Color')} {...register('color')} fullWidth />
        {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}
        <Button variant="contained" size="large" type="submit" disabled={loading} sx={{ fontWeight: 600 }}>
          {loading ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />{t('button.saving', 'Saving...')}</> : t('button.save', 'Save')}
        </Button>
      </Stack>
    </Box>
  )
}
