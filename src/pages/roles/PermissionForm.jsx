import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddPermissionMutation, useUpdatePermissionMutation, useListPermissionsQuery } from '../../modules/roles/rolesApi'
import { TextField, Button, Stack, Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function PermissionForm() {
  const { id } = useParams()
  const nav = useNavigate()
  const { data } = useListPermissionsQuery(undefined, { selectFromResult: ({ data }) => ({ data: data?.find(p => p.id === Number(id)) }) })
  const [addPermission, addStatus] = useAddPermissionMutation()
  const [updatePermission, updateStatus] = useUpdatePermissionMutation()
  const { register, handleSubmit, reset, formState } = useForm({ defaultValues: data })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)

  React.useEffect(() => { if (data) reset(data) }, [data, reset])

  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      if (id) await updatePermission({ id, ...values }).unwrap()
      else await addPermission(values).unwrap()
      nav('/permissions')
    } catch {
      setFeedback({ type: 'error', message: t('permission.save_error', 'Save error') })
    }
  }

  const loading = addStatus.isLoading || updateStatus.isLoading

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4, bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2 }}
      noValidate
    >
      <Stack spacing={3}>
        <Typography variant="h5" align="center" fontWeight={600}>
          {id ? t('permission.edit_title', 'Edit permission') : t('permission.create_title', 'New permission')}
        </Typography>
        <TextField
          label={t('permission.name', 'Name')}
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
