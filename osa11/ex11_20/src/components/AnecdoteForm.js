// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { insertAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()
  const create = async (event) => {
    event.preventDefault()
    const contents = event.target.content.value
    event.target.content.value = ''
    console.log('creating anecdote!', contents)
    //const newAnecdote = await anecdoteService.createNew(contents)
    //dispatch(insertAnecdote(contents))

    props.insertAnecdote(contents)
    props.setNotification(`New anecdote "${contents}" created!`, 5)
    //dispatch(setNotification(`New anecdote "${contents}" created!`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="content" />
        </div>
        <button
          onClick={() => {
            console.log('submitted')
          }}
          type="submit"
        >
					create
        </button>
      </form>
    </div>
  )
}

/* const mapDispatchToProps = (state) => {
  insertAnecdote,
  setNotification,
} */

/* const ConnectedAnecdoteForm = connect(mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm */
export default connect(null, { insertAnecdote, setNotification })(AnecdoteForm)
//export default AnecdoteForm
