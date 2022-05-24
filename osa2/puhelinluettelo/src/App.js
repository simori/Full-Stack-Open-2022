import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personService from './services/personlist'

const App = () => {
  const [persons, setPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  // tilaa newName tarkoitettu lomakkeen kentän kontrollointiin.
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  // tehtävä 2.19-20
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)
  // jos success === true. normiviesti. Jos false, kyseessä on virheviesti

  // tehtävä 2.11
  useEffect(() => {
    personService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
  }, [])

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
    if (event.target.value.length > 0) setShowAll(false)
    else setShowAll(true)
  }

  // näytettävät puhelinluettelon merkinnät
  const entriesToShow = showAll ? persons : persons.filter(
    p => p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // lisätään puhelinluetteloon uusi nimi
  const addEntry = event => {
    event.preventDefault()
    // koostetaan olio lisättävästä henkilöstää
    const newEntry = {
      name: newName,
      number: newNumber
      //,id: persons.length + 1
    }

    // annetaan virheilmoitukset jos nimi tai numerokenttä jätetty tyhjiksi
    if (newEntry.name.length === 0) {
      setMessage('Please enter name')
      setSuccess(false)
      setTimeout(() => {
        setSuccess(true)
        setMessage(null)
      }, 3000)
    }
    else if (newEntry.number.length === 0) {
      setMessage('Please enter number')
      setSuccess(false)
      setTimeout(() => {
        setSuccess(true)
        setMessage(null)
      }, 3000)
    }
    // jos henkilö löytyy jo puhelinluettelosta, kysytään halutaanko numero
    // päivittää.
    else if (persons.find(p => p.name.toLowerCase() === newEntry.name.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook! Do you want `
        + "to replace the old number with a new one?")) {
        const person = persons.find(p => p.name.toLowerCase() === newEntry.name.toLowerCase())
        const changedPerson = { ...person, number: newEntry.number }
        // personServicen käyttö t2.16
        personService
          .update(person.id, changedPerson)
          .then(changedPerson => {
            const newPersons = [...persons];
            newPersons[persons.indexOf(person)] = changedPerson;
            setPersons(newPersons);

            setNewName(() => '')
            setNewNumber(() => '')
            setMessage(`Updated '${person.name}'!`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })

          .catch(error => {
            setSuccess(false)
            setMessage(`the person '${person.name}' was already deleted from server`)
            setTimeout(() => {
              setSuccess(true)
              setMessage(null)
            }, 3000)
          })

      }
    }

    // henkilöä ei löytynyt luettelosta, tehään siis uusi ja lisätään sinne!
    else {
      personService
        .create(newEntry)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))

          setNewName('')
          setNewNumber('')
          setMessage(`Added '${returnedEntry.name}'!`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })

    }
  }

  // yhteystiedon poisto
  const deleteEntry = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm("Delete " + person.name + "?")) {
      personService
        .remove(person.id)
        .then(
          //returnedNote => {
          //setNotes(notes.map(note => note.id !== id ? note : returnedNote))}
          setMessage(`Deleted '${person.name}'!`),
          setTimeout(() => {
            setMessage(null)
          }, 3000),

          setPersons(persons.filter(p => p.id !== person.id))
        )
        // tehtävä 2.20
        .catch(error => {
          setSuccess(false)
          setMessage(`Information of '${person.name}' was already deleted from server`)
          setTimeout(() => {
            setSuccess(true)
            setMessage(null)
          }, 3000)
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={success} message={message} />

      <Filter searchHandler={searchHandler} />

      <h2>Add new entry</h2>
      <PersonForm
        addEntry={addEntry}
        nameHandler={nameHandler}
        numberHandler={numberHandler}
      />

      <h2>Numbers</h2>
      <Persons
        entries={entriesToShow}
        deleteFunc={deleteEntry}
      />
    </div>
  )

}

export default App

/* {entriesToShow.map(e =>
  <Entry
    key={e.id}
    entry={e}
    deleteFunc={() => deleteEntry(e.id)}
  />
)} 

deleteFunc = {() => deleteEntry(persons.map(p => p.id))}
*/