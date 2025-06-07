// src/modules/account/useProfileForm.js
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useUpdateProfileMutation, useChangePasswordMutation } from './profileApi'
import { useTranslation } from 'react-i18next'

export function useProfileForm(user, setEdit) {
  const { t } = useTranslation()

  // Form profil
  const profileForm = useForm({ defaultValues: user })
  const [updateProfile] = useUpdateProfileMutation()
  const [profileFeedback, setProfileFeedback] = useState(null)

  // Form password
  const pwdForm = useForm()
  const [changePassword] = useChangePasswordMutation()
  const [pwdFeedback, setPwdFeedback] = useState(null)
  const [pwdLoading, setPwdLoading] = useState(false)

  // Save profil
  const onSaveProfile = async (values) => {
    try {
      await updateProfile(values).unwrap()
      setProfileFeedback({ type: 'success', msg: t('profile.updated', 'Profil mis à jour !') })
      setEdit(false)
    } catch {
      setProfileFeedback({ type: 'error', msg: t('profile.error', 'Erreur, réessayez.') })
    }
  }

  // Change password
  const onChangePwd = async (values) => {
    setPwdLoading(true)
    try {
      await changePassword(values).unwrap()
      setPwdFeedback({ type: 'success', msg: t('profile.pwd_success', 'Mot de passe modifié !') })
      pwdForm.reset()
    } catch {
      setPwdFeedback({ type: 'error', msg: t('profile.pwd_error', 'Erreur, réessayez.') })
    }
    setPwdLoading(false)
  }

  profileForm.clearFeedback = () => setProfileFeedback(null)
  pwdForm.clearFeedback = () => setPwdFeedback(null)

  return {
    profileForm,
    onSaveProfile,
    profileFeedback,
    pwdForm,
    onChangePwd,
    pwdFeedback,
    pwdLoading,
  }
}
