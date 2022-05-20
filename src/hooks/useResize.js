import { useEffect, useState } from 'react';


// Hook to resize the window
export const useResize = () => {

    // Seteamos el estado inicial
    const [ isPhone, setIsPhone ] = useState(
        window.innerWidth < 900 ? true : false
    ) // Si es un movil o no

    // Detecta si es un movil o no
    const handleResize = () => {
        if (window.innerWidth < 900) setIsPhone(true) 
        else setIsPhone(false)
    }

    useEffect(() => { // Si el tamaño es menor a 900px, cambia el estado de isPhone
        handleResize() // Se ejecuta la funcion
        window.addEventListener('resize', handleResize) // Se ejecuta la funcion cada vez que se redimensiona la pantalla
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
    return { isPhone } // Retorna el estado
}