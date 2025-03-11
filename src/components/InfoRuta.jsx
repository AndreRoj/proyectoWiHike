import React from "react";
import "../styles/InfoRuta.css"
import { FaStar } from "react-icons/fa";

export function InfoRuta({nombre, estrellas, imagenPrincipal, imagen2, imagen3, descripcion, distancia, desnivel_positivo, horas, minutos}) {
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
            <p className="infoRuta-description">
                {descripcion}
            </p>
            <div className="metricas-container">
                <div className="metrica">
                    <span className="valor">{distancia}</span>
                    <span className="unidad">km</span>
                    <span className="detalles">Distancia</span>
                </div>
                <div className="separador"></div>
                <div className="metrica">
                    <span className="valor">{desnivel_positivo}</span>
                    <span className="unidad">m</span>
                    <span className="detalles">Desnivel Positivo</span>
                </div>
                <div className="separador"></div>
                <div className="metrica">
                    <span className="valor">{horas}</span>
                    <span className="unidad">h</span>
                    <span className="valor">{minutos}</span>
                    <span className="unidad">min</span>
                    <span className="detalles">Tiempo Estimado</span>
                </div>
            </div>
        </div>
    );
}