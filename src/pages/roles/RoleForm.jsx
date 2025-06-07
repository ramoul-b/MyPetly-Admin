import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useRoleForm from '../../modules/roles/useRoleForm'
import { TextField, Button, Stack, Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function RoleForm() {
  const { id } = useParams()
  const { data, submit, loading } = useRoleForm(id)
  const { register, handleSubmit, reset, formState } = useForm({ defaultValues: data })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)

  React.useEffect(() => { if (data) reset(data) }, [data, reset])

  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      await submit(values)
      setFeedback({ type: 'success', message: t('role.saved', 'Saved!') })
    } catch {
      setFeedback({ type: 'error', message: t('role.save_error', 'Save error') })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4, bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2 }}
      noValidate
    >
      <Stack spacing={3}>
        <Typography variant="h5" align="center" fontWeight={600}>
          {id ? t('role.edit_title', 'Edit role') : t('role.create_title', 'New role')}
        </Typography>
        <TextField
          label={t('role.name', 'Name')}
          {...register('name', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.name}
        />
        {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}
        <Button variant="contained" size="large" type="submit" disabled={loading} sx={{ fontWeight: 600 }}>
          {loading ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />{t('button.saving', 'Saving...')}</> : t('button.save', 'Save')}
        </Button>
      </Stack>
    </Box>
  )
}
