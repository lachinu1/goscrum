// Función store

import { applyMiddleware, legacy_createStore } from 'redux'; // importamos la libreria para crear el store
import thunk from 'redux-thunk'; // importamos la libreria para poder usar el middleware
import { composeWithDevTools } from '@redux-devtools/extension'; 

import rootReducer from './reducers/rootReducer'; // importamos el reducer principal

export const store = legacy_createStore( // exportamos la const que tiene una función con dos argumentos
    rootReducer, // le pasamos el reducer principal
    composeWithDevTools(applyMiddleware(thunk)) // le pasamos el middleware
);

