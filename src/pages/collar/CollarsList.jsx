import useCollars from '../../modules/collars/useCollars'
import { useDeleteCollarMutation } from '../../modules/collars/collarsApi'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton, MenuItem, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import useAnimals from '../../modules/animals/useAnimals'
import { useState } from 'react'

export default function CollarsList() {
  const [animal, setAnimal] = useState('')
  const { animals } = useAnimals()
  const { collars, isLoading, refetch } = useCollars(animal ? { animal_id: animal } : undefined)
  const [deleteCollar] = useDeleteCollarMutation()
  const nav = useNavigate()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nfc_id', headerName: 'NFC ID', flex: 1 },
    { field: 'animal_id', headerName: 'Animal ID', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton color="info" onClick={() => nav(`/collars/${params.row.id}`)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => nav(`/collars/${params.row.id}/edit`)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={async () => {
              if (window.confirm('Delete?')) {
                await deleteCollar(params.row.id)
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
        <TextField
          select
          size="small"
          label="Animal"
          value={animal}
          onChange={e => setAnimal(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {animals.map(a => (
            <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
          onClick={() => nav('/collars/create')}
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
          rows={collars}
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
