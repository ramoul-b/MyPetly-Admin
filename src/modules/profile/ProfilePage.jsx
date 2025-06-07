import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeactivateAccountMutation,
  useDeleteAccountMutation
} from './profileApi'
import { Box, TextField, Button, Stack, Alert, Typography, Divider, Avatar } from '@mui/material'
import PhotoUploader from '../../components/PhotoUploader'
import { useTranslation } from 'react-i18next'

export default function ProfilePage() {
  const { data } = useGetProfileQuery()
  const [updateProfile, updateStatus] = useUpdateProfileMutation()
  const [changePassword, pwdStatus] = useChangePasswordMutation()
  const [deactivateAccount] = useDeactivateAccountMutation()
  const [deleteAccount] = useDeleteAccountMutation()
  const { register, handleSubmit, setValue, watch, reset } = useForm()
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)
  const [pwdFeedback, setPwdFeedback] = useState(null)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const onSubmitProfile = async (values) => {
    setFeedback(null)
    try {
      const body = new FormData()
      for (const [k, v] of Object.entries(values)) {
        if (v !== undefined && v !== null) body.append(k, v)
      }
      await updateProfile(body).unwrap()
      setFeedback({ type: 'success', message: t('profile.update_success') })
    } catch (e) {
      const msg = e?.data?.message || e.error || 'Error'
      setFeedback({ type: 'error', message: msg })
    }
  }

  const onSubmitPassword = async (values) => {
    setPwdFeedback(null)
    try {
      await changePassword(values).unwrap()
      setPwdFeedback({ type: 'success', message: t('profile.password_change_success') })
    } catch (e) {
      const msg = e?.data?.message || e.error || 'Error'
      setPwdFeedback({ type: 'error', message: msg })
    }
  }

  const handleDeactivate = async () => {
    if (window.confirm(t('profile.confirm_deactivation'))) {
      await deactivateAccount()
    }
  }

  const handleDelete = async () => {
    if (window.confirm(t('profile.confirm_delete'))) {
      await deleteAccount()
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h5" mb={2}>{t('profile.title')}</Typography>

      {edit ? (
        <form onSubmit={handleSubmit(onSubmitProfile)} noValidate>
          <Stack spacing={2}>
            <PhotoUploader value={watch('photo')} onChange={(f) => setValue('photo', f)} />
            <TextField label={t('profile.name')} {...register('name')} fullWidth />
            <TextField label={t('profile.email')} {...register('email')} fullWidth type="email" />
            <TextField label={t('profile.phone')} {...register('phone')} fullWidth />
            <TextField label={t('profile.address')} {...register('address')} fullWidth />
            {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}
            <Stack direction="row" spacing={2}>
              <Button onClick={() => setEdit(false)}>{t('button.cancel')}</Button>
              <Button variant="contained" type="submit" disabled={updateStatus.isLoading}>{t('button.save')}</Button>
            </Stack>
          </Stack>
        </form>
      ) : (
        <Stack spacing={1} alignItems="center" mb={3}>
          <Avatar src={data?.photo} sx={{ width: 90, height: 90 }} />
          <Typography variant="h6">{data?.name}</Typography>
          <Typography>{data?.email}</Typography>
          <Typography>{data?.phone}</Typography>
          <Typography>{data?.address}</Typography>
          {data?.roles && (
            <Typography>{t('profile.roles')}: {data.roles.join(', ')}</Typography>
          )}
          {data?.created_at && (
            <Typography variant="caption" color="text.secondary">
              {t('profile.created_at')}: {dayjs(data.created_at).format('LL')}
            </Typography>
          )}
          {data?.updated_at && (
            <Typography variant="caption" color="text.secondary">
              {t('profile.updated_at')}: {dayjs(data.updated_at).format('LL')}
            </Typography>
          )}
          <Button variant="outlined" onClick={() => setEdit(true)}>{t('button.edit')}</Button>
        </Stack>
      )}

      <Divider sx={{ my:3 }} />

      <Typography variant="h6" mb={1}>{t('profile.change_password')}</Typography>
      <form onSubmit={handleSubmit(onSubmitPassword)} noValidate>
        <Stack spacing={2}>
          <TextField label={t('profile.current_password')} type="password" {...register('current_password')} fullWidth />
          <TextField label={t('profile.new_password')} type="password" {...register('new_password')} fullWidth />
          <TextField label={t('profile.confirm_password')} type="password" {...register('confirm_password')} fullWidth />
          {pwdFeedback && <Alert severity={pwdFeedback.type}>{pwdFeedback.message}</Alert>}
          <Button variant="contained" type="submit" disabled={pwdStatus.isLoading}>{t('profile.change_password')}</Button>
        </Stack>
      </form>

      <Divider sx={{ my:3 }} />
      <Stack direction="row" spacing={2}>
        <Button color="warning" variant="outlined" onClick={handleDeactivate}>{t('profile.deactivate')}</Button>
        <Button color="error" variant="outlined" onClick={handleDelete}>{t('profile.delete')}</Button>
      </Stack>
    </Box>
  )
}
