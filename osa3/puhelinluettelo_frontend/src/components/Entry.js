const Entry = ({entry, deleteFunc}) => {
    return (
      <li>
      {entry.name} {entry.number} <button onClick={() => deleteFunc(entry.id)}> delete me </button>
      </li>
    )
}

export default Entry