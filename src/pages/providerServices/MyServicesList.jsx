import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  useListProviderServicesQuery,
  useDeleteProviderServiceMutation
} from '../../modules/providerServices/providerServicesApi'
import useAuth from '../../modules/auth/useAuth'
import ProviderServiceForm from './ProviderServiceForm'

export default function MyServicesList() {
  const { t, i18n } = useTranslation()
  const nav = useNavigate()
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
      width: 150,
      renderCell: params => (
        <Box>
          {can('view_own_provider_service') && (
            <IconButton color="info" onClick={() => nav(`/provider-services/${params.row.id}`)}>
              <VisibilityIcon />
            </IconButton>
          )}
          {can('provider_services.edit') && (
            <IconButton color="primary" onClick={() => { setEditing(params.row); setOpen(true) }}>
              <EditIcon />
            </IconButton>
          )}
          {can('delete_own_provider_service') && (
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
        {can('create_provider_service') && (
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
