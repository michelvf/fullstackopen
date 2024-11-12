import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [classError, setClassError] = useState('error')

  // console.log('listado', persons);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('Error getting lists: ', error)
      })
  }, [])
  
  // Add people, if it exists, update it
  const addPerson = event => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }

    if (!newName || !newNumber) {
      alert('Fill in the data in the form, if there is data, delete it, and re-type it.')
    } else {
      const existeName = persons.find(x => x.name === newName)
  
      if (existeName) {
        if (window.confirm(`${newName} exists on the PhoneBook. Do you want to replace the number?`)) {
          const name_id = persons.find(n => n.name == newName )
          personService
            .update(name_id.id, newObject)
            .then(returnPerson => {  
              //console.log('Respuesta del update: ', returnPerson)
              //setPersons(persons.concat(returnPerson))
              setPersons(persons => persons.map(per =>
                per.id == name_id.id ? returnPerson : per
              ))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(
                `Record '${returnPerson.name}' was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        } 
      } else {
        personService
        .create(newObject)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('Error, could not create object: ', error)
        })
      }
    }

  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlerFilter = (event) => {
    setNewFilter(event.target.value)
  }
  
  // Search people
  const buscaPersonas = (array, palabra) => {
    let coin = []
    // console.log('Estoy en buscaPersona, me llegó el arreglo: ', array)
    for (let i = 0; i < array.length; i++) {
      const element = array[i].name.toLowerCase();
      
      if (element.includes(palabra.toLowerCase())) {
        coin.push(array[i]);
      }
    }
    return coin.length >= 0 ? coin : -1;
  }

  // Filter people
  const personsToShow = buscaPersonas(persons, newFilter) < 0
      ? persons
      : buscaPersonas(persons, newFilter)


  // Delete a Record
  const delPerson = id =>{
    // console.log('en el controlador para borrar, id: ', id)
    const personToDelete = persons.find(i => i.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name}`)) {
      personService
        .del(id)
        .then(returnPerson => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          console.log('Error, could not delete object: ', error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} classCSS={classError} />
      <Filter 
        handlerFilter={handlerFilter}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        names={personsToShow}
        delPerson={delPerson}
      />
      <Footer />
    </div>
  )
}

export default App
