import { useDispatch } from 'react-redux'
import { filterAnecdotes } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  // const anecdotes = useSelector(state => state.anecdotes)
  const handleChange = (event) => {
    //event.preventDefault()
    // input-kentän arvo muuttujassa event.target.value
    const input = event.target.value
    dispatch(filterAnecdotes(input))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter