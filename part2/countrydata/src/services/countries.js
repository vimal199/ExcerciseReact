import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const getAll = () => {
    return axios.get(baseUrl)
}
const getCountry = (country) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
}
export default {
    getAll: getAll,
    getCountry: getCountry
}