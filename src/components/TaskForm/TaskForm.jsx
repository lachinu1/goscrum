/* eslint-disable no-use-before-define */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './taskform.css';

// import { postTask } from "../../store/actions/tasksActions" // acceso a la acción de obtener tareas
// import { useSelector, useDispatch } from "react-redux"

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export const TaskForm = () => {

    // Redux
    // const dispatch = useDispatch()

    // const { tasks } = useSelector(state => { // trae el estado de la acción de obtener tareas de tasksReducer
	// 	return state.tasksReducer // se obtiene el estado de la acción de getTasks
    // })

    // useEffect(() => {
    //     if (tasks) {
    //         dispatch(postTask(values))
    //     }
    // }, [values, tasks, dispatch])
    
    const initialValues = { // valores iniciales declarados
        title: '',
        status: '',
        importance: '',
        description: ''
    }

    const handleRefresh = () => {
        window.location.reload(false);
    }
 
    const onSubmit = () => {
        fetch(`${API_URL}task`, { // se envía el login a la API (POST)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // se envía el token
            },
            body: JSON.stringify({
                task: values, // se envía el objeto con los datos
            }),
        })
            .then(res => res.json())
            .then(data =>  {
                resetForm(); // se resetea el formulario
                toast.success('Tarea creada'); // se muestra un mensaje de éxito
                handleRefresh(); // se ejecuta la función handleRefresh
            }) 
    }
    
  
    // const onSubmit = postTask(); // se envía el método postTask

    const validationSchema = Yup.object({ // Objeto que contiene las validaciones
        title: Yup.string()
            .min(6, '* La cantidad mínima de caracteres es de 6')
            .required('* El título es requerido'), // Validación de título
        status: Yup.string().required('* El estado es requerido'), // Validación de estado
        importance: Yup.string().required('* La importancia es requerida'), // Validación de importancia       
        description: Yup.string().required('* La descripción es requerida') // Validación de descripción
    })

    const formik = useFormik({ initialValues, onSubmit, validationSchema }) // declaramos formik

    const { handleChange, handleSubmit, errors, touched, handleBlur, values, resetForm } = formik; // desestructuramos values de formik

    return (
        <section className="task-form">
            <h2>Crear Tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={handleSubmit} >
                <div>
                    <div>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Título tarea"
                            className={errors.title ? "error" : ""}
                            value={values.title} // el valor del input es el valor de values.title
                        />
                        {errors.title && touched.title && <span className="error">{errors.title}</span>}
                    </div>
                    <div>
                        <select
                            name="status"
                            id="status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.status ? "error" : ""}
                            value={values.status}
                        >
                            <option value="">Seleccionar estado</option>
                            <option value="NEW">Nueva</option>
                            <option value="IN PROGRESS">En Proceso</option>
                            <option value="FINISHED">Finalizada</option>
                        </select>
                            {errors.status && touched.status && (
                                <span className="error">{errors.status}</span>
                            )}
                    </div>
                    <div>
                        <select
                            name="importance"
                            id="importance"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.importance ? "error" : ""}
                            value={values.importance}
                        >
                            <option value="">Seleccionar prioridad</option>
                            <option value="HIGH">Alta</option>
                            <option value="MEDIUM">Media</option>
                            <option value="LOW">Baja</option>
                        </select>
                        {errors.importance && touched.importance && (
                            <span className="error">{errors.importance}</span>
                        )}
                    </div>
                </div>
                <div className="description">
                    <textarea
                        name="description" 
                        id="description"
                        onChange={handleChange}
                        placeholder="Descripción"
                        onBlur={handleBlur}
                        className={errors.description ? "error" : ""}
                        value={values.description}
                    />
                    {errors.description && touched.description && (
                        <span className="error">{errors.description}</span>
                    )}
                </div>
                <div>
                    <button type="submit">Crear</button>
                </div>
            </form>
            <ToastContainer />
        </section>
    );
}