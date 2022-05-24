import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

// hakupalkki
const Searcher = ({ handler }) => {
  return (
    <p>find countries! <input onChange={handler} /></p>
  )
}

// maiden listaus
// jos hakuehdon täyttäviä maita yli 10, käske tarkentamaan
// jos [1...10] listaa maiden nimet
const CountryList = ({ entries, handler }) => {
  if (entries.length == 0) return (
    <p>No results!</p>
  )
  else if (entries.length > 10) return (
    <p>Too many results! Please specify another filter!</p>
  )
  // 2-10 maata, näytä kyseisten maiden nimet
  else if (entries.length > 1 && entries.length <= 10) return (
    <div>
      {entries.map(e =>
        <CountryName key={e.name.official} country={e} buttonClick={handler} />
      )}
    </div>
  )
  // yksi maa, näytä sen tiedot
  return (
    <div>
      {entries.map(e =>
        <Country key={e.name.official} country={e} />
      )}
    </div>
  )
}

// komponentti joka renderöi maan nimen ja sen tiedot näyttävän painikkeen
const CountryName = ({ country, buttonClick }) => {
  const cname = country.name.common
  return (
    <div>
      <p>{cname}
        <button value={cname} onClick={buttonClick}>show!</button>
      </p>
    </div>
  )
}

// näytä maan nimi, pinta-ala, pääkaupunki, puhutut kielet, lippu
// 2.14: pääkaupungin säätiedotus: lämpötila, sääikoni, tuuli
const Country = ({ country }) => {
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [img, setImg] = useState('')

  // haetaan maan pääkaupungin säätiedot openweathermapista axioksen avulla
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
    .then(response => {
      setTemp((response.data.main.temp - 273.15).toFixed(2));
      setWind(response.data.wind.speed);
      setImg("http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png");
    })

  return (
    <div>
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={country.name.common}></img>
      <p>area: {country.area}</p>
      <p>capital: {country.capital}</p>
      <h2>spoken languages</h2>
      <p>{Object.values(country.languages) + " "}</p>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temp} celsius</p>
      <p><img src={img} alt="sää" /></p>
      <p>wind {wind} m/s</p>
    </div>
  )
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    // console.log("apikey on",api_key)
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // hakupalkin handleri
  const searchHandler = (event) => {
    setSearchTerm(event.target.value)
  }

  // maan näyttämispainikkeen händleri
  // tarvii refreshin että voi käyttää uudelleen hakua (bug)
  const buttonClickHandler = (e) => {
    setCountries(
      [countries.find(
        c => c.name.common === e.target.value
      )]
    )
    console.log("searchterm", searchTerm.length);
    if (searchTerm.length == 0) {
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
    }
  }

  // näytettävät maat
  const entriesToShow = countries.filter(
    c => c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Searcher handler={searchHandler} />
      <br />
      <CountryList entries={entriesToShow} handler={buttonClickHandler} />
    </div>
  )
}

export default App

