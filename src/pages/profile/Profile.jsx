import React, { useState } from 'react'
import {
  Box, Stack, Typography, Tabs, Tab, TextField, Button, Divider, Snackbar, Alert, Switch
} from '@mui/material'
import { useForm } from 'react-hook-form'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfilePhotoMutation,
  useChangePasswordMutation,
  useDeactivateAccountMutation,
  useDeleteAccountMutation
} from '../../modules/profile/profileApi'
import PhotoUploader from '../../components/PhotoUploader'

export default function Profile() {
  const [tab, setTab] = useState(0)

  // Charger les infos utilisateur
  const { data, isLoading, refetch } = useGetProfileQuery()
  const user = data?.user || {}

  // Formulaire profil
  const { register, handleSubmit, setValue, watch, reset } = useForm({ defaultValues: user })
  const [updateProfile] = useUpdateProfileMutation()
  const [uploadProfilePhoto] = useUploadProfilePhotoMutation()
  const [profileFeedback, setProfileFeedback] = useState(null)

  // Formulaire mot de passe
  const pwdForm = useForm()
  const [changePassword] = useChangePasswordMutation()
  const [pwdFeedback, setPwdFeedback] = useState(null)
  const [pwdLoading, setPwdLoading] = useState(false)

  // Actions compte
  const [deactivateAccount] = useDeactivateAccountMutation()
  const [deleteAccount] = useDeleteAccountMutation()

  // Sync le formulaire si user change
  React.useEffect(() => {
    if (user && user.id) reset(user)
  }, [user, reset])

  // Sauvegarde profil + upload photo si besoin
  const onSaveProfile = async (values) => {
    let saved = false
    try {
      // 1. Maj info (hors photo)
      await updateProfile(values).unwrap()
      saved = true
      // 2. Upload photo si changée
      if (values.photo_url instanceof File || values.photo_url instanceof Blob) {
        const res = await uploadProfilePhoto({ file: values.photo_url }).unwrap()
        if (res.photo_url) setValue('photo_url', res.photo_url)
        await refetch() // Recharge les données avec la nouvelle photo
      }
      setProfileFeedback({ type: 'success', msg: 'Profil mis à jour !' })
    } catch {
      setProfileFeedback({
        type: 'error',
        msg: saved ? 'Photo non enregistrée.' : 'Erreur, réessayez.'
      })
    }
  }

  // Changement de mot de passe
  const onChangePwd = async (values) => {
    setPwdLoading(true)
    try {
      await changePassword(values).unwrap()
      setPwdFeedback({ type: 'success', msg: 'Mot de passe modifié !' })
      pwdForm.reset()
    } catch {
      setPwdFeedback({ type: 'error', msg: 'Erreur, réessayez.' })
    }
    setPwdLoading(false)
  }

  if (isLoading) return <div>Chargement...</div>

  return (
    <Box sx={{ display: 'flex', gap: 4, p: 4, flexWrap: 'wrap' }}>
      {/* Colonne gauche - résumé */}
      <Box sx={{
        minWidth: 350, bgcolor: '#fff', borderRadius: 4, p: 4, boxShadow: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <PhotoUploader
          value={watch('photo_url') || user.photo_url}
          onChange={file => setValue('photo_url', file)}
          label="Changer la photo"
        />
        <Typography variant="h5" fontWeight={700}>{user.name}</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>{user.email}</Typography>
        <Divider sx={{ my: 2, width: '100%' }} />
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Typography variant="subtitle1" fontWeight={600}>Infos personnelles</Typography>
          <Typography><b>Nom</b> : {user.name}</Typography>
          <Typography><b>Email</b> : {user.email}</Typography>
          <Typography><b>Téléphone</b> : {user.phone || '-'}</Typography>
          <Typography><b>Adresse</b> : {user.address || '-'}</Typography>
        </Stack>
      </Box>

      {/* Colonne droite - édition et paramètres */}
      <Box sx={{ flex: 1, bgcolor: '#fff', borderRadius: 4, p: 4, boxShadow: 1, minWidth: 340 }}>
        <Tabs value={tab} onChange={(_, val) => setTab(val)}>
          <Tab label="Editer Profil" />
          <Tab label="Mot de passe" />
          <Tab label="Paramètres" />
        </Tabs>
        <Divider sx={{ mb: 3 }} />

        {/* Onglet édition du profil */}
        {tab === 0 && (
          <Box component="form" onSubmit={handleSubmit(onSaveProfile)}>
            <Stack spacing={2} sx={{ maxWidth: 500 }}>
              <TextField label="Nom" {...register('name', { required: true })} fullWidth />
              <TextField label="Email" {...register('email', { required: true })} type="email" fullWidth />
              <TextField label="Téléphone" {...register('phone')} fullWidth />
              <TextField label="Adresse" {...register('address')} fullWidth />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button type="submit" variant="contained">Sauvegarder</Button>
              </Stack>
            </Stack>
          </Box>
        )}

        {/* Onglet mot de passe */}
        {tab === 1 && (
          <Box component="form" onSubmit={pwdForm.handleSubmit(onChangePwd)}>
            <Stack spacing={2} sx={{ maxWidth: 400, mt: 2 }}>
              <TextField label="Nouveau mot de passe" type="password" {...pwdForm.register('new_password', { required: true })} />
              <TextField label="Confirmer mot de passe" type="password" {...pwdForm.register('confirm_password', { required: true })} />
              <Button type="submit" variant="contained" disabled={pwdLoading}>Changer</Button>
            </Stack>
          </Box>
        )}

        {/* Onglet paramètres */}
        {tab === 2 && (
          <Stack spacing={3} sx={{ maxWidth: 400, mt: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography>Recevoir les notifications</Typography>
              <Switch checked />
            </Stack>
            <Divider />
            <Button
              variant="outlined"
              color="warning"
              onClick={() => deactivateAccount()}
            >
              Désactiver le compte
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteAccount()}
            >
              Supprimer le compte
            </Button>
          </Stack>
        )}

        {/* Feedbacks */}
        <Snackbar open={!!profileFeedback} autoHideDuration={3000} onClose={() => setProfileFeedback(null)}>
          {profileFeedback && <Alert severity={profileFeedback.type}>{profileFeedback.msg}</Alert>}
        </Snackbar>
        <Snackbar open={!!pwdFeedback} autoHideDuration={3000} onClose={() => setPwdFeedback(null)}>
          {pwdFeedback && <Alert severity={pwdFeedback.type}>{pwdFeedback.msg}</Alert>}
        </Snackbar>
      </Box>
    </Box>
  )
}
