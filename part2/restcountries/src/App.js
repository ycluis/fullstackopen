import { useEffect, useState } from 'react'
import countriesService from './services/countries'

const App = () => {
  const [countryField, setCountryField] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])

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
    }
  }

  return (
    <div>
      find countries: <input value={countryField} onChange={handleCountryChange} />
      <div>
        {result.length === 1 ? (
          <div>
            <h2>{result[0].name.common}</h2>
            <p>capital {result[0].capital[0]}</p>
            <p>area {result[0].area}</p>
            <ul>
              {Object.keys(result[0].languages).map((language) => (
                <li key={language}>{result[0].languages[language]}</li>
              ))}
            </ul>
            <img src={result[0].flags.png} alt="country flag" />
          </div>
        ) : result.length > 0 ? (
          result.map((country) => <p key={country.cca2}>{country.name.common}</p>)
        ) : countryField !== '' ? (
          <p>Too many matches, specify another filter</p>
        ) : null}
      </div>
    </div>
  )
}

export default App
