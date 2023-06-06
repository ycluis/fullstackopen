import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAllCountries = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

const getWeather = (lat, lon) => {
  const req = axios.get(`${openWeatherUrl}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
  return req.then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllCountries, getWeather }
