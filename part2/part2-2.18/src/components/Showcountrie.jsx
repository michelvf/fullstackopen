import { fetchPais, climaPais } from '../services/onecountrie'
import { useState, useEffect } from 'react'

const Showcountrie = ({ countrie }) => {
  const [datos, setDatos] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const api_key = import.meta.env.VITE_SOME_KEY
  // variable api_key ahora tiene el valor configurado

  // console.log('API importada: ', api_key)

  useEffect(() => {
    const datosAPI = async () => {
      try {
        const pais = await fetchPais(countrie)
        setDatos(pais)
        const capital = pais.capital[0]
        const tld1 = pais.tld[0]
        const tld = tld1.replace(".", ',')

        console.log('voy a mandar: capital: ', capital)
        console.log('voy a mandar: capital: ', tld)

        const clima = await climaPais(capital, tld, api_key)
        setWeather(clima)
        setIcon(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
        setTemp((weather.main.temp - 273.15).toFixed(2))
      } catch (error) {
        console.error('Error al obtener datos de las APIs', error)
      } finally {
        setLoading(false)
      }
    }

    datosAPI()
  }, []) 

  console.log('bajando datos del tiempo: ', weather)
  console.log('icono a mostrar del tiempo: ', icon)
  console.log('temperatura del tiempo: ', temp)
  
  if (loading) return <div>Loading data ...</div>

  //console.log('los datos llegados del servidor: ', datos)
  // console.log('los datos de lenguage: ', datos.languages)

  return (
    <div>
      <div>
        <h2>{datos.name.official}</h2>
        <p>
          capital: {datos.capital[0]}<br />
          area: {datos.area} m<sup>2</sup>
        </p>
        <p>
          <b>languages:</b>
        </p>
          <ul>
            {Object.keys(datos.languages).map((lan, i) => 
              <li key={i}>{datos.languages[lan]}</li>
            )}
          </ul>
          <img src={datos.flags.png} />
          </div>
      <div>
        <h2>Weather in {datos.capital[0]}</h2>
        <p>temperature: {temp} <sup>o</sup>C</p>
        <img src={icon} alt="icon of weather" />
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  )
}

export default Showcountrie

/**
 {datos.languages.map((lang, i) => {
            <li key={i}>{lang}</li>
          })}
 */