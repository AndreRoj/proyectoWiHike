import React, { useState, useEffect } from "react";
import "../styles/InfoRuta.css";
import { FaStar } from "react-icons/fa";
import { FaMapSigns } from "react-icons/fa";
import { FaHiking } from "react-icons/fa";
import { BsPersonWalking } from "react-icons/bs";
import { GiCampingTent } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { db } from '../firebase'; // Importa tu configuración de Firebase
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import Calendar from 'react-calendar'; // Importa un componente de calendario
import 'react-calendar/dist/Calendar.css'; // Estilos del calendario
import { Link } from 'react-router-dom'; // Cambia esta línea

export function InfoRuta({ id, nombre, estrellas, imagen, imagen2, imagen3, descripcion, kilometros, desnivel_positivo, duracion, dificultad, paseo, acampada, URLmap }) {
    const [showCalendar, setShowCalendar] = useState(false); // Estado para mostrar/ocultar el calendario
    const [availableDates, setAvailableDates] = useState([]); // Estado para almacenar las fechas disponibles
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [selectedDate, setSelectedDate] = useState(null); // Estado para la fecha seleccionada

    // Función para obtener las fechas disponibles
    const handleCheckAvailability = async () => {
        setLoading(true);
        setError(null);
    
        try {
            console.log("Obteniendo documento de la ruta...");
            console.log("ID de la ruta:", id);
    
            // Validar que el ID no sea undefined
            if (!id) {
                throw new Error('El ID de la ruta no está definido.');
            }
    
            // Crear la referencia al documento usando el ID como nombre del documento
            const rutaDocRef = doc(db, 'rutas', id);
            const rutaDoc = await getDoc(rutaDocRef);
    
            if (!rutaDoc.exists()) {
                throw new Error('No se encontró la ruta');
            }
    
            const rutaData = rutaDoc.data();
            console.log("Datos de la ruta:", rutaData);
    
            const rutasCalendarIds = rutaData.rutascalendar || [];
            console.log("IDs de rutas calendar:", rutasCalendarIds);
    
            if (rutasCalendarIds.length === 0) {
                setShowCalendar(false);
                setError('No hay rutas disponibles en este momento.');
                return;
            }
    
            // Obtener los documentos de la colección 'programado' usando los IDs de rutascalendar
            const programadoCollection = collection(db, 'programado');
            const availableDates = [];
    
            console.log("Obteniendo fechas disponibles...");
            for (const programadoId of rutasCalendarIds) {
                console.log("Obteniendo documento de programado con ID:", programadoId);
                const programadoDocRef = doc(programadoCollection, programadoId);
                const programadoDoc = await getDoc(programadoDocRef);
    
                if (programadoDoc.exists()) {
                    const programadoData = programadoDoc.data();
                    console.log("Datos de programado:", programadoData);
    
                    if (programadoData.dia) {
                        console.log("Fecha encontrada:", programadoData.dia.toDate());
                        availableDates.push(programadoData.dia.toDate()); // Convierte Timestamp a Date
                    } else {
                        console.warn("El campo 'dia' no existe en el documento de programado:", programadoId);
                    }
                } else {
                    console.warn("No se encontró el documento de programado con ID:", programadoId);
                }
            }
    
            // Filtrar las fechas disponibles para excluir las fechas pasadas
            const today = new Date(); // Fecha actual
            const futureDates = availableDates.filter(date => date >= today);
    
            if (futureDates.length === 0) {
                setShowCalendar(false);
                setError('No hay fechas disponibles para esta ruta.');
            } else {
                setAvailableDates(futureDates);
                setShowCalendar(true);
            }
        } catch (error) {
            console.error('Error al obtener la disponibilidad:', error);
            setError('Hubo un error al obtener la disponibilidad.');
        } finally {
            setLoading(false);
        }
    };

    const handleReservar = async (date) => {
        try {
            console.log("Reservando la ruta para la fecha:", date.toLocaleDateString());

            // Aquí puedes agregar la lógica para guardar la reserva en Firestore
            // Por ejemplo:
            // const reservaDocRef = await addDoc(collection(db, 'reservas'), {
            //     rutaId: id,
            //     fecha: date,
            //     usuarioId: usuarioActual.uid,
            // });

            alert(`Reserva confirmada para el ${date.toLocaleDateString()}`);
        } catch (error) {
            console.error('Error al reservar la ruta:', error);
            alert('Hubo un error al reservar la ruta.');
        }
    };

    return (
        <div className="InfoRuta-container" data-aos="fade-right">
        <div className="InfoRuta-content">
            <div className="InfoRutanombre">{nombre}</div>
            <div className='rating'>
                <FaStar style={{ color: 'black', fontSize: '30px' }} />
                <span style={{ color: 'black', fontSize: '20px' }}>{estrellas}</span>
            </div>
            <div className="InfoRutagallery">
                <div className="InfoRutamain-imag">
                    <img src={imagen} alt="Imagen principal" />
                </div>
                <div className="InfoRutaside-imag">
                    <img src={imagen2} alt="Imagen lateral 1" />
                    <img src={imagen3} alt="Imagen lateral 2" />
                </div>
            </div>
            <p className="InfoRuta-description">
                {descripcion}
            </p>
            <div className="InfoRutametricas-container">
                <div className="InfoRutametrica">
                    <span className="InfoRutavalor">{kilometros}</span>
                    <span className="InfoRutaunidad">km</span>
                    <span className="InfoRutadetalles">Distancia</span>
                </div>
                <div className="InfoRuta-separador"></div>
                <div className="InfoRutametrica">
                    <span className="InfoRutavalor">{desnivel_positivo}</span>
                    <span className="InfoRutaunidad">m</span>
                    <span className="InfoRutadetalles">Desnivel Positivo</span>
                </div>
                <div className="InfoRuta-separador"></div>
                <div className="InfoRutametrica">
                    <span className="InfoRutavalor">{duracion}</span>
                    <span className="InfoRutaunidad">min</span>
                    <span className="InfoRutadetalles">Tiempo Estimado</span>
                </div>
                <div className="InfoRuta-separador"></div>
                <div className="InfoRutametrica">
                    <span className="InfoRutavalor">{dificultad}</span>
                    <span className="InfoRutadetalles">Nivel de Dificultad</span>
                </div>
            </div>
            <div className="InfoRutaActividad-title">
                <FaMapSigns className = "InfoRuta-iconAct" />
                <span>Actividades</span>
            </div>
            <div className="InfoRutaActividad-container">
                {paseo && (
                    <div className="InfoRutaAct-metrica">
                        <FaHiking className = "InfoRuta-iconAct"/>
                        <span className="InfoRutadetalles">Senderismo</span>
                    </div>
                )}
                {paseo && (
                    <div className="InfoRutaAct-metrica">
                        <BsPersonWalking className = "InfoRuta-iconAct" />
                        <span className="InfoRutadetalles">Paseo</span>
                    </div>
                )}
                {acampada && (
                    <div className="InfoRutaAct-metrica">
                        <GiCampingTent className = "InfoRuta-iconAct" />
                        <span className="InfoRutadetalles">Acampada</span>
                    </div>
                )}
            </div>
            <div className="InfoRutacontainer2">
                <div className="InfoRutametrica2">
                    <div className="InfoRutacontainer3">
                        <span>Informacion sobre el Tour</span>
                    </div>
                    <div className="InfoRutacontainer3">
                        <div className="InfoRutametrica2">
                            <IoMdCheckmarkCircleOutline style={{ color: 'black', fontSize: '50px', justifyContent: 'center', alignItems: 'center' }} />
                        </div>
                        <div className="InfoRutametrica2">
                            <span><strong>Cancela sin cargos</strong></span>
                            <span className="InfoRutainformacion">Cancela hasta 3 hrs antes para obtener el reembolso completo</span>
                        </div>
                    </div>
                    <div className="InfoRutacontainer3">
                        <div className="InfoRutametrica2">
                            <GoPerson style={{ color: 'black', fontSize: '50px', justifyContent: 'center', alignItems: 'center' }} />
                        </div>
                        <div className="InfoRutametrica2">
                            <span><strong>Grupo Amplio</strong></span>
                            <span className="InfoRutainformacion">Sin limite de personas</span>
                        </div>
                    </div>
                    <div className="InfoRutacontainer3">
                        <div className="InfoRutametrica2">
                            <FaMapMarkerAlt style={{ color: 'black', fontSize: '50px', justifyContent: 'center', alignItems: 'center' }} />
                        </div>
                        <div className="InfoRutametrica2">
                            <span><strong>Punto de encuentro</strong></span>
                            <a href={URLmap} target="_blank" rel="noopener noreferrer">
                                <span className="InfoRutatipolink">Abre en Mapa</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="InfoRutametrica2">
                    <div className="InfoRuta-button-container">
                        <div className="InfoRuta-button" onClick={handleCheckAvailability}>
                            Ver disponibilidad
                            <VscTriangleDown style={{ color: 'white', fontSize: '30px', justifyContent: 'flex-end', alignItems: 'flex-end' }} />
                        </div>
                    </div>
                    <div>
                        {/* Mostrar el calendario si hay fechas disponibles */}
                    {showCalendar && (
                    <div className="calendar-container">
                        <h3>Fechas disponibles:</h3>
                        <Calendar
                            onClickDay={(date) => setSelectedDate(date)}
                            value={availableDates}
                            tileDisabled={({ date }) => !availableDates.some(d => d.toDateString() === date.toDateString())}
                        />
                    </div>
            )}

                    </div>

                    {selectedDate && (

                <div className="reserva-container">
                    <h3>Información de la reserva</h3>
                    <p>Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
                    <p>Ruta: {nombre}</p>
                    <p>Dificultad: {dificultad}</p>
                    <p>Duración: {duracion} minutos</p>
                    <p>Distancia: {kilometros} km</p>

                    
                    <Link to={`/reserva/${id}`}> {/* Enlace dinámico usando el ID de la ruta */}  
                    <button  >
                        Reservar
                    </button>
                    </Link>
                </div>
            )}

                </div>
            </div>

            

            {/* Mostrar mensajes de error o carga */}
            {loading && <p>Cargando disponibilidad...</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
        </div>
    );
}