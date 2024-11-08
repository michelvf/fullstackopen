import axios from 'axios'
import Note from './components/Note'
import personService from './services/persons'
import { useState, useEffect } from 'react'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPersons = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
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
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    const changePersons = { ...person, important: !person.important }

    personService
      .update(id, changePersons)
      .then(returnPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnPerson))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {persons.map(note =>
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
