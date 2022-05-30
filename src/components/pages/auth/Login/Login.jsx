/* eslint-disable no-unused-vars */
import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';


import { swal } from '../../../../utils/swal';

// Estilos
import '../auth.css';

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export const Login = () => {

    const navigate = useNavigate(); // Hook para navegar entre páginas

    const initialValues = { // valores iniciales declarados
        userName: '',
        password: ''
    }

    // const validate = (values) => { // validación de los campos
    //     const errors = {};

    //     if (!values.userName) {
    //         errors.userName = 'El nombre de usuario es requerido';
    //     }

    //     if (!values.password) {
    //         errors.password = 'La contraseña es requerida';
    //     }
    //     return errors; // retorna la función errors para que se muestre en el componente
    // }

    const validationSchema = Yup.object({ // Objeto que contiene las validaciones
        userName: Yup.string()
            .min(6, '* La cantidad mínima de caracteres es de 6')
            .required('* El nombre de usuario es requerido'),
        password: Yup.string().required('* La contraseña es requerida')
    })

    const onSubmit = () => {
        const { userName, password } = values;

        fetch(`${API_URL}auth/login`, { // se envía el login a la API (POST)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName, // se envía el nombre de usuario
                password, // se envía la contraseña
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status_code === 200) {
                    localStorage.setItem('token', data?.result?.token) // guarda el token en el localStorage
                    localStorage.setItem('userName', data?.result?.user.userName) // guarda el userName en el localStorage
                    navigate('/tareas', { replace: true }) // navega a la página principal
                } else {
                    swal() // muestra el mensaje de error
                }
            })
    }


    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const { handleChange, handleSubmit, errors, touched, handleBlur, values } = formik;

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Iniciar Sesión</h1>
                <div>
                    <label>Nombre de Usuario</label>
                    <input
                        className={errors.userName ? "error" : ""}
                        type="userName"
                        name="userName"
                        id="userName"
                        onChange={handleChange}
                        value={values.userName}
                        onBlur={handleBlur}
                    />
                    {errors.userName && touched.userName && <span className="error">{errors.userName}</span>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        className={errors.password ? "error" : ""}
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}
                    />
                    {errors.password && touched.password &&<span className="error">{errors.password}</span>}
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
                <div>
                    <Link to="/registro">Registrarme</Link>
                </div>
            </form>
        </div>
    );
}