import React from "react";
import "../styles/InfoRuta.css"
import { FaStar } from "react-icons/fa";

export function InfoRuta({nombre, estrellas, imagenPrincipal, imagen2, imagen3}) {
    return (
        <div className="rutaInfo-content" syte>
                <h1 className="nombreRuta">{nombre}</h1>
            <div className='rating'>
                <FaStar />
                <span>{estrellas}</span>
            </div>
            <div className="gallery">
                <div className="main-imag">
                    <img src={imagenPrincipal} alt="Imagen principal" />
                </div>
                <div className="side-imag">
                    <img src={imagen2} alt="Imagen lateral 1" />   
                    <img src={imagen3} alt="Imagen lateral 2" />
                </div>
            </div>
            
        </div>
    );
}