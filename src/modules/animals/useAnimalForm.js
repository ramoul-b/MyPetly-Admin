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
  let payload = values;

  // On vérifie si values.photo_url est un fichier (nouvelle photo)
  if (values.photo_url instanceof File || values.photo_url instanceof Blob) {
    payload = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      // Ajoute chaque champ (sauf si vide)
      if (val !== undefined && val !== null) {
        payload.append(key, val);
      }
    });
  }
  await (id
    ? updateAnimal({ id, ...payload }).unwrap()
    : addAnimal(payload).unwrap()
  );
  nav('/animals');
};


  return { data, submit, addStatus, updateStatus }
}
