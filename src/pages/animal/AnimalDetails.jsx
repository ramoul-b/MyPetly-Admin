import { useGetAnimalQuery } from '../../modules/animals/animalsApi'
import { useParams } from 'react-router-dom'

export default function AnimalDetails() {
  const { id } = useParams()
  const { data, isLoading } = useGetAnimalQuery(id)

  if (isLoading) return <div>Chargement...</div>
  if (!data) return <div>Animal introuvable</div>

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Espèce : {data.species}</p>
      {/* Ajouter d'autres champs selon le modèle */}
    </div>
  )
}
