import useBookings from '../../modules/bookings/useBookings'
import { useDeleteBookingMutation } from '../../modules/bookings/bookingsApi'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Visibility from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'
import useAuth from '../../modules/auth/useAuth'

export default function BookingsList() {
  const { bookings, isLoading, refetch } = useBookings()
  const [deleteBooking] = useDeleteBookingMutation()
  const nav = useNavigate()
  const { t } = useTranslation()
  const { can } = useAuth()
  if (import.meta.env.DEV) console.debug('Data booking : ', bookings)

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },

    {
      field: 'animalName',
      headerName: t('booking.animal', 'Animal'),
      flex: 1,
      valueGetter: (value, row) => {
        // Nouvelle syntaxe Material-UI v6+
        const a = row?.animal
        if (!a) return '-'
        return typeof a.name === 'object'
          ? a.name.fr ?? a.name.en ?? Object.values(a.name)[0] ?? '-'
          : a.name ?? '-'
      }
    },

    {
      field: 'userName',
      headerName: t('booking.user', 'Utilisateur'),
      flex: 1,
      valueGetter: (value, row) => {
        // Nouvelle syntaxe Material-UI v6+
        return row?.user?.name ?? '-'
      }
    },

    {
      field: 'serviceName',
      headerName: t('booking.service', 'Service'),
      flex: 1,
      valueGetter: (value, row) => {
        // Nouvelle syntaxe Material-UI v6+
        const s = row?.service
        if (!s) return '-'
        return typeof s.name === 'object'
          ? s.name.fr ?? s.name.en ?? Object.values(s.name)[0] ?? '-'
          : s.name ?? '-'
      }
    },

    { 
      field: 'appointment_date', 
      headerName: t('booking.date', 'Date'), 
      flex: 1,
      valueFormatter: (value) => {
        // Formatage de la date pour un meilleur affichage
        if (!value) return '-'
        const date = new Date(value)
        return date.toLocaleDateString('fr-FR')
      }
    },
    
    { field: 'time', headerName: t('booking.time', 'Heure'), flex: 1 },
    
    { 
      field: 'payment_status', 
      headerName: t('booking.payment_status', 'Paiement'), 
      flex: 1,
      valueFormatter: (value) => {
        // Affichage plus convivial du statut de paiement
        if (!value) return 'Non payé'
        return value === 'paid' ? 'Payé' : value
      }
    },

    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton color="info" onClick={() => nav(`/bookings/${params.row.id}`)} title={t('booking.details', 'Voir le détail')}>
            <Visibility />
          </IconButton>
          {can('bookings.edit') && (
            <IconButton color="primary" onClick={() => nav(`/bookings/${params.row.id}/edit`)}>
              <EditIcon />
            </IconButton>
          )}
          {can('bookings.delete') && (
            <IconButton color="error" onClick={async () => {
              if (window.confirm(t('confirm_delete', 'Supprimer ?'))) {
                await deleteBooking(params.row.id)
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
        {can('bookings.create') && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
            onClick={() => nav('/bookings/create')}
          >
            {t('button.add_booking', 'Ajouter')}
          </Button>
        )}
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => nav('/bookings/calendar')}
        >
          {t('button.calendar', 'Voir calendrier')}
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
          rows={bookings}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100]}
          getRowId={row => row.id}
          disableSelectionOnClick
          sx={{
            width: '100%',
            minWidth: 900,
            '& .MuiDataGrid-cell': { whiteSpace: 'normal', wordBreak: 'break-word' }
          }}
        />
      </Box>
    </Stack>
  )
}

