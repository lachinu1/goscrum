
import Swal from 'sweetalert2';


export const swal = () => {


    return (

        Swal.fire({
            title: 'Credenciales inválidas',
            text: 'Por favor, verificá tus datos',
            confirmButtonColor: '#ff834f',
            confirmButtonText: 'Aceptar',
            timerProgressBar: true,
            width: '400px',
        })
    )
}
    
    