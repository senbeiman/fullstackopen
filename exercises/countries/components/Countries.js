import React from 'react'

const Countries = ({ countries, onClick }) => {
  return (
    <div>
      {countries.map((country) => <p key={country.name}>{country.name}<button onClick={() => onClick(country)}>show</button></p>)}
    </div>
  )
}
export default Countries
