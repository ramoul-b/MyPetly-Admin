import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Switch, FormControlLabel
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  useAddProviderServiceMutation,
  useUpdateProviderServiceMutation
} from '../../modules/providerServices/providerServicesApi'
import { useListServicesQuery } from '../../modules/services/servicesApi'
import useAuth from '../../modules/auth/useAuth'

export default function ProviderServiceForm({ open, onClose, initial }) {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { data: services = [] } = useListServicesQuery()
  const [addService] = useAddProviderServiceMutation()
  const [updateService] = useUpdateProviderServiceMutation()
  const [values, setValues] = useState({ service_id: '', price: '', duration: '', available: true })

  useEffect(() => {
    if (initial) {
      setValues({
        service_id: initial.service_id,
        price: initial.price || '',
        duration: initial.duration || '',
        available: !!initial.available,
        provider_id: initial.provider_id
      })
    } else {
      setValues({ service_id: '', price: '', duration: '', available: true })
    }
  }, [initial])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(v => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async () => {
    const finalProviderId = initial?.provider_id || user.provider_id
    const payload = { ...values, provider_id: finalProviderId }
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>{t('button.cancel', 'Cancel')}</Button>
        <Button variant="contained" onClick={handleSubmit}>{t('button.save', 'Save')}</Button>
      </DialogActions>
    </Dialog>
  )
}
