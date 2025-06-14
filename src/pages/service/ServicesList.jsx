import React from 'react'
import useServices from '../../modules/services/useServices'
import useCategories from '../../modules/services/useCategories'
import { useDeleteServiceMutation } from '../../modules/services/servicesApi'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton, TextField, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import useAuth from '../../modules/auth/useAuth'


export default function ServicesList () {
  const [category, setCategory] = React.useState('')
  const { categories } = useCategories()
  const { services, isLoading, refetch } = useServices(category ? { category_id: category } : undefined)
  const [deleteService] = useDeleteServiceMutation()
  const nav = useNavigate()
  const { t, i18n } = useTranslation()
  const { can } = useAuth()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'label',
      headerName: t('service.label', 'Label'),
      flex: 1,
      renderCell: params => params.row.name?.[i18n.language] || params.row.name?.en || ''
    },
    {
      field: 'active',
      headerName: t('service.active', 'Active'),
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: params =>
        params.row.active
          ? <CheckCircleRoundedIcon color="success" />
          : <CancelRoundedIcon color="disabled" />
    },
    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton color="info" onClick={() => nav(`/services/${params.row.id}`)}>
            <VisibilityIcon />
          </IconButton>
          {can('services.edit') && (
            <IconButton color="primary" onClick={() => nav(`/services/${params.row.id}/edit`)}>
              <EditIcon />
            </IconButton>
          )}
          {can('services.delete') && (
            <IconButton
              color="error"
              onClick={async () => {
                if (window.confirm(t('confirm.delete', 'Supprimer ?'))) {
                  await deleteService(params.row.id)
                  refetch()
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      )
    }
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <TextField
          select
          size="small"
          label={t('service.category', 'Category')}
          value={category}
          onChange={e => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">{t('all', 'All')}</MenuItem>
          {categories.map(c => (
            <MenuItem key={c.id} value={c.id}>{c.name?.[i18n.language] || c.name?.en}</MenuItem>
          ))}
        </TextField>
        {can('services.create') && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
            onClick={() => nav('/services/create')}
          >
            {t('button.add_service', 'Add')}
          </Button>
        )}
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
          rows={services}
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
