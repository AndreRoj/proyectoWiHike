import React from 'react';
import '../styles/Ruta.css';
import { FaStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa";

export function Ruta({ imagen }) {
    return (
        <div className='ruta-container'>

            <div className='seguidoruta'>
            <div className='ruta-image'>
                <img src={imagen} alt="Ruta Sabas Nieves" />
            </div>

            <div className='ruta-content'>
                <div className='ruta-header'>
                    <h1><strong>SABAS NIEVES</strong></h1>
                    <div className='rating'>
                        <FaStar />
                        <span>4.5</span>
                    </div>
                </div>
                <p className='ruta-description'>
                    Ruta de ida y vuelta cerca de Municipio Sucre, Miranda. Se considera una ruta moderada. Es una región muy popular para el senderismo y pasear por lo que es probable encontrarse con otras personas mientras se está por la zona.
                </p>
            </div>

            </div>

            <div className='ruta-footer'>
                <p><strong>Jose Fernandez</strong> Guia de senderismo</p>
                <div className='ruta-details'>
                    <span><FaRegClock /> 1 h 55 min</span>
                    <span><FaRegMap />39 km</span>
                </div>
            </div>
        </div>
    );
}