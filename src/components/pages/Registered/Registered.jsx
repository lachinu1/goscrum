import React from 'react';
import { useParams } from 'react-router-dom';

import './registered.css';

export default function Registered() {

    const { teamID } = useParams(); // se obtiene el id del equipo
    
    return (
        <div className="container">
            El team ID de tu equipo es: {teamID}
        </div>
    );
}
