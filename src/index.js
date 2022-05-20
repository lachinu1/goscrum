import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { App } from './App'; // lo importamos como una constante

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';


render(
  <React.StrictMode>
    <HashRouter> {/* basename es para que las rutas aparezcan completas */}
      <Provider store={store}> 
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
