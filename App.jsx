import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'


function App() {

  const [location, setLocation] = useState()
  const [SearchInput, setSearchInput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)



  useEffect(() => {
    let id = getRandomNumber()
    if (SearchInput) {
      id = SearchInput
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`


    axios.get(URL)
      .then(res => { 
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [SearchInput])


  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }


  const handleChange = event => {

    if (event.target.value === '') {
      return setSuggestedList()
    } else {

      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(err))
    }

  }



  return (
    <div className="App">
      <h1>Rick and Morty</h1>
      <form onSubmit={handleSubmit}>
        <input
          id='idLocation'
          placeholder='Enter another number from 1 to 126'
          type='text'
          onChange={handleChange}
        />
        <button>Search</button>
        <FilterList
          suggestedList={suggestedList}
        />
      </form>
      {
        hasError ?
          <ErrorScreen />
          :
          <>
            <LocationInfo location={location} />
            <div className='card-container'>
              {
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
