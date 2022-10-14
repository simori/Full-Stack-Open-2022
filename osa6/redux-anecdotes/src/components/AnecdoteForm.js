
import { connect } from 'react-redux'
import { insertAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const contents = event.target.content.value
    event.target.content.value = ''
    console.log('creating anecdote!', contents)
    
    props.insertAnecdote(contents)
    props.setNotification(`New anecdote "${contents}" created!`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='content' /></div>
        <button
          onClick={
            () => {
              console.log('submitted')
            }
          }
          type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null, 
  { insertAnecdote, setNotification }
)(AnecdoteForm)