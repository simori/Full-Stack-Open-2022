import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, emptyNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  const create = (event) => {
    event.preventDefault()
    const contents = event.target.content.value
    event.target.content.value = ''
    console.log('creating anecdote!', contents)
    dispatch(createAnecdote(contents))

    dispatch(setNotification(`New anecdote "${contents}" created!`))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 5000)
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

export default AnecdoteForm