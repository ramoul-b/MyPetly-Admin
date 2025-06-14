import { Stack, Box, Button, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import useProviderServices from '../../modules/providerServices/useProviderServices'
import { useTranslation } from 'react-i18next'

export default function MyServices() {
  const { providerServices, isLoading } = useProviderServices()
  const nav = useNavigate()
  const { t, i18n } = useTranslation()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'service',
      headerName: t('service.label', 'Label'),
      flex: 1,
      renderCell: params => (
        <Button color="info" onClick={() => nav(`/services/${params.row.service?.id}`)}>
          {params.row.service?.name?.[i18n.language] || params.row.service?.name?.en || ''}
        </Button>
      )
    },
    { field: 'price', headerName: t('provider_service.price', 'Price'), width: 100 },
    { field: 'duration', headerName: t('provider_service.duration', 'Duration'), width: 110 },
    { field: 'available', headerName: t('provider_service.available', 'Available'), width: 110, type: 'boolean' },
    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 90,
      renderCell: params => (
        <IconButton color="info" onClick={() => nav(`/services/${params.row.service?.id}`)}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ height: 500, background: '#fff', borderRadius: 2, p: 2 }}>
        <DataGrid
          rows={providerServices}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100]}
          getRowId={row => row.id}
          disableSelectionOnClick
        />
      </Box>
    </Stack>
  )
}
