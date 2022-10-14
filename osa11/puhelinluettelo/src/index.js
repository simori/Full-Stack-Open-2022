import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';

const baseUrl = '/api/persons';

axios
  .get(baseUrl)
  .then((response) => {
    console.log(response);
    const persons = response.data;
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <App persons={persons} />,
    );
  });
