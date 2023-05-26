import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import CountryInput from './CountryInput'
import CountryDisplay from './CountryDisplay'

const App = () => {
  const [countryField, setCountryField] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countriesService.getAll().then((res) => setCountries(res))
  }, [])

  const handleCountryChange = (e) => {
    setCountryField(e.target.value)
    const res = countries.filter((country) => country.name.common.toLowerCase().includes(countryField.toLowerCase()))
    if (res.length < 10) {
      setResult(res)
    } else {
      setResult([])
      setSelectedCountry(null)
      setWeatherData(null)
    }
  }

  const handleShowCountry = (name, lat, lon) => {
    const res = countries.find((country) => country.name.common.toLowerCase() === name.toLowerCase())
    setSelectedCountry(res)

    countriesService
      .getWeather(lat, lon)
      .then((res) => {
        setWeatherData(res)
      })
      .catch((err) => console.log(err.response.data.message))
  }

  return (
    <div>
      <CountryInput countryField={countryField} handleCountryChange={handleCountryChange} />
      <div>
        <CountryDisplay
          selectedCountry={selectedCountry}
          result={result}
          countryField={countryField}
          showCountry={handleShowCountry}
          weatherData={weatherData}
        />
      </div>
    </div>
  )
}

export default App
