import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
// import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData () {
      const response = await axios
      .get('http://localhost:3001/persons')
      // .then(response => {
      //   setPersons(response.data)
      // })
      .catch(function(error) {
        console.log(error);
      });
      setPersons(response.data)
      setIsLoading(false)
    }
    getData()
  }, [])

  
  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    // const existe = persons.filter(x => x.name === newName)
    // console.log(existe.length?`${newName}: existe`:`${newName}: no existe`);
    
    const existeName = persons.some(x => x.name === newName)
    const existeNumber = persons.some(x => x.number === newNumber)
    // console.log(existe?`${newName}: existe`:`${newName}: no existe`);

    // if (existe.length) {
    if (existeName || existeNumber) {
      alert(`${newName} o ${newNumber} existe en el PhoneBook`)
    } else {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
    // console.log('Formación de newName: ', newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlerFilter = (event) => {
    setNewFilter(event.target.value)
  }
  
  // console.log(newFilter<1?"filtro vacío":"filtro llenándose")
  // console.log('filtrar para: ', newFilter, ', tamaño de newFilter', newFilter.length)
  
  const buscaPersonas = (array, palabra) => {
    let coin = []
    for (let i = 0; i < array.length; i++) {
      const element = array[i].name.toLowerCase();
      //console.log('dentro de buscaPersona, element es: ', element.includes(palabra))
      console.log('Buscando dentro del buscaPersona a ver si coinciden: ', element.includes(palabra.toLowerCase()))
      if (element.includes(palabra.toLowerCase())) {
        coin.push(array[i]);
      }
    }
    return coin.length > 0 ? coin : -1;
  }

  const personsToShow = buscaPersonas(persons, newFilter) < 0
      ? persons
      : buscaPersonas(persons, newFilter)

  // console.log('personsToShow es: ', personsToShow)
  // console.log('resultado de función buscaPersona', buscaPersonas(persons, newFilter))

  return (
    <div>
      {isLoading ? (
        <div>Cargando datos…</div>
        ) : (
          <div>
            <h2>Phonebook</h2>
            <Filter handlerFilter={handlerFilter} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson}  handlePersonChange={handlePersonChange}  handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons names={personsToShow} />
          </div>
        )}
    </div>
  )
}

export default App