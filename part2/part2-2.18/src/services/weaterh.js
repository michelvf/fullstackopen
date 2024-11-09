import axios from 'axios'

// const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + capital + ',' + tld + '&APPID=' + APPID

const getAll = (capital, tld, APPID) => {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + capital + tld + '&APPID=' + APPID

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }