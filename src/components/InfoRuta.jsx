import React from "react";
import "../styles/InfoRuta.css"
import { FaStar } from "react-icons/fa";
import { FaMapSigns } from "react-icons/fa"; /*icono de letreritos */
import { FaHiking } from "react-icons/fa"; /*icono de persona caminando */
import { BsPersonWalking } from "react-icons/bs"; /*icono de persona caminando2 */
import { GiCampingTent } from "react-icons/gi"; /*campamento*/
import { IoMdCheckmarkCircleOutline } from "react-icons/io";/*icono de check */
import { GoPerson } from "react-icons/go";/*icono de persona */
import { FaMapMarkerAlt } from "react-icons/fa";/*icono de marquita de mapa */
import { VscTriangleDown } from "react-icons/vsc";/*triangulo hacia abajo */

export function InfoRuta({nombre, estrellas, imagenPrincipal, imagen2, imagen3, descripcion, distancia, desnivel_positivo, horas, minutos, dificultad, paseo, acampada, URLmap}) {
    return (
        <div className="rutaInfo-content" syte>
                <div className="nombreRuta">{nombre}</div>
            <div className='rating'>
                <FaStar style={{color: 'black',fontSize: '30px'}} />
                <span style={{color: 'black',fontSize: '20px'}}>{estrellas}</span>
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
                <div className="separador"></div>
                <div className="metrica">
                    <span className="valor">{dificultad}</span>
                    <span className="detalles">Nivel de Dificultad</span>
                </div>
            </div>
            <div className="Actividad-title">
                <FaMapSigns style={{color: 'black',fontSize: '50px',justifyContent: 'center',alignItems: 'center'}}/>
                <span>Actividades</span>
            </div>
            <div className="Actividad-container">
                {paseo && (
                <div className="Act-metrica">
                    <FaHiking style={{color: 'black',fontSize: '50px', justifyContent: 'center'}}/>
                    <span className="detalles">Senderismo</span>
                </div>
                )}
                {paseo && (
                <div className="Act-metrica">
                    <BsPersonWalking style={{color: 'black',fontSize: '50px',justifyContent: 'center'}}/>
                    <span className="detalles">Paseo</span>
                </div>
                )}
                {acampada && (
                <div className="Act-metrica">
                    <GiCampingTent style={{color: 'black',fontSize: '50px',justifyContent: 'center'}}/>
                    <span className="detalles">Acampada</span>
                </div>
                )}
            </div>
            <div className="container2">
                <div className="metrica2">
                    <div className="container3">
                        <span>Informacion sobre el Tour</span>
                    </div>
                    <div className="container3">
                        <div className="metrica2">
                            <IoMdCheckmarkCircleOutline style={{color: 'black',fontSize: '90px',justifyContent: 'center',alignItems: 'center'}}/>
                        </div>
                        <div className="metrica2">
                            <span><strong>Cancela sin cargos</strong></span>
                            <span className="informacion">Cancela hasta 3 hrs antes para obtener el reebolso completo</span>
                        </div>
                    </div>
                    <div className="container3">
                        <div className="metrica2">
                            <GoPerson style={{color: 'black',fontSize: '90px', justifyContent: 'center',alignItems: 'center'}}/>
                        </div>
                        <div className="metrica2">
                            <span><strong>Grupo Reducido</strong></span>
                            <span className="informacion">Excursiones limitadas a 8 personas</span>
                        </div>
                    </div>
                    <div className="container3">
                        <div className="metrica2">
                            <FaMapMarkerAlt style={{color: 'black',fontSize: '90px', justifyContent: 'center',alignItems: 'center'}}/>
                        </div>
                    <div className="metrica2">
                        <span><strong>Punto de encuentro</strong></span>
                        <a href={URLmap} target="_blank" rel="noopener noreferrer">
                            <span className="tipolink">Abre en Google Maps</span>
                        </a>
                    </div>
                    </div>
                </div>
                <div className="metrica2">
                    <div className="InfoR-button-container">
                        <div className="InfoR-button">
                            Ver disponibilidad
                            <VscTriangleDown style={{color: 'white',fontSize: '30px', justifyContent: 'flex-end',alignItems: 'flex-end'}}/>
                        </div>
                    </div>
                </div>
            </div>
            

            
        </div>
    );
}