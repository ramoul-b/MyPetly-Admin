import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import useAnimalForm from '../../modules/animals/useAnimalForm'
import {
  TextField, Button, Stack, MenuItem, Box, InputAdornment
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AnimalForm () {
  const { id } = useParams()
  const { data, submit } = useAnimalForm(id)
  const { register, handleSubmit, reset, control } = useForm({ defaultValues: data })
  const { t } = useTranslation()

  // Remet à jour le formulaire quand data arrive
  React.useEffect(() => { if (data) reset(data) }, [data, reset])

  // Options select
  const sexes = [
    { value: 'male', label: t('animal.sex.male', 'Mâle') },
    { value: 'female', label: t('animal.sex.female', 'Femelle') }
  ]
  const statuses = [
    { value: 'active', label: t('animal.status.active', 'Actif') },
    { value: 'lost', label: t('animal.status.lost', 'Perdu') }
  ]

  return (
    <Box component="form"
      onSubmit={handleSubmit(submit)}
      sx={{
        maxWidth: 480,
        mx: 'auto',
        mt: 4,
        bgcolor: '#fff',
        p: 4,
        borderRadius: 3,
        boxShadow: 2
      }}
    >
      <Stack spacing={3}>
        <TextField label={t('animal.name', 'Nom')} {...register('name', { required: true })} fullWidth />
        <TextField label={t('animal.species', 'Espèce')} {...register('species')} fullWidth />
        <TextField label={t('animal.breed', 'Race')} {...register('breed')} fullWidth />

        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <TextField
              label={t('animal.sex', 'Sexe')}
              select
              fullWidth
              {...field}
              value={field.value ?? ''}
            >
              {sexes.map(opt =>
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              )}
            </TextField>
          )}
        />

        <TextField label={t('animal.color', 'Couleur')} {...register('color')} fullWidth />
        <TextField
          label={t('animal.weight', 'Poids')}
          {...register('weight')}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>
          }}
          fullWidth
        />
        <TextField
          label={t('animal.height', 'Taille')}
          {...register('height')}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>
          }}
          fullWidth
        />
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
        <TextField
          label={t('animal.birthdate', 'Date de naissance')}
          {...register('birthdate')}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        {/* À activer si besoin d’upload photo :
        <input type="file" {...register('photo_url')} />
        */}
        <Button variant="contained" size="large" type="submit">
          {t('button.save', 'Enregistrer')}
        </Button>
      </Stack>
    </Box>
  )
}
