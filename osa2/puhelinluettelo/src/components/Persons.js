import Entry from "../components/Entry"

const Persons = ({ entries }) => {
    return (
        <ul>
        {entries.map(p =>
          <Entry key={p.id} entry={p} />
        )}
      </ul>
    )
}


export default Persons