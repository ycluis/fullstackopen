import { useEffect, useState } from 'react'
import CountryInput from './CountryInput'
import CountryOutput from './CountryOutput'

import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryField, setCountryField] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [result, setResult] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService.getAllCountries().then((res) => setCountries(res))
  }, [])

  const clearState = () => {
    setSelectedCountry(null)
    setWeather(null)
  }

  const handleCountryChange = (e) => {
    clearState()
    setCountryField(e.target.value)

    const res = countries.filter((country) => country.name.common.toLowerCase().includes(countryField.toLowerCase()))

    if (res.length < 10) {
      setResult(res)
    } else {
      setResult([])
    }
  }

  const handleShowCountry = (name, lat, lon) => {
    const res = countries.find((country) => country.name.common.toLowerCase() === name.toLowerCase())
    setSelectedCountry(res)

    countriesService
      .getWeather(lat, lon)
      .then((res) => {
        setWeather(res)
      })
      .catch((err) => console.log(err.response.data.message))
  }

  return (
    <div>
      <CountryInput countryField={countryField} handleCountryChange={handleCountryChange} />
      <div>
        <CountryOutput
          countryField={countryField}
          selectedCountry={selectedCountry}
          result={result}
          weather={weather}
          handleShowCountry={handleShowCountry}
        />
      </div>
    </div>
  )
}

export default App
