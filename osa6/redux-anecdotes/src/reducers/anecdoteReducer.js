import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []
//anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const voted = state.find(a => a.id === id)
      const newObj = { ...voted, votes: voted.votes + 1 }  
      return state.map(a =>
        a.id !== id ? a : newObj
      )
    case 'CREATE':
      console.log('luodaan', action.data.content);
      return state.concat(asObject(action.data.content))
    case 'GET_ALL':
      console.log('GET_ALL', action);
      return state.concat(action.data)
    default:
      return state
  }
}

// actioncreatorit anekdootin äänestykselle...
export const voteAnecdote = (data) => {
  return {
    type: 'VOTE',
    data: data
  }
}

// ...ja luomiselle
export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: content
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecs))
  }
}


export const setAnecdotes = (state, action) => {
  // console.log('sstaten payloadi',state.payload);
  return {
    type: 'GET_ALL',
    data: state.payload 
  }
}

// 6.16
export const insertAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    console.log('insertataan anecdootti', newAnec);
    dispatch(createAnecdote(newAnec))
  }
}

// 6.17
export const voteAnecdoteThunk = (id, anec) => {
  console.log('voteThunk anec:', anec, id);
  return async dispatch => {
    const newAnec = await anecdoteService.vote(id, anec)
    dispatch(voteAnecdote(newAnec))
  }
}

export default anecdoteReducer