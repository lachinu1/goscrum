import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

import { App } from './App'; // lo importamos como una constante

render(
  <React.StrictMode>
    <HashRouter> 
      <Provider store={store}> 
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
