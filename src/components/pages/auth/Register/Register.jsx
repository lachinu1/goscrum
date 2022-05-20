/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Estilos
import '../auth.css';

const { REACT_APP_API_ENDPOINT: API_URL } = process.env; // API_URL variable de entorno

export const Register = () => {

    const [data, setData] = useState(); // Datos del usuario que se va a registrar
    
    const navigate = useNavigate(); // Hook para navegar entre páginas

    useEffect(() => {
        fetch(`${API_URL}auth/data`) // se pide la data de la API para poder registrar un usuario (GET) con variables de entorno
            .then(res => res.json())
            .then(data => setData(data?.result));
    }, []);


    const initialValues = { // valores iniciales declarados del Form (Formik)
        userName: '',
        password: '',
        email: '',
        teamID: '',
        role: '',
        continent: '',
        region: '',
        switch: false
    }

    const onSubmit = () => {
        const teamID = !values.teamID ? uuidv4() : values.teamID; // si no hay un id de equipo, se genera uno nuevo

        fetch(`${API_URL}auth/register`, { // se envía el registro a la API (POST)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    userName: values.userName, // se envía el nombre de usuario
                    password: values.password, // se envía la contraseña
                    email: values.email, // se envía el email
                    teamID, // se envía el id de equipo
                    role: values.role,  // se envía el rol
                    continent: values.continent, // se envía el continente
                    region: values.region, // se envía la región
                },
            }),
        })
            .then(res => res.json())
            .then(data => navigate('/registrado/' + data?.result?.user?.teamID, {
                replace: true
            }));
    }

    const handleChangeContinent = (value) => { // cambia el continente
        setFieldValue('continent', value); // setea el nuevo valor de continente
        if (value !== 'America')
            setFieldValue("region", "Otro") // si el continente no es America, se setea la región a Otro
    }

    const validationSchema = Yup.object({ // Objeto que contiene las validaciones
        userName: Yup.string()
            .min(6, '* La cantidad mínima de caracteres es de 6')
            .required('El Nombre de Usuario es requerido'),
        password: Yup.string().required('La Contraseña es requerida'),
        email: Yup.string().email('Debe ingresar un Email válido').required('El email es requerido'),
        // teamID: Yup.string().required('El ID de equipo es requerido'),
        role: Yup.string().required('El Rol es requerido'),
        continent: Yup.string().required('El Continente es requerido'),
        region: Yup.string().required('La Región es requerida')
    })

    const formik = useFormik({ initialValues, onSubmit, validationSchema }) // declaramos formik e initialValues

    const { handleChange, handleSubmit, errors, touched, handleBlur, values, setFieldValue } = formik; // desestructuramos values de formik

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div>
                    <label>Nombre de Usuario</label>
                    <input className={errors.userName ? "error" : ""} type="text" name="userName" id="userName" onChange={handleChange} onBlur={handleBlur} value={values.userName} />
                    {errors.userName && touched.userName && <span className="error">{errors.userName}</span>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input className={errors.password ? "error" : ""} type="password" name="password" id="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                    {errors.password && touched.password && <span className="error">{errors.password}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input className={errors.email ? "error" : ""} type="email" name="email" id="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                    {errors.email && touched.email && <span className="error">{errors.email}</span>}
                </div>
                <FormControlLabel // Switch para el ID de equipo
                    control={
                        <Switch
                           value={values.switch}
                            onChange={() => 
                                formik.setFieldValue('switch', !formik.values.switch)
                            }
                            name="switch"
                            color="secondary"
                        />
                    }
                    label="Pertenecés al equipo creado"
                />
                {values.switch && ( // Si el switch está activado entonces se muestra el ID de equipo
                <div>
                    <label>Por favor introduce el identificador de equipo</label>
                    <input
                        className={errors.teamID ? "error" : ""}
                        type="type"
                        name="teamID"
                        id="teamID"
                        onChange={handleChange}
                        value={values.teamID}
                    />
                </div>
                )} 
                <div>
                    <label>Rol</label>
                    <select
                        className={errors.role ? "error" : ""}
                        name="role"
                        id="role"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rol}
                    >
                        <option value="">Selecciona un Rol...</option>
                        { data?.Rol?.map(option =>
                            <option key={option} value={option}>{option}</option>) // mapeamos los Roles de la API
                        } 
                    </select>
                    {errors.role && touched.role && <span className="error">{errors.role}</span>}
                </div>
                <div>
                    <label>Continente</label>
                    <select
                        className={errors.continent ? "error" : ""}
                        name="continent"
                        id="continent"
                        onChange={event => 
                            handleChangeContinent(event.currentTarget.value)} // cambia el continente
                        onBlur={handleBlur}
                        value={values.continent}
                    >
                        <option value="">Selecciona un Continente...</option>
                        { data?.continente?.map(option =>
                            <option key={option} value={option}>{option}</option>)  // mapeamos los Continentes de la API 
                        }
                    </select>
                    {errors.continent && touched.continent && <span className="error">{errors.continent}</span>}
                </div>
                {values.continent === 'America' && ( // Si el Continente es America, se muestra la región
                <div>
                    <label>Region</label>
                    <select
                        className={errors.region ? "error" : ""}
                        name="region"
                        id="region"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.region}
                    >
                        <option value="">Selecciona una Region...</option>
                        {data?.region?.map(option => <option key={option} value={option}>{option}</option>)} {/* mapeamos las Regiones de la API */}
                    </select>
                    {errors.region && touched.region && <span className="error">{errors.region}</span>}
                </div>
                )}
                <div>
                    <button type="submit">Enviar</button>
                </div>
                <div>
                    <Link to="/login"><span>Ir a Iniciar Sesión</span></Link>
                </div>
            </form>
        </div>
    );
}