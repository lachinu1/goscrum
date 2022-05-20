import { lazy, Suspense  } from 'react'; // Importa el componente de react-loadable
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';


import { Login } from './components/pages/auth/Login/Login';
import { Register } from './components/pages/auth/Register/Register';
import Registered from './components/pages/Registered/Registered';
import { Tasks } from './components/pages/Tasks/Tasks';
import { Donate } from './components/pages/Donate/Donate';

const  Error404 = lazy( ()=> import('./components/pages/Error404/Error404')) 


// Componente que verifica si el usuario está token
const RequireAuth = ({ children }) => { // recibe como parámetro el componente hijo que se quiere renderizar 
    if (!localStorage.getItem('token')) { // Si no está token
        return <Navigate to='/' replace={true} /> // Redirecciona al login
    }
    return children; // Si está token, renderiza el componente hijo (EN ÉSTA CASO ES TASKS)
}

// Creamos el objeto que maneja las transiciones 
const pageTransition = {
    in: { opacity: 1 },
    out: { opacity: 0 },
}

export const App = () => {

    const location = useLocation(); // Usamos el hook useLocation para obtener la ruta actual

    return (
        <>
         <AnimatePresence>  {/* Componente que permite animar componentes que se eliminan o se agregan */}
            <Routes location={location} key={location.pathname}> {/* Rutas que se renderizan */}
                <Route
                    path="/"
                    element={
                        <motion.div
                            className="page"
                            initial="out"
                            animate="in"
                            exit="out"
                            variants={pageTransition}
                        >
                            <Login />
                        </motion.div>
                    }
                />
                <Route
                    path="/registro"
                    element={
                        <motion.div
                            className="page"
                            initial="out"
                            animate="in"
                            exit="out"
                            variants={pageTransition} 
                        >
                            <Register / >
                        </motion.div>
                    }
                />    
                <Route
                    path="/registrado/:teamID"
                    element={
                        <motion.div
                            className="page"
                            initial="out"
                            animate="in"
                            exit="out"
                            variants={pageTransition} 
                        >
                            <Registered / >
                        </motion.div>
                    }
                />  
                <Route
                    path="*"
                    element={
                        <motion.div
                            className="page"
                            initial="out"
                            animate="in"
                            exit="out"
                            variants={pageTransition}
                        >
                            <Suspense fallback={<>...</>}> {/* Si no se carga el componente, se muestra el componente de carga */}
                                <Error404 />
                            </Suspense>
                        </motion.div>
                    }
                />
                <Route
                    path="/tareas"
                    element={
                        <RequireAuth>
                            <motion.div
                                className="page"
                                initial="out"
                                animate="in"
                                exit="out"
                                variants={pageTransition}
                            >
                                <Tasks />
                            </motion.div>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/donar"
                    element={
                        <RequireAuth>
                            <motion.div
                                className="page"
                                initial="out"
                                animate="in"
                                exit="out"
                                variants={pageTransition}
                            >
                                <Donate />
                            </motion.div>
                        </RequireAuth>
                    }
                />
            </Routes>
        </AnimatePresence>
        </>
      );  
}

    
    
