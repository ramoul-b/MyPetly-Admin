import useUsers from '../../modules/users/useUsers'
import { useDeleteUserMutation } from '../../modules/users/usersApi'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Visibility from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'
import useAuth from '../../modules/auth/useAuth'

export default function UsersList () {
  const { users, isLoading, refetch } = useUsers()
  const [deleteUser] = useDeleteUserMutation()
  const nav = useNavigate()
  const { t } = useTranslation()
  const { can } = useAuth()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: t('user.name', 'Nom'), flex: 1 },
    { field: 'email', headerName: t('user.email', 'Email'), flex: 1 },
    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="info"
            onClick={() => nav(`/users/${params.row.id}`)}
            title="Voir le détail"
          >
            <Visibility />
          </IconButton>
          {can('users.edit') && (
            <IconButton
              color="primary"
              onClick={() => nav(`/users/${params.row.id}/edit`)}
            >
              <EditIcon />
            </IconButton>
          )}
          {can('users.delete') && (
            <IconButton
              color="error"
              onClick={async () => {
                if (window.confirm(t('confirm_delete', 'Supprimer ?'))) {
                  await deleteUser(params.row.id)
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        {can('users.create') && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
            onClick={() => nav('/users/create')}
          >
            {t('button.add_user', 'Ajouter')}
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
          rows={users}
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
