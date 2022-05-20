import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

import { App } from './App'; // lo importamos como una constante

render(
  <React.StrictMode>
    <BrowserRouter basename="goscrum/"> 
      <Provider store={store}> 
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
