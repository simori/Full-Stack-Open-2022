// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
			filter <input onChange={(e) => props.filterAnecdotes(e.target.value)} />
    </div>
  )
}
const mapStateToProps = (state) => {
  if (state.filter === '') {
    console.log('mapstatetoprops filter state.anecdotes:', state)
    return { anecdotes: state.anecdotes }
  }
  console.log('mapstatetoprops filtteröidään: ', state)
  return {
    anecdotes: state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.content.toLowerCase())
    )
  }
}

const mapDispatchToProps = {
  filterAnecdotes
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter
