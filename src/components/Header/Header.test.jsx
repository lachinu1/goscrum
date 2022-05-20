
import { render, screen } from "@testing-library/react"; 
import { MemoryRouter } from "react-router-dom";


import { Header } from './Header'; 


it("renderiza un span", () => {
    render(<Header />, { wrapper: MemoryRouter })
    
    expect(screen.getByRole("span") // test unitario 
    ).toBeInTheDocument();

})