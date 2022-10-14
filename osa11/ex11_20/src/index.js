//import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, configureStore, combineReducers } from '@reduxjs/toolkit'
// eslint-disable-next-line no-unused-vars
import { Provider } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import App from './App'

import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
