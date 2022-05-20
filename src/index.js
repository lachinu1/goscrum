import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { App } from './App'; // lo importamos como una constante

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';


render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> 
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
