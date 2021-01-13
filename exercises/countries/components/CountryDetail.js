import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  const [ weather, setWeather ] = useState({})
  const apiKey = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [apiKey, country])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="128" alt={country.flag}/>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} width="64" alt={weather.weather_icons}/>
      <p>wind: {weather.wind_speed} mpd direction {weather.wind_dir}</p>
    </div>
  )
}
export default CountryDetail
