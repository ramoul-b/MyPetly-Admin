import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useUserForm from '../../modules/users/useUserForm'
import {
  TextField, Button, Stack, MenuItem, Box, InputAdornment, Typography, CircularProgress, Alert
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PhotoUploader from '../../components/PhotoUploader'
import { useUploadImageMutation } from '../../modules/users/usersApi'
import useRoles from '../../modules/roles/useRoles'

export default function UserForm () {
  const { id } = useParams()
  const { data, submit, loading } = useUserForm(id)
  const { register, handleSubmit, reset, control, setValue, watch, formState } = useForm({ defaultValues: data })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)
  const [uploadUserImage] = useUploadImageMutation()

  React.useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const { roles = [] } = useRoles()

  // Soumission avec feedback
  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      // Enregistre les infos utilisateur (POST/PUT /users/{id})
      await submit(values)
      // Upload de la photo si besoin
      if (values.photo_url instanceof File || values.photo_url instanceof Blob) {
        const res = await uploadUserImage({ id, file: values.photo_url }).unwrap()
        if (res.photo_url) setValue('photo_url', res.photo_url)
      }
      setFeedback({ type: 'success', message: t('user.saved', 'Modifications enregistrées !') })
    } catch {
      setFeedback({ type: 'error', message: t('user.save_error', 'Erreur lors de l\'enregistrement') })
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
        minHeight: 480
      }}
      noValidate
    >
      <Stack spacing={3}>
        {/* Avatar + Upload */}
        <PhotoUploader
          value={watch('photo_url') || data?.photo_url}
          onChange={file => setValue('photo_url', file)}
          label="Changer la photo"
        />

        <Typography variant="h5" align="center" fontWeight={600} sx={{ mt: 1, mb: 1 }}>
          {id
            ? t('user.edit_title', 'Modifier un utilisateur')
            : t('user.add_title', 'Ajouter un utilisateur')
          }
        </Typography>

        <TextField
          label={t('user.name', 'Nom')}
          {...register('name', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.name}
        />
        <TextField
          label={t('user.email', 'Email')}
          {...register('email', { required: true })}
          type="email"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.email}
        />
        <TextField
          label={t('user.phone', 'Téléphone')}
          {...register('phone')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Controller
          name="roles"
          control={control}
          render={({ field }) => (
            <TextField
              label={t('user.roles', 'Rôle')}
              select
              fullWidth
              SelectProps={{ multiple: true, sx: { minWidth: 160 } }}
              InputLabelProps={{ shrink: true }}
              {...field}
              value={field.value ?? []}
            >
              {roles.map(opt =>
                <MenuItem key={opt.id || opt.value} value={opt.name || opt.value}>
                  {opt.label || opt.name}
                </MenuItem>
              )}
            </TextField>
          )}
        />
        {!id &&
          <TextField
            label={t('user.password', 'Mot de passe')}
            {...register('password', { required: !id })}
            type="password"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!formState.errors.password}
          />
        }

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
