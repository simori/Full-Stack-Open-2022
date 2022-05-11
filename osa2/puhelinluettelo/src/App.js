import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  // tilaa newName tarkoitettu lomakkeen kentän kontrollointiin.
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // nimen handleri
  const nameHandler = (event) => {
    setNewName(event.target.value)
  }

  // numeron handleri
  const numberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  // hakupalkin handleri
  const searchHandler = (event) => {
    setSearchTerm(event.target.value)
  }

  // näytettävät puhelinluettelon merkinnät
  const entriesToShow = persons.filter(
    p => p.name.toLowerCase().includes(searchTerm) || 
         p.number.includes(searchTerm)
  )

  // lisätään puhelinluetteloon uusi nimi
  function addEntry(event) {
    event.preventDefault()
    // koostetaan olio lisättävästä henkilöstä
    const newEntry = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    // pusketaan olio henkilöjoukon jatkoksi
    // tehtävä 2.7: paitsi jos se löytyy jo listasta!
    // siinä tapauksessa näytetään vain viesti että nimi löytyy jo luettelosta

    if (persons.find(p => p.name.toLowerCase() === newEntry.name.toLowerCase())) {
      alert(`${newName} is already added to phonebook!`)
    }
    else {
      setPersons(persons.concat(newEntry))
    }
    // kentät ei jostain syystä tyhjene kun luetteloon tehdään lisäys (tunnettubugi)
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchHandler={searchHandler}/>

      <h2>Add new entry</h2>
      <PersonForm 
        addEntry={addEntry}
        nameHandler={nameHandler}
        numberHandler={numberHandler}
      />

      <h2>Numbers</h2>
      <Persons entries={entriesToShow}/>
    </div>
  )

}

export default App
