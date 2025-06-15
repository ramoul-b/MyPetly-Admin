import useBookings from '../../modules/bookings/useBookings'
import { useUpdateBookingMutation } from '../../modules/bookings/bookingsApi'
import useOwnProviderId from '../../modules/provider/useOwnProviderId'
import { DataGrid } from '@mui/x-data-grid'
import { Stack, Box, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function MyBookingsList() {
  const providerId = useOwnProviderId()
  const { bookings, isLoading, refetch } = useBookings({ provider_id: providerId })
  const [updateBooking] = useUpdateBookingMutation()
  const nav = useNavigate()
  const { t } = useTranslation()

  const handleStatus = async (id, status) => {
    await updateBooking({ id, status })
    refetch()
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'animalName',
      headerName: t('booking.animal', 'Animal'),
      flex: 1,
      valueGetter: (value, row) => {
        const a = row?.animal
        if (!a) return '-'
        return typeof a.name === 'object'
          ? a.name.fr ?? a.name.en ?? Object.values(a.name)[0] ?? '-'
          : a.name ?? '-'
      }
    },
    {
      field: 'serviceName',
      headerName: t('booking.service', 'Service'),
      flex: 1,
      valueGetter: (value, row) => {
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
      valueFormatter: value => {
        if (!value) return '-'
        const date = new Date(value)
        return date.toLocaleDateString('fr-FR')
      }
    },
    { field: 'time', headerName: t('booking.time', 'Heure'), flex: 1 },
    { field: 'status', headerName: t('booking.status', 'Statut'), flex: 1 },
    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 180,
      renderCell: params => {
        const s = params.row.status
        return (
          <Box>
            <IconButton color="info" onClick={() => nav(`/bookings/${params.row.id}`)}>
              <VisibilityIcon />
            </IconButton>
            {(s === 'upcoming' || s === 'pending') && (
              <>
                <IconButton color="success" onClick={() => handleStatus(params.row.id, 'confirmed')}>
                  <CheckCircleRoundedIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleStatus(params.row.id, 'cancelled')}>
                  <CancelRoundedIcon />
                </IconButton>
              </>
            )}
            {s === 'confirmed' && (
              <IconButton color="primary" onClick={() => handleStatus(params.row.id, 'finished')}>
                <DoneAllIcon />
              </IconButton>
            )}
          </Box>
        )
      }
    }
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ height: 500, background: '#fff', borderRadius: 2, p: 2, width: '100%', minWidth: 0, overflowX: 'auto' }}>
        <DataGrid
          rows={bookings}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100]}
          getRowId={row => row.id}
          disableSelectionOnClick
          sx={{ width: '100%', minWidth: 900, '& .MuiDataGrid-cell': { whiteSpace: 'normal', wordBreak: 'break-word' } }}
        />
      </Box>
    </Stack>
  )
}
