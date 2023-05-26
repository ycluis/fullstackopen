const Weather = ({ capital, weatherData }) => {
  if (weatherData) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  }
  return null
}

export default Weather
