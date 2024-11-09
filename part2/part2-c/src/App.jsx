import { useState, useEffect } from 'react'
import axios from  'axios'
import Note from './components/Note'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promiesa llenada')
      setNotes(response.data)
    })
  }, [])

  console.log('renderizar lo obtenido con axio: ', notes.length, ' notas.')
  
  return (
    <div>
      <h2>Probando Axio</h2>
      <ul>
        {notes.map((nota, i) => 
          <Note key={i} note={nota.content} />
        )}
      </ul>
    </div>
  )
}
/*
<li key={nota.id}>{nota.content}</li>
*/

export default App