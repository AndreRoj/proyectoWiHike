import React from 'react';
import '../styles/Ruta.css';
import { FaStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Cambia esta línea


export function Ruta({id, imagen, nombre, descripcion, nombreguia, duracion, kilometros, estrellas }) {
    return (
        <Link to={`/info_rutas/${id}`}> {/* Enlace dinámico usando el ID de la ruta */}
            <div className='rutaflex' data-aos="fade-right">
            <div className='ruta-container'>

                <div className='seguidoruta'>
                <div className='ruta-image'>
                    <img src={imagen} alt="Imagen de la ruta" />
                </div>

                <div className='ruta-content'>
                    <div className='ruta-header'>
                        <h1><strong>{nombre}</strong></h1>
                        <div className='rating'>
                            <FaStar />
                            <span>{estrellas}</span>
                        </div>
                    </div>
                    <p className='ruta-description'>
                        {descripcion}
                    </p>
                </div>

                </div>

                <div className='ruta-footer'>
                    <p><strong>{nombreguia}</strong> Guia de senderismo</p>
                    <div className='ruta-details'>
                        <span><FaRegClock />{duracion} min</span>
                        <span><FaRegMap />{kilometros} km</span>
                    </div>
                </div>
            </div>
            </div>
        </Link>
    );
}