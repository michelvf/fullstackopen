const Note = ({ note, toggleImportance }) => {

  const label = note.important ? 'No importante' : 'Importante'

  return (
    <li>{note.name} - {note.number} <button onClick={toggleImportance}>{label}</button></li>
  )
}

export default Note
