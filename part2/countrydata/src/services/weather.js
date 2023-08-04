import axios from 'axios'
//const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=ca23fb430406ae85a590e6d002d477ce'
const getWeather = (lat, lon) => {
    //console.log('wether api ', 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ca23fb430406ae85a590e6d002d477ce');
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
}
export default {
    getWeather: getWeather
}