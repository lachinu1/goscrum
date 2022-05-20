import { render, screen } from "@testing-library/react"; 
import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { Register } from './Register'; 

// Servidor Mockeado - simula ser la respuesta de la API
const server = setupServer ( // va a ser un Get al endpoint de la API
    rest.get("https://goscrum-api.alkemy.org/auth/data", ( _, res, ctx) => {
        return res(ctx.json({
            result: {
                "continente": [ "America", "Europa", "Otro" ],
                "region": [ "Otro", "Latam", "Brasil", "America del Norte" ],
                "Rol": [ "Team Member", "Team Leader" ]
            }
        }));
    }),
)

beforeAll(() => server.listen()); // inicia el servidor a la escucha
afterAll(() => server.close()); // cerrar el servidor


it("fetch options", async() => {
    render(<Register />, { wrapper: MemoryRouter}) // renderiza el componente

    expect(screen.getByRole("option", { name: "Selecciona un Rol..." }) // test unitario 
    ).toBeInTheDocument();

     expect(await screen.findByRole("option", { name: "Europa" }) // tests mockeado 
    ).toBeInTheDocument();
})