import { useListAnimalsQuery } from '../modules/animals/animalsApi'
import CrudTable from '../components/CrudTable'
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AnimalsList () {
  const { data = [], isLoading } = useListAnimalsQuery()
  const nav = useNavigate()

  return (
    <Stack spacing={2}>
      <Button variant="contained" onClick={() => nav('/animals/create')}>
        + Ajouter
      </Button>
      <CrudTable rows={data} loading={isLoading}/>
    </Stack>
  )
}
