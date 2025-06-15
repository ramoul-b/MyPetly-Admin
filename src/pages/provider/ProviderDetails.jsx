import React, { useState } from 'react'
import { Box, Typography, Stack, Button, Paper, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProviderQuery } from '../../modules/provider/providerApi'
import useProviderServices from '../../modules/providerServices/useProviderServices'
import ProviderServiceForm from '../providerServices/ProviderServiceForm'
import { useTranslation } from 'react-i18next'
import useAuth from '../../modules/auth/useAuth'


export default function ProviderDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetProviderQuery(id)
  const { providerServices, isLoading: loadingServices, refetch } = useProviderServices(id)
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const { is } = useAuth()
  const [open, setOpen] = useState(false)

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>{t('provider.not_found', 'Not found')}</div>

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Button variant="outlined" onClick={() => nav('/providers')} sx={{ mb: 2 }}>
        {t('button.back', 'Back')}
      </Button>

      <Stack spacing={1} sx={{ background: '#fff', p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600}>
  {data.name?.[i18n.language] || data.name?.en || ''}
</Typography>

        <Typography>{data.email}</Typography>
        <Typography>{data.phone}</Typography>
        <Typography>{data.address}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => nav(`/providers/${id}/edit`)}>
          {t('button.edit', 'Edit')}
        </Button>
      </Stack>

      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        {t('provider.services_offered', 'Services offered')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        {(is('admin') || is('super_admin')) && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
          >
            {t('button.add_provider_service', 'Add')}
          </Button>
        )}
      </Box>
      <Paper sx={{ height: 400, p: 1 }}>
        <DataGrid
          rows={providerServices}
          loading={loadingServices}
          columns={[
            { field: 'id', headerName: 'ID', width: 70 },
            {
              field: 'service',
              headerName: t('service.label', 'Label'),
              flex: 1,
              renderCell: params => (
                <Button
                  color="info"
                  onClick={() => nav(`/services/${params.row.service?.id}`)}
                >
                  {params.row.service?.name?.[i18n.language] || params.row.service?.name?.en || ''}
                </Button>
              )
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
              width: 90,
              renderCell: params => (
                <IconButton color="info" onClick={() => nav(`/services/${params.row.service?.id}`)}>
                  <VisibilityIcon />
                </IconButton>
              )
            }
          ]}
          pageSize={10}
          rowsPerPageOptions={[5,10,20]}
          getRowId={row => row.id}
          disableSelectionOnClick
        />
      </Paper>
      {open && (
        <ProviderServiceForm
          open={open}
          providerId={id}
          onClose={async (saved) => {
            setOpen(false)
            if (saved) await refetch()
          }}
        />
      )}
    </Box>
  )
}
