import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Stack,
  Button,
  TextField,
  Alert
} from '@mui/material'
import dayjs from 'dayjs'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import PhotoUploader from '../../components/PhotoUploader'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation
} from '../../modules/profile/profileApi'

/**
 * User Profile page.
 * Displays the current user information in a card with an edit mode and
 * a separate section to change the password.
 */
export default function Profile() {
  const { t } = useTranslation()
  const { data } = useGetProfileQuery()
  const [updateProfile, updateStatus] = useUpdateProfileMutation()
  const [changePassword, passwordStatus] = useChangePasswordMutation()

  const [edit, setEdit] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [pwdFeedback, setPwdFeedback] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset
  } = useForm()
  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    reset: resetPwd
  } = useForm()

  // When profile data arrives -> populate form
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const onSubmitProfile = async (values) => {
    setFeedback(null)
    try {
      const body = new FormData()
      Object.entries(values).forEach(([k, v]) => {
        if (v !== undefined && v !== null) body.append(k, v)
      })
      await updateProfile(body).unwrap()
      setFeedback({ type: 'success', message: t('profile.update_success') })
      setEdit(false)
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
      resetPwd()
    } catch (e) {
      const msg = e?.data?.message || e.error || 'Error'
      setPwdFeedback({ type: 'error', message: msg })
    }
  }

  if (!data) return null

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      {/* Profile card */}
      <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2 }}>
        {edit ? (
          <form onSubmit={handleSubmit(onSubmitProfile)} noValidate>
            <Stack spacing={2} alignItems="center">
              <PhotoUploader value={watch('photo')} onChange={(f) => setValue('photo', f)} size={110} />
              <TextField label={t('profile.name')} {...register('name')} fullWidth />
              <TextField label={t('profile.email')} {...register('email')} type="email" fullWidth />
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
          <Stack spacing={1} alignItems="center">
            <Avatar src={data.photo} alt={data.name} sx={{ width: 110, height: 110, boxShadow: 2 }} />
            <Typography variant="h5" fontWeight={700}>{data.name}</Typography>
            <Typography>{data.email}</Typography>
            <Typography>{data.phone}</Typography>
            <Typography>{data.address}</Typography>
            <Stack direction="row" spacing={1}>
              {data.roles?.map(role => (
                <Chip key={role} label={role} icon={<VerifiedUserIcon />} color="info" size="small" />
              ))}
            </Stack>
            {data.created_at && (
              <Typography variant="caption" color="text.secondary">
                {t('profile.created_at')}: {dayjs(data.created_at).format('LL')}
              </Typography>
            )}
            <Button variant="outlined" onClick={() => setEdit(true)} sx={{ mt: 1 }}>{t('button.edit')}</Button>
          </Stack>
        )}
      </Box>

      {/* Change password section */}
      <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2, mt: 4 }}>
        <Typography variant="h6" mb={2}>{t('profile.change_password')}</Typography>
        <form onSubmit={handleSubmitPwd(onSubmitPassword)} noValidate>
          <Stack spacing={2}>
            <TextField label={t('profile.current_password')} type="password" {...registerPwd('current_password')} fullWidth />
            <TextField label={t('profile.new_password')} type="password" {...registerPwd('new_password')} fullWidth />
            <TextField label={t('profile.confirm_password')} type="password" {...registerPwd('confirm_password')} fullWidth />
            {pwdFeedback && <Alert severity={pwdFeedback.type}>{pwdFeedback.message}</Alert>}
            <Button variant="contained" type="submit" disabled={passwordStatus.isLoading}>{t('button.save')}</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}
