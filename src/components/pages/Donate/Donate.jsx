import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./donate.css";

import { Button, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export const Donate = () => {

    const navigate = useNavigate();

    return (
        <>
            <main>
                <div className="container-button">
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate("/tareas", { replace: true })}
                >
                    <Typography textAlign="center">
                        <ArrowCircleLeftIcon />
                        Volver
                    </Typography>
                </Button>

                </div>
                
                <section className="donate">
                    <h1>Colaborá con el proyecto</h1>
                    <a href="https://mpago.la/1TqSfiP" target="_blank" rel="noreferrer">Hacé tu donación</a>
                </section>
            </main>
        </>
        
    );
}