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
      const res = await addAnimal(values).unwrap()
      const newId = res?.id || res?.animal?.id
      if (newId) {
        nav(`/animals/${newId}`)
        return
      }
      nav('/animals')
      return
    }
    nav(`/animals/${id}`)
  }

  return { data, submit, addStatus, updateStatus }
}
