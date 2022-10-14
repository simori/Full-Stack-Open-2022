import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteThunk } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    /* console.log('AnedoteListin state:', state);
    console.log('AnedoteListin state.anecdotes:', state.anecdotes);
    console.log('AnedoteListin state.filter:', state.filter);
    console.log('AnedoteListin state.notificationin typeof:', typeof state.notification); */

    if (state.filter === '') {
      //console.log('App. js state.anecdotes:', state.anecdotes);
      return state.anecdotes
    }
    console.log('filtteröidään: ', state)
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.content.toLowerCase())
    )
  })

  const handleVote = (anecdote) => {
    dispatch(voteAnecdoteThunk(anecdote.id, anecdote))
    dispatch(setNotification(`You voted for "${anecdote.content}"!`, 5))
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => {
          return b.votes - a.votes
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
							has {anecdote.votes}
              <button
                onClick={() => {
                  handleVote(anecdote)
                }}
              >
								vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
