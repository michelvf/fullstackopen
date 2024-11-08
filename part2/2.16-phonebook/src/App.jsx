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
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // console.log('listado', persons);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('Error al obtener listado: ', error)
      })
  }, [])
  
  const addPerson = event => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }

    // const existe = persons.filter(x => x.name === newName)
    // console.log(existe.length?`${newName}: existe`:`${newName}: no existe`);
    
    const existeName = persons.find(x => x.name === newName)
    // const existeName = persons.some(x => x.name === newName) // FUNCIONA
    // const existeNumber = persons.some(x => x.number === newNumber)
    // console.log(existe?`${newName}: existe`:`${newName}: no existe`);

    // if (existeName || existeNumber) {
    if (existeName) {
      if (window.confirm(`${newName} existe en el PhoneBook. ¿Desea reemplazar el número?`)) {
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
              `Note '${note.content}' was already removed from server`
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
        console.log('Error, no se pudo crear objeto: ', error)
      })
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
    // console.log(newFilter<1?"(Dentro del handlerFilter) filtro vacío":"(Dentro del handlerFilter) filtro llenándose")
  }
  
  // console.log('(Fuera del handlerFilter) filtrar para: ', newFilter, ', tamaño de newFilter', newFilter.length)
  
  // console.log('Cómo quedó el listado después del UPDATE, ', persons)

  const buscaPersonas = (array, palabra) => {
    let coin = []
    for (let i = 0; i < array.length; i++) {
      const element = array[i].name.toLowerCase();
      //console.log('dentro de buscaPersona, element es: ', element.includes(palabra))
      if (element.includes(palabra.toLowerCase())) {
        coin.push(array[i]);
      }
    }
    return coin.length > 0 ? coin : -1;
  }

  // Filtrar personas
  const personsToShow = buscaPersonas(persons, newFilter) < 0
      ? persons
      : buscaPersonas(persons, newFilter)


  // Eliminar
  const delPerson = id =>{
    // console.log('en el controlador para borrar, id: ', id)
    const personToDelete = persons.find(i => i.id === id)
    if (window.confirm(`Desea borrar a ${personToDelete.name}`)) {
      personService
        .del(id)
        .then(returnPerson => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          console.log('Error, no se pudo borrar objeto: ', error)
        })
    }
  }

  // console.log('personsToShow es: ', personsToShow)
  // console.log('resultado de función buscaPersona', buscaPersonas(persons, newFilter))
  // console.log('Resultado de lo que se escribe: ', newFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Footer message={errorMessage} />
    </div>
  )
}

export default App
