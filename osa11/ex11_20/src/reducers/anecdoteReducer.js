import anecdoteService from '../services/anecdotes'

/* const anecdotesAtStart = [
  'If it hurts, do it more often!',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
] */

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
})

const initialState = []
// anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'VOTE': {
    const { id } = action.data
    const voted = state.find((a) => a.id === id)
    console.log('voted objecti on', voted, 'id on', id)
    const newObj = { ...voted, votes: voted.votes + 1 }

    return state.map((a) => (a.id !== id ? a : newObj))
  }
  case 'CREATE':
    console.log('luodaan', action.data.content)
    return state.concat(asObject(action.data.content))
  case 'GET_ALL':
    console.log('GET_ALL', action)
    return state.concat(action.data)
  default:
    return state
  }
}

// actioncreatorit anekdootin äänestykselle...
export const voteAnecdote = (data) => ({
  type: 'VOTE',
  data,
})

// ...ja luomiselle
export const createAnecdote = (content) => ({
  type: 'CREATE',
  data: content,
})

export const initializeAnecdotes = () => async (dispatch) => {
  const anecs = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecs))
}

export const setAnecdotes = (state) =>
// console.log('sstaten payloadi',state.payload);
  ({
    type: 'GET_ALL',
    data: state.payload,
  })


// 6.16
export const insertAnecdote = (content) => async (dispatch) => {
  const newAnec = await anecdoteService.createNew(content)
  console.log('insertataan anecdootti', newAnec)
  dispatch(createAnecdote(newAnec))
}

// 6.17
export const voteAnecdoteThunk = (id, anec) => {
  console.log('voteThunk anec:', anec, id)
  return async (dispatch) => {
    const newAnec = await anecdoteService.vote(id, anec)
    dispatch(voteAnecdote(newAnec))
  }
}

export default anecdoteReducer
