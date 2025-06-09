import React, { useState } from 'react'
import useProviderServices from '../../modules/providerServices/useProviderServices'
import useProviders from '../../modules/provider/useProviders'
import useServices from '../../modules/services/useServices'
import { useDeleteProviderServiceMutation } from '../../modules/providerServices/providerServicesApi'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton, MenuItem, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function ProviderServicesList() {
  const [providerId, setProviderId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const { providers } = useProviders()
  const { services } = useServices()
  const { providerServices, isLoading, refetch } = useProviderServices({
    ...(providerId ? { provider_id: providerId } : {}),
    ...(serviceId ? { service_id: serviceId } : {})
  })
  const [deleteProviderService] = useDeleteProviderServiceMutation()
  const nav = useNavigate()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'provider_id', headerName: 'Provider', flex: 1 },
    { field: 'service_id', headerName: 'Service', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'duration', headerName: 'Duration', flex: 1 },
    { field: 'available', headerName: 'Available', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton color="info" onClick={() => nav(`/provider-services/${params.row.id}`)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => nav(`/provider-services/${params.row.id}/edit`)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={async () => {
              if (window.confirm('Delete?')) {
                await deleteProviderService(params.row.id)
                refetch()
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Stack direction="row" spacing={2}>
          <TextField select size="small" label="Provider" value={providerId} onChange={e => setProviderId(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {providers.map(p => (
              <MenuItem key={p.id} value={p.id}>{typeof p.name === 'object' ? p.name.en || Object.values(p.name)[0] : p.name}</MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Service" value={serviceId} onChange={e => setServiceId(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {services.map(s => (
              <MenuItem key={s.id} value={s.id}>{typeof s.name === 'object' ? s.name.en || Object.values(s.name)[0] : s.name}</MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
          onClick={() => nav('/provider-services/create')}
        >
          Add
        </Button>
      </Box>
      <Box
        sx={{
          height: 500,
          background: '#fff',
          borderRadius: 2,
          p: 2,
          width: '100%',
          minWidth: 0,
          overflowX: 'auto'
        }}
      >
        <DataGrid
          rows={providerServices}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100]}
          getRowId={row => row.id}
          disableSelectionOnClick
          sx={{
            width: '100%',
            minWidth: 600,
            '& .MuiDataGrid-cell': { whiteSpace: 'normal', wordBreak: 'break-word' }
          }}
        />
      </Box>
    </Stack>
  )
}
