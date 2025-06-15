import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Switch, FormControlLabel, Alert
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  useAddProviderServiceMutation,
  useUpdateProviderServiceMutation
} from '../../modules/providerServices/providerServicesApi'
import { useListServicesQuery } from '../../modules/services/servicesApi'
import { useListProvidersQuery } from '../../modules/provider/providerApi'
import useAuth from '../../modules/auth/useAuth'

export default function ProviderServiceForm({ open, onClose, initial, providerId }) {
  const { t, i18n } = useTranslation()
  const { user, is } = useAuth()
  const { data: services = [] } = useListServicesQuery()
  const { data: providers = [] } = useListProvidersQuery(undefined, { skip: !(is('admin') || is('super_admin')) })
  const [addService] = useAddProviderServiceMutation()
  const [updateService] = useUpdateProviderServiceMutation()
  const [values, setValues] = useState({ service_id: '', price: '', duration: '', available: true, provider_id: '' })
  const [error, setError] = useState(null)
  const finalProviderId = providerId || values.provider_id || initial?.provider_id || user.provider_id
  const canSubmit = !!finalProviderId

  useEffect(() => {
    if (initial) {
      setValues({
        service_id: initial.service_id,
        price: initial.price || '',
        duration: initial.duration || '',
        available: !!initial.available,
        provider_id: providerId || initial.provider_id || user.provider_id || ''
      })
    } else {
      setValues({
        service_id: '',
        price: '',
        duration: '',
        available: true,
        provider_id: providerId || user.provider_id || ''
      })
    }
  }, [initial, providerId, user.provider_id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(v => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async () => {
    const finalProviderId = providerId || values.provider_id || initial?.provider_id || user.provider_id
    if (!finalProviderId) {
      setError(t('provider_service.no_provider', 'Provider not specified'))
      return
    }
    const payload = { ...values, provider_id: finalProviderId }
    console.log('Payload POST:', payload)
    try {
      if (initial && initial.id) {
        await updateService({ id: initial.id, ...payload }).unwrap()
      } else {
        await addService(payload).unwrap()
      }
      onClose(true)
    } catch {
      onClose(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? t('service.edit_title', 'Edit service') : t('service.create_title', 'New service')}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <TextField
          select
          fullWidth
          margin="normal"
          label={t('service.label', 'Service')}
          name="service_id"
          value={values.service_id}
          onChange={handleChange}
        >
          {services.map(s => (
            <MenuItem key={s.id} value={s.id}>
              {typeof s.name === 'object'
                ? s.name[i18n.language] || s.name.en || Object.values(s.name)[0]
                : s.name}
            </MenuItem>
          ))}
        </TextField>
        {(is('admin') || is('super_admin')) && (
          <TextField
            select
            fullWidth
            margin="normal"
            label={t('provider.name', 'Provider')}
            name="provider_id"
            value={values.provider_id}
            onChange={handleChange}
          >
            {providers.map(p => (
              <MenuItem key={p.id} value={p.id}>
                {typeof p.name === 'object'
                  ? p.name[i18n.language] || p.name.en || Object.values(p.name)[0]
                  : p.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          fullWidth
          margin="normal"
          label={t('provider_service.price', 'Price')}
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label={t('provider_service.duration', 'Duration')}
          name="duration"
          type="number"
          value={values.duration}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Switch checked={values.available} onChange={e => handleChange({ target: { name: 'available', type: 'checkbox', checked: e.target.checked } })} />}
          label={t('provider_service.available', 'Available')}
        />
        {!canSubmit && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {t('provider_service.no_provider', 'Provider not specified')}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>{t('button.cancel', 'Cancel')}</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!canSubmit}>{t('button.save', 'Save')}</Button>
      </DialogActions>
    </Dialog>
  )
}
