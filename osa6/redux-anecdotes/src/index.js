import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
// import anecdoteService from './services/anecdotes'
// import notificationReducer from './reducers/notificationReducer'
import store from './store'

/* const stor3 = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
})

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})
 */
// console.log('storen state: ',store.getState())

/* anecdoteService.getAll().then(anecs => {
  console.log('anekki index.js ', anecs);
  store.dispatch(setAnecdotes(anecs))
}) */

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
