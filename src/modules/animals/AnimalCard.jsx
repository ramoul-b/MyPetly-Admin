export default function AnimalCard({ animal, onEdit, onDelete }) {
  return (
    <div>
      <strong>{animal.name}</strong> — {animal.species}
      <button onClick={() => onEdit(animal.id)}>✏️</button>
      <button onClick={() => onDelete(animal.id)}>🗑️</button>
    </div>
  )
}
