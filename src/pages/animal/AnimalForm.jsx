import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useAnimalForm from '../../modules/animals/useAnimalForm'
import {
  TextField, Button, Stack, MenuItem, Box, InputAdornment, Typography, CircularProgress, Alert
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PhotoUploader from '../../components/PhotoUploader'
import { useUploadImageMutation } from '../../modules/animals/animalsApi'

export default function AnimalForm () {
  const { id } = useParams()
  const { data, submit, loading } = useAnimalForm(id)
  const { register, handleSubmit, reset, control, setValue, watch, formState } = useForm({ defaultValues: data })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)
  const [uploadImage] = useUploadImageMutation()

  React.useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const sexes = [
    { value: 'male', label: t('animal.sex.male', 'Mâle') },
    { value: 'female', label: t('animal.sex.female', 'Femelle') }
  ]
  const statuses = [
    { value: 'active', label: t('animal.status.active', 'Actif') },
    { value: 'lost', label: t('animal.status.lost', 'Perdu') }
  ]

  // Soumission avec feedback
  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      // Enregistre les autres infos de l’animal (PUT /animals/{id})
      await submit(values)
      // Si une nouvelle photo est sélectionnée
      if (values.photo_url instanceof File || values.photo_url instanceof Blob) {
        const res = await uploadImage({ id, file: values.photo_url }).unwrap()
        // Optionnel : Mettre à jour la preview avec la nouvelle URL
        if (res.photo_url) setValue('photo_url', res.photo_url)
      }
      setFeedback({ type: 'success', message: t('animal.saved', 'Modifications enregistrées !') })
    } catch (error) {
      console.error(error)
      setFeedback({ type: 'error', message: t('animal.save_error', "Erreur lors de l'enregistrement") })
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
        minHeight: 580
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
          {t('animal.edit_title', 'Modifier un animal')}
        </Typography>

        {/* Champs */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label={t('animal.name', 'Nom')}
            {...register('name', { required: true })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!formState.errors.name}
          />
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <TextField
                label={t('animal.sex', 'Sexe')}
                select
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...field}
                value={field.value ?? ''}
                SelectProps={{ sx: { minWidth: 130 } }}
              >
                {sexes.map(opt =>
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                )}
              </TextField>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label={t('animal.species', 'Espèce')} {...register('species')} fullWidth />
          <TextField label={t('animal.breed', 'Race')} {...register('breed')} fullWidth />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label={t('animal.color', 'Couleur')} {...register('color')} fullWidth />
          <TextField
            label={t('animal.birthdate', 'Date de naissance')}
            {...register('birthdate')}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label={t('animal.weight', 'Poids')}
            {...register('weight')}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label={t('animal.height', 'Taille')}
            {...register('height')}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              label={t('animal.status', 'Statut')}
              select
              fullWidth
              {...field}
              value={field.value ?? ''}
            >
              {statuses.map(opt =>
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              )}
            </TextField>
          )}
        />

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
