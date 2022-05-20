// Función que acumula todos los Reducers

import { combineReducers } from 'redux'; // importamos la libreria para combinar los reducers
import { tasksReducer } from './tasksReducer'; // importamos el reducer de las tareas

const rootReducer = combineReducers({ // creamos el reducer principal
    tasksReducer, // le pasamos el reducer de las tareas
});

export default rootReducer; // exportamos el reducer principal

