import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, emptyNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    /* console.log('AnedoteListin state:', state);
    console.log('AnedoteListin state.anecdotes:', state.anecdotes);
    console.log('AnedoteListin state.filter:', state.filter);
    console.log('AnedoteListin state.notificationin typeof:', typeof state.notification); */
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(
      a => a.content.toLowerCase().includes(state.filter.content.toLowerCase())
    )
  })

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted for "${anecdote.content}"!`))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 5000)
  }

  return (
    <div>
      {[...anecdotes].sort((a, b) => { return b.votes - a.votes })
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={ 
                () => {
                  handleVote(anecdote)
                }
              }>
                vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList