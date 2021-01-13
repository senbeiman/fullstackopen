import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const urlTop = 'http://restcountries.eu/rest/v2/'
  const urlBottom = filter === '' ? 'all' : `name/${filter}`
  useEffect(() => {
    axios
      .get(urlTop + urlBottom)
      .then(response => {
        setCountries(response.data)
      })
  }, [filter, urlBottom])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onShowClick = (country) => {
    setCountries([country])
  }

  const showResult = () => {
    const countryNum = countries.length
    if (countryNum > 10) {
      return <p>Too many matches, specify another filter</p>
    }else if (countryNum === 1) {
      return <CountryDetail country={countries[0]} />
    } else {
      return <Countries countries={countries} onClick={onShowClick}/>
    }

  }
  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {showResult()}
    </div>
  )
}

export default App
