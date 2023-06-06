import Weather from './Weather'

const CountryOutput = ({ countryField, selectedCountry, result, weather, handleShowCountry }) => {
  if (selectedCountry) {
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>capital {selectedCountry.capital[0]}</p>
        <p>area {selectedCountry.area}</p>
        <ul>
          {Object.keys(selectedCountry.languages).map((language) => (
            <li key={language}>{selectedCountry.languages[language]}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} alt="flag" />
        <Weather capital={selectedCountry.capital[0]} weather={weather} />
      </div>
    )
  }

  return result.length > 0 ? (
    result.map((country) => (
      <p key={country.cca2}>
        {country.name.common}{' '}
        <button
          onClick={() =>
            handleShowCountry(country.name.common, country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
          }
        >
          show
        </button>
      </p>
    ))
  ) : countryField !== '' ? (
    <p>Too many matches, specify another filter</p>
  ) : null
}

export default CountryOutput
