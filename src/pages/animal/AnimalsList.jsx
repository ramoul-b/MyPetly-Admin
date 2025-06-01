import useAnimals from '../../modules/animals/useAnimals'
import { useDeleteAnimalMutation } from '../../modules/animals/animalsApi'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'

export default function AnimalsList () {
  const { animals, isLoading, refetch } = useAnimals()
  const [deleteAnimal] = useDeleteAnimalMutation()
  const nav = useNavigate()
  const { t } = useTranslation()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: t('animal.name', 'Nom'), flex: 1 },
    { field: 'species', headerName: t('animal.species', 'Espèce'), flex: 1 },
    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 150,
      renderCell: (params) => (
        <Box>
         <IconButton
        color="info"
        onClick={() => nav(`/animals/${params.row.id}`)}
        title="Voir le détail"
      >
        <Visibility />
      </IconButton>
          <IconButton
            color="primary"
            onClick={() => nav(`/animals/${params.row.id}/edit`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={async () => {
              if (window.confirm(t('confirm.delete', 'Supprimer ?'))) {
                await deleteAnimal(params.row.id)
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
          onClick={() => nav('/animals/create')}
        >
          {t('button.add_animal', 'Ajouter')}
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
    rows={animals}
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
