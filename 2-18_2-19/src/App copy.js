import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${currency}`)
        .then(response => {
          console.log(response.data)
          setRates(response.data)
        })
    }
  }, [currency])

  const handleChange = (event) => {
    setValue(event.target.value)
    console.log(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }
  

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
    <div>
      {rates.capital}
    </div>
    </div>
  )
}


export default App