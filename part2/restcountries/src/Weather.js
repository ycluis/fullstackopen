const Weather = ({ capital, weather }) => {
  if (weather) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
  return <p>Loading weather data...</p>
}

export default Weather
