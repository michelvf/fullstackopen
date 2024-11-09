import { useState, useEffect } from 'react'
import countriesServices from './services/allcountries'
import Showten from './components/Showten'
import Showcountrie from './components/Showcountrie'

const App = () => {
  const [value, setValue] = useState('')
  const [busqueda, setBusqueda] = useState([])
  const [allcountries, setAllCountries] = useState(null)

  // console.log('effect run, currency is now', currency)

  useEffect(() => {
    // console.log('effect run, countries is now', allcountries)
    countriesServices
        .getAll()
        .then(datos => {
            // console.log('dentro del axios: ', datos)
            // console.log('dentro del axios: ', datos.map(n => n.name.common))
            setAllCountries(datos.map(n => n.name.common))
        })
        .catch((error) => {
          console.log(
            `Error al leer datos del servidor: ${error}`
          )
        })
  }, [])

  // console.log('listado de nombres: ', allcountries)

  const handleChange = (event) => {
    setValue(event.target.value)
    //console.log('dato escrito: ', value)
    const coincidencia = palaCoin(allcountries, value)
    console.log('función de búsqueda da: ', coincidencia)
    setBusqueda(coincidencia)    
  }

  const palaCoin = (array, palabra) => {
    let coin = []
    for (let i = 0; i < array.length; i++) {
      const element = array[i].toLowerCase();
      //console.log('dentro de buscaPersona, element es: ', element.includes(palabra))
      if (element.includes(palabra.toLowerCase())) {
        coin.push(array[i]);
      }
    }
    return coin
  }

  console.log('al hacer click llegó: ', name)
  const click = (name) => {
    setBusqueda([name])
  }

  //console.log(`obtención de los datos de allcountries: ${allcountries}`)

  if (!allcountries) return <div>Loading data of countries ...</div>

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <div>
        { busqueda.length > 10 && <span>Too many matches, specify another filter</span> }
        { (busqueda.length <= 10 && busqueda.length > 1) && <Showten countries={busqueda} click={click}/> }
        { busqueda.length == 1 && <Showcountrie countrie={busqueda} /> }
      </div>
    </div>
  )
}

export default App
