const PersonForm = (props) => {
  
    return (
      <form onSubmit={props.addEntry}>
        <div>
          name: <input type="text" onChange={props.nameHandler} />
        </div>
        <div>
          number: <input type="text" onChange={props.numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm