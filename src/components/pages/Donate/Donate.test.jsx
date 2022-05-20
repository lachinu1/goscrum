import { render, screen } from "@testing-library/react"; 
import { MemoryRouter } from "react-router-dom";
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Donate } from './Donate'; 


describe("renderizado en Donate", () => { // Arupa todos los Tests
    it('renderiza un h1', () => { // it es un test, una función que tiene dos argumentos: el nombre del test y la función que se ejecuta
        render(<Donate />, { wrapper: MemoryRouter})
    
        expect(screen.getByRole("heading", {
            level: 1,
            name: "Colaborá con el proyecto",
        })
        ).toBeInTheDocument(); // expect es una función que tiene dos argumentos: el resultado que queremos que devuelva la función y el mensaje que queremos que muestre si el resultado no es el esperado
    })
      

    it("renderiza un a", () => {
        render(<Donate />);
    
        expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            "https://mpago.la/1TqSfiP"
        ); // si lo tiene, tiene el atributo href
    })
})

    


// 1- La función describe() agrupa tests de una unidad de código y como parámetros tendremos la descripción
// de lo que iremos a testear y un callback donde tendremos todos nuestros tests.

// 2- La función it() es donde realizaremos el test y al igual que la función describe() recibe una descripción
// del test y una función para configurar el test.

// 3- Realizamos nuestros assertions para verificar que nuestro código funcione de manera correcta,
// en este caso usamos la función expect() que recibe un valor y nos devuelve un objeto de tipo expectation 
// que nos da la posibilidad de usar matchers los cuales son una serie de funciones que nos permite verificar 
// el valor obtenido en el expect() de diferentes formas.