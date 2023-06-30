import { useState, useEffect } from 'react'
import axios from 'axios'

const Highlight = ({highlight}) => {
  if (!highlight) {
    return null
  }
  console.log("Country:", highlight);
  return <div>
    <h1>{`${highlight.name.common}`}</h1>
    <div>{`Capital: ${highlight.capital}`}</div>
    <div>{`Area: ${highlight.area} km^2`}</div>
    <h2>Languages</h2> 
    <ul>{Object.values(highlight.languages).map(language => <li>{language}</li>)}</ul>
    <img src={highlight.flags.png} alt={`Flag of ${highlight.name.common}`} />

  </div>
}

const Display = ({countriesToShow, handleButtonClick}) => {
  if (countriesToShow.length > 10) {
    return <div>{`Filter returns ${countriesToShow.length} countries, a maximum of 10 can be displayed`}</div>
  }
  if (countriesToShow.length === 0) {
    return <div>{`Filter returns no countries, please change the filter`}</div>
  }
  if (countriesToShow.length === 1) {
    return null
  }
  return (<div>{countriesToShow.map(country => <div key={country}>{country} <button onClick={() => handleButtonClick(country)}>Select</button></div>)}</div>)
}

const App = () => {
  const [filter, setNewFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [highlight, setHighlight] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      const countryNames = response.data.map(country => country.name.common);
      setAllCountries(countryNames)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleButtonClick = (countryName) => {
    setNewFilter(countryName)
  }
  

  useEffect(() => {
    const filteredCountries = filter 
      ? allCountries.filter(country => country.toLowerCase().includes(filter.toLowerCase())) 
      : allCountries;
      
    setCountriesToShow(filteredCountries)
  }, [filter, allCountries])
    
  useEffect(() => {
    if (countriesToShow.length === 1) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countriesToShow[0]}/`)
      .then(response => {
        setHighlight(response.data);
        console.log(countriesToShow[0], response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      })
    } else {
      setHighlight('')
    }
  }, [countriesToShow])

  return (
    <div> 
      <form> Test
        <input onChange={handleFilterChange}/>
      </form>
      <Highlight highlight={highlight} />
      <Display countriesToShow={countriesToShow} handleButtonClick={handleButtonClick}/>
    </div>
  )
}

export default App
