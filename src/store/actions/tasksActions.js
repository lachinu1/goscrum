// Función Actions - emulamos las acciones que se ejecutarán en el store (el primer fetch para traer las tareas
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from '../types'; // importamos los tipos de acciones

const { REACT_APP_API_ENDPOINT: API_URL } = process.env; // leemos el valor de la variable de entorno

export const tasksRequest = () => ({ // creamos la acción que trae las tareas
    type: TASKS_REQUEST, // le pasamos el tipo de acción que va a generar el loading
})

export const tasksSuccess = (data) => ({ // le pasamos la data que viene del fetch
    type: TASKS_SUCCESS,
    payload: data, // contenido que envía junto al tipo
})

export const tasksFailure = (data) => ({
    type: TASKS_FAILURE,
    payload: data,
})

export const getTasks = (path) => dispatch => { // creamos la acción que se ejecutará en el store
    dispatch(tasksRequest()); // ejecutamos la acción de solicitud de tareas
    fetch(`${API_URL}task${path}`, { // hacemos un fetch a la url, el path indica si son mis tareas o las de mis compañeros
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // le pasamos el token al header
            },
        })
        .then(response => response.json()) // leemos la respuesta y la convertimos a json
        .then(data => {
            dispatch(tasksSuccess(data.result)) // si todo sale bien
        })
        .catch(error => dispatch(tasksFailure(error))) // si hay un error
}

export const deleteTask = id => dispatch => { // creamos la acción que se ejecutará en el store
    dispatch(tasksRequest()); // ejecutamos la acción de solicitud de tareas
    fetch(`${API_URL}task/${id}`, { // hacemos un fetch a la url, el id indica la tarea a eliminar
            method: "DELETE", // le pasamos el método de borrado
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // le pasamos el token al header
            },
        })
        .then(response => response.json()) // leemos la respuesta y la convertimos a json
        .then(() => { 
            dispatch(getTasks("")) // si todo sale bien, ejecutamos la acción de traer las tareas
            toast.success("Tarea eliminada"); // mostramos un toast de éxito
        }) 
        .catch(error => dispatch(tasksFailure(error))) // si hay un error
}

export const editTaskStatus = data => dispatch => { // creamos la acción que se ejecutará en el store

    const statusArray = ["NEW", "IN PROGRESS", "FINISHED"]; // creamos un array con los posibles estados

    const newStatusIndex =
        statusArray.indexOf(data.status) > 1 // si el nuevo estado es mayor a 1
        ?
        0 // si el nuevo estado es mayor a 1, devolvemos el primer índice
        :
        statusArray.indexOf(data.status) + 1 // si no, devolvemos el siguiente

    fetch(`${API_URL}task/${data._id}`, { // hacemos un fetch a la url, el id indica la tarea a EDITAR
            method: "PATCH", // le pasamos el método de patch
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // le pasamos el token al header
            },
            body: JSON.stringify({ // le pasamos el body con el estado de la tarea
                task: {
                    title: data.title,
                    importance: data.importance,
                    status: statusArray[newStatusIndex], // pasamos el array con los posibles estados y el índice del nuevo estado
                    description: data.description,
                },
            }),
        })
        .then(response => response.json()) // leemos la respuesta y la convertimos a json
        .then(() => dispatch(getTasks(""))) // si todo sale bien, ejecutamos la acción de traer las tareas
        .catch(error => dispatch(tasksFailure(error))) // si hay un error
}
