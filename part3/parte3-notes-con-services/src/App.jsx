import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import { useState, useEffect } from 'react'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setNotes(initialPersons)
      })
  }, [])

  const addPersons = event => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }

    noteService
      .create(noteObject)
      .then(returnNote => {
        setNotes(notes.concat(returnNote))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/api/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changeNotes = { ...note, important: !note.important }

    noteService
      .update(id, changeNotes)
      .then(returnNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnNote))
      })
      .catch(error => {
        alert(
          `el registro '${note.name}' ya fue borrada del servidor`
        )
        //setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addPersons}>
      name: <input
          value={newName}
          onChange={handleNameChange}
        />
      Number: <input
          vale={newNumber}
          onChange={handleNumberChange}
          />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App


/*
Juramento del desarrollo Full Stack

El desarrollo Full Stack es extremadamente difícil, por eso usaré todos los medios posibles para facilitarlo.

  - Mantendré abierta la consola de desarrolladores del navegador todo el tiempo.
  - Usaré la pestaña de red de las herramientas de desarrollo del navegador para asegurarme de que el frontend y el backend estén comunicándose como espero.
  - Mantendré constantemente un ojo en el estado del servidor para asegurarme de que los datos enviados por el frontend se guarden allí como espero.
  - Progresaré con pequeños pasos.
  - Escribiré muchos mensajes de console.log para asegurarme de entender cómo se comporta el código y ayudar a identificar problemas.
  - Si mi código no funciona, no escribiré más código. En cambio, empezaré a eliminar el código hasta que funcione o simplemente volveré a un estado en el que todo seguía funcionando.
  - Cuando pida ayuda en el canal de Discorddel curso o en otro lugar, formularé mis preguntas adecuadamente, consulta aquí cómo pedir ayuda.

*/