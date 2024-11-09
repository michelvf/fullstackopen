import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='

const fetchPais = async (countrie) => {
    try {
        const response1 = await axios.get(`${baseUrl}${countrie}`)
        return response1.data
    } catch (error) {
        console.error('Error al obtener datos del país', error)
        throw error
    }
}

const climaPais = async (capital, tld, api) => {
    try {
        const response2 = await axios.get(`${weatherUrl}${capital}${tld}&APPID=${api}`)
        // + capital + tld + '&APPID=' + APPID
        return response2.data
    } catch (error) {
        console.error('Error al obtener datos de la API weather, ', error)
        throw error
    }
}

export { fetchPais, climaPais }
