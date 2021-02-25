import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries <input 
        value={filter}
        onChange={handleFilterChange}
      />
    
      <Countries 
      countries={countries}
      filter={filter}
      handleFilterChange={handleFilterChange}
      />

    </div>
  )
}

export default App
