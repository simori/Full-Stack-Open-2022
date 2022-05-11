const PersonForm = (props) => {
  
    return (
      <form onSubmit={props.addEntry}>
        <div>
          name: <input value={props.newName} onChange={props.nameHandler} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm