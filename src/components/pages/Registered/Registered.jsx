import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './registered.css';

import { Button, Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

export default function Registered() {

    const { teamID } = useParams(); // se obtiene el id del equipo
    const navigate = useNavigate();

    return (
        <>
            <div className="container-button">
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate("/login", { replace: true })}
                >
                    <Typography textAlign="center">
                        <ArrowCircleRightIcon />
                        Ir a Login
                    </Typography>
                </Button>
            </div>
            <div className="container">
                El team ID de tu equipo es: {teamID}
            </div>
        </>
    );
}
