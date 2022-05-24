import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

// maan näyttämispainikkeen händleri
const buttonClickHandler = (e) => {
  console.log("clicked!" + e.target.value)

  return (
    <div>
      <CountryList entries={e.target.value} />
    </div>
  )

}

// hakupalkki
const Searcher = ({ handler }) => {
  return (
    <p>find countries! <input onChange={handler} /></p>
  )
}


// maiden listaus
// jos hakuehdon täyttäviä maita yli 10, käske tarkentamaan
// jos [1...10] listaa maiden nimet
const CountryList = ({ entries }) => {
  if (entries.length === 0) return (
    <p>No results!</p>
  )
  else if (entries.length > 10) return (
    <p>Too many results! Please specify another filter!</p>
  )
  // 2-10 maata, näytä kyseisten maiden nimet
  else if (entries.length > 1 && entries.length <= 10) return (
    <div>
      {entries.map((e, index) =>
        <CountryName key={index} country={e} buttonClick={buttonClickHandler} />
      )}
    </div>
  )
  // yksi maa, näytä sen tiedot
  return (
    <div>
      {entries.map((e, index) =>
        <Country key={index} country={e} />
      )}
    </div>
  )
}

// <Country country={country}/>
const CountryName = ({ country, buttonClick }) => {
  const cname = country.name.common
  console.log(cname);
  return (
    <div>
      <p>{cname}
        <button value={cname} onClick={buttonClick}>show!</button>
      </p>
    </div>
  )
}

// näytä maan nimi, area, pääkaupunki, puhutut kielet, lippu
const Country = ({ country }) => {
  //const langList = 
  return (
    <div>
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={country.name.common}></img>
      <p>area: {country.area}</p>
      <p>capital: {country.capital}</p>
      <h2>spoken languages</h2>
      <p>{Object.values(country.languages) + " "}</p>
      <h2>Weather in {country.capital}</h2>
      <p>temperature -666 celsius</p>
      <p>weatherImage goes here</p>
      <p>wind over 9000 m/s</p>
    </div>
  )
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  // hakupalkin handleri
  const searchHandler = (event) => {
    setSearchTerm(event.target.value)
  }


  // näytettävät maat
  const entriesToShow = countries.filter(
    c => c.name.common.toLowerCase().includes(searchTerm)
  )

  //console.log('render', countries.length, 'countrys')
  return (
    <div>
      <Searcher handler={searchHandler} />
      <br />
      <CountryList entries={entriesToShow} />
    </div>
  )
}

export default App