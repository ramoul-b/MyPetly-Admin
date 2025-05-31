// src/modules/auth/LoginPage.jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from './authApi'
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Alert, IconButton, InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function LoginPage () {
  const { register, handleSubmit } = useForm()
  const [login] = useLoginMutation()
  const [error, setError] = useState(null)
  const [showPwd, setShowPwd] = useState(false)
  const nav  = useNavigate()
  const loc  = useLocation()
  const { t } = useTranslation()
  
  const onSubmit = async (data) => {
  try {
    await login(data).unwrap()
    const from = loc.state?.from?.pathname || '/'
    nav(from, { replace: true })
  } catch (e) {
    const msg = e?.data?.message || e?.error || 'Erreur inconnue'
    setError(msg)
  }
}


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Card sx={{ width: 380, p: 2, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LockOutlined color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" mt={1}>{t('login.title')}</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label={t('login.email')}
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              {...register('email', { required: true })}
            />

            <TextField
              label={t('login.password')}   
              type={showPwd ? 'text' : 'password'}
              fullWidth
              sx={{ mb: 3 }}
              {...register('password', { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPwd(!showPwd)} edge="end">
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button variant="contained" fullWidth type="submit">
            {t('login.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
