
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
    const [selectedProgramadoId, setSelectedProgramadoId] = useState(null);
    const [reseñas, setReseñas] = useState([]); // Estado para almacenar las reseñas

    // Función para obtener las fechas disponibles
    const handleCheckAvailability = async () => {
        setLoading(true);
        setError(null);
    
        try {
            if (!id) {
                throw new Error('El ID de la ruta no está definido.');
            }
    
            const rutaDocRef = doc(db, 'rutas', id);
            const rutaDoc = await getDoc(rutaDocRef);
    
            if (!rutaDoc.exists()) {
                throw new Error('No se encontró la ruta');
            }
    
            const rutaData = rutaDoc.data();
            const rutasCalendarIds = rutaData.rutascalendar || [];
    
            if (rutasCalendarIds.length === 0) {
                setShowCalendar(false);
                setError('No hay rutas disponibles en este momento.');
                return;
            }
    
            const programadoCollection = collection(db, 'programado');
            let availableDatesTemp = [];
    
            console.log("Obteniendo fechas disponibles...");
            for (const programadoId of rutasCalendarIds) {
                const programadoDocRef = doc(programadoCollection, programadoId);
                const programadoDoc = await getDoc(programadoDocRef);
    
                if (programadoDoc.exists()) {
                    const programadoData = programadoDoc.data();
                    if (programadoData.dia) {
                        availableDatesTemp.push({ 
                            date: programadoData.dia.toDate(), 
                            programadoId 
                        });
                    }
                }
            }
    
            const today = new Date();
            const futureDates = availableDatesTemp.filter(d => d.date >= today);
    
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

           
            alert(`Reserva confirmada para el ${date.toLocaleDateString()}`);
        } catch (error) {
            console.error('Error al reservar la ruta:', error);
            alert('Hubo un error al reservar la ruta.');
        }
    };

    const handleDateClick = (date) => {
        const selected = availableDates.find(d => d.date.toDateString() === date.toDateString());
        if (selected) {
            setSelectedDate(selected.date);
            setSelectedProgramadoId(selected.programadoId);
        }
    };

    useEffect(() => {
        const fetchRutaData = async () => {
            try {
                const rutaDocRef = doc(db, 'rutas', id);
                const rutaDoc = await getDoc(rutaDocRef);
    
                if (rutaDoc.exists()) {
                    const rutaData = rutaDoc.data();
                    if (rutaData.reseñas && Array.isArray(rutaData.reseñas)) {
                        setReseñas(rutaData.reseñas); // Guarda las reseñas en el estado
                    } else {
                        console.log("El campo 'reseñas' no es un array o no existe.");
                    }
                } else {
                    console.log("No se encontró el documento de la ruta.");
                }
            } catch (error) {
                console.error('Error al obtener los datos de la ruta:', error);
            }
        };
    
        fetchRutaData();
    }, [id]);
    

    return (
        <div className="rutaInfo-content">
            <div className="nombreRuta">{nombre}</div>
            <div className="gallery">
                <div className="main-imag">
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
                <FaMapSigns style={{ color: 'black', fontSize: '50px', justifyContent: 'center', alignItems: 'center' }} />
                <span>Actividades</span>
            </div>
            <div className="InfoRutaActividad-container">
                {paseo && (
                    <div className="InfoRutaAct-metrica">
                        <FaHiking style={{ color: 'black', fontSize: '50px', justifyContent: 'center' }} />
                        <span className="InfoRutadetalles">Senderismo</span>
                    </div>
                )}
                {paseo && (
                    <div className="InfoRutaAct-metrica">
                        <BsPersonWalking style={{ color: 'black', fontSize: '50px', justifyContent: 'center' }} />
                        <span className="InfoRutadetalles">Paseo</span>
                    </div>
                )}
                {acampada && (
                    <div className="InfoRutaAct-metrica">
                        <GiCampingTent style={{ color: 'black', fontSize: '50px', justifyContent: 'center' }} />
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
                            <IoMdCheckmarkCircleOutline style={{ color: 'black', fontSize: '90px', justifyContent: 'center', alignItems: 'center' }} />
                        </div>
                        <div className="InfoRutametrica2">
                            <span><strong>Cancela sin cargos</strong></span>
                            <span className="InfoRutainformacion">Cancela hasta 3 hrs antes para obtener el reembolso completo</span>
                        </div>
                    </div>
                    <div className="InfoRutacontainer3">
                        <div className="InfoRutametrica2">
                            <GoPerson style={{ color: 'black', fontSize: '90px', justifyContent: 'center', alignItems: 'center' }} />
                        </div>
                        <div className="InfoRutametrica2">
                            <span><strong>Grupo Amplio</strong></span>
                            <span className="InfoRutainformacion">Sin limite de personas</span>
                        </div>
                    </div>
                    <div className="InfoRutacontainer3">
                        <div className="InfoRutametrica2">
                            <FaMapMarkerAlt style={{ color: 'black', fontSize: '90px', justifyContent: 'center', alignItems: 'center' }} />
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
    onClickDay={handleDateClick}
    tileDisabled={({ date }) => !availableDates.some(d => d.date.toDateString() === date.toDateString())}
/>
                </div>
            )}

                    </div>

                    {selectedDate && (

<div className="reserva-container">
<h3>Información de la reserva</h3>
<p><strong>Fecha seleccionada:</strong> {selectedDate.toLocaleDateString()}</p>
<p><strong>Ruta:</strong> {nombre}</p>
<p><strong>Dificultad:</strong> {dificultad}</p>
<p><strong>Duración:</strong> {duracion} minutos</p>
<p><strong>Distancia:</strong> {kilometros} km</p>


                    
                    <Link
    to={{
        pathname: `/reserva/${selectedProgramadoId}`, // Usa el ID directamente de las props
        state: {
            id: id, // Usa el ID directamente de las props
            nombre: nombre, // Usa el nombre directamente de las props
            estrellas: estrellas, // Usa las estrellas directamente de las props
            imagen: imagen, // Usa la imagen directamente de las props
            descripcion: descripcion, // Usa la descripción directamente de las props
            distancia: kilometros, // Aquí estás usando "kilometros" en lugar de "distancia"
            desnivel_positivo: desnivel_positivo, // Usa el desnivel positivo directamente de las props
            duracion: duracion, // Usa la duración directamente de las props
            kilometros: kilometros, // Usa los kilómetros directamente de las props
            dificultad: dificultad, // Usa la dificultad directamente de las props
            paseo: paseo, // Usa el valor de paseo directamente de las props
            acampada: acampada, // Usa el valor de acampada directamente de las props
            URLmap: URLmap, // Usa la URL del mapa directamente de las props
            selectedDate: selectedDate, // Usa la fecha seleccionada del estado
        }
    }}
>
    <button>Reservar</button>
</Link>
                </div>
            )}

                </div>

                
            </div>

            <div className="reseñas-container">
    <h3>Reseñas</h3>
    {reseñas.length > 0 ? (
        reseñas.map((reseña, index) => (
            <div key={index} className="reseña-item">
                <p ><strong>{reseña.nombre}</strong></p>
                <p>{reseña.mensaje}</p>
                <p>
                    <small>
                        {/* Convierte el Timestamp de Firestore a una fecha legible */}
                        {reseña.fecha && typeof reseña.fecha.toDate === 'function'
                            ? reseña.fecha.toDate().toLocaleDateString()
                            : "Fecha no disponible"}
                    </small>
                </p>
            </div>
        ))
    ) : (
        <p>No hay reseñas disponibles.</p>
    )}
</div>

            

            {/* Mostrar mensajes de error o carga */}
            {loading && <p>Cargando disponibilidad...</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

