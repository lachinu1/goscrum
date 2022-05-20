import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from '../types';

const initialState = { // creamos el valor inicial
    loading: false,
    tasks: [],
    error: "",
}

// funcion reductora que recibe el estado y la acción
export const tasksReducer = (state = initialState, action) => { //  va a actualizar el estado para darselo al store para que pueda ser consumida
    switch (action.type) { // switch para saber qué tipo de acción se está ejecutando
        case TASKS_REQUEST: // si la acción es de solicitud de tareas
            return { // retornamos el estado actual
                ...state, // le pasamos el estado actual
                loading: true, // le pasamos el loading
            }
        case TASKS_SUCCESS: // si la acción es de tareas exitosas
            return {
                ...state, 
                loading: false,
                tasks: action.payload, // le pasamos las tareas
            }
        case TASKS_FAILURE: // si la acción es de tareas falla
            return {
                ...state,
                loading: false, 
                error: action.payload, // le pasamos el error
            }
        default:
            return state; // si no se cumple ninguna de las condiciones, devolvemos el estado inicial
    }
}