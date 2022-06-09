import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios'
import App from './App';
import reportWebVitals from './reportWebVitals';

const baseUrl = '/api/persons'

axios
  .get(baseUrl)
  .then(response => {
    console.log(response)
    const persons = response.data
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
     //<React.StrictMode>
        <App persons={persons} />
      //</React.StrictMode>
    )
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();