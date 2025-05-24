import { useAddAnimalMutation } from '../modules/animals/animalsApi'
import { useForm } from 'react-hook-form'
import { TextField, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AnimalForm () {
  const { register, handleSubmit } = useForm()
  const [add] = useAddAnimalMutation()
  const nav = useNavigate()

  const onSubmit = async d => {
    await add(d).unwrap()
    nav('/animals')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ maxWidth:400 }}>
        <TextField label="Nom" {...register('name',{ required:true })}/>
        <TextField label="Espèce" {...register('species')}/>
        <Button variant="contained" type="submit">Enregistrer</Button>
      </Stack>
    </form>
  )
}
