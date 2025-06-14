import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {
  Button, Stack, Box, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Switch, FormControlLabel
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import {
  useListProviderServicesQuery,
  useAddProviderServiceMutation,
  useUpdateProviderServiceMutation,
  useDeleteProviderServiceMutation
} from '../../modules/providerServices/providerServicesApi'
import { useListServicesQuery } from '../../modules/services/servicesApi'
import useAuth from '../../modules/auth/useAuth'

function ProviderServiceForm({ open, onClose, initial }) {
  const { t, i18n } = useTranslation()
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
        available: !!initial.available
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
    try {
      if (initial && initial.id) {
        await updateService({ id: initial.id, ...values }).unwrap()
      } else {
        await addService(values).unwrap()
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

export default function MyServicesList() {
  const { t, i18n } = useTranslation()
  const { can } = useAuth()
  const { data: providerServices = [], isLoading, refetch } = useListProviderServicesQuery()
  const [deleteService] = useDeleteProviderServiceMutation()
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'service',
      headerName: t('service.label', 'Service'),
      flex: 1,
      valueGetter: (_, row) => row.service?.name?.[i18n.language] || row.service?.name?.en || ''
    },
    { field: 'price', headerName: t('provider_service.price', 'Price'), width: 100 },
    { field: 'duration', headerName: t('provider_service.duration', 'Duration'), width: 110 },
    {
      field: 'available',
      headerName: t('provider_service.available', 'Available'),
      width: 110,
      type: 'boolean'
    },
    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 120,
      renderCell: params => (
        <Box>
          {can('provider_services.edit') && (
            <IconButton color="primary" onClick={() => { setEditing(params.row); setOpen(true) }}>
              <EditIcon />
            </IconButton>
          )}
          {can('provider_services.delete') && (
            <IconButton color="error" onClick={async () => {
              if (window.confirm(t('confirm.delete', 'Confirm deletion?'))) {
                await deleteService(params.row.id)
                refetch()
              }
            }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      )
    }
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        {can('provider_services.create') && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
            onClick={() => { setEditing(null); setOpen(true) }}
          >
            {t('button.add_provider_service', 'Add')}
          </Button>
        )}
      </Box>
      <Box sx={{ height: 500, background: '#fff', borderRadius: 2, p: 2, width: '100%', minWidth: 0, overflowX: 'auto' }}>
        <DataGrid
          rows={providerServices}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100]}
          getRowId={row => row.id}
          disableSelectionOnClick
          sx={{ width: '100%', minWidth: 600, '& .MuiDataGrid-cell': { whiteSpace: 'normal', wordBreak: 'break-word' } }}
        />
      </Box>
      {open && (
        <ProviderServiceForm
          open={open}
          onClose={async (saved) => { setOpen(false); if (saved) await refetch() }}
          initial={editing}
        />
      )}
    </Stack>
  )
}
