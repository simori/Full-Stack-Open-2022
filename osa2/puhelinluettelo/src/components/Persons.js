import Entry from "../components/Entry"
/* import setMessage from "../App"
import setSuccess from "../App"
import setPersons from "../App"
import persons from "../App"

import personService from '../services/personlist' */


const Persons = ({ entries, deleteFunc }) => {
  return (
    <ul>
      {entries.map(p =>
        <Entry key={p.id} entry={p} deleteFunc={deleteFunc} />
      )}
    </ul>
  )
}



export default Persons