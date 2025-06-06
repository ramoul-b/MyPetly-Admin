import {
  useAddAnimalMutation,
  useUpdateAnimalMutation,
  useGetAnimalQuery
} from './animalsApi'
import { useNavigate } from 'react-router-dom'

export default function useAnimalForm(id) {
  const { data } = useGetAnimalQuery(id, { skip: !id })
  const [addAnimal, addStatus] = useAddAnimalMutation()
  const [updateAnimal, updateStatus] = useUpdateAnimalMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    if (id) {
      await updateAnimal({ id, ...values }).unwrap()
    } else {
      await addAnimal(values).unwrap()
    }
    nav(`/animals/${id}`)
  }

  return { data, submit, addStatus, updateStatus }
}
