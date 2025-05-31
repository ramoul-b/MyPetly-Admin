import useAnimals from '../../modules/animals/useAnimals'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AnimalsList () {
  const { animals, isLoading } = useAnimals()
  const nav = useNavigate()

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'species', headerName: 'Espèce', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <Button size="small" onClick={() => nav(`/animals/${params.row.id}/edit`)}>Éditer</Button>
          <Button size="small" color="error">Suppr</Button>
        </>
      )
    }
  ]

  return (
    <Stack spacing={2}>
      <Button variant="contained" onClick={() => nav('/animals/create')}>
        + Ajouter
      </Button>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={animals}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={row => row.id}
        />
      </div>
    </Stack>
  )
}
