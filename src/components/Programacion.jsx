// import React, { useState, useEffect } from "react";
// import "../styles/InfoRuta.css";
// import { FaStar } from "react-icons/fa";
// import { FaMapSigns } from "react-icons/fa";
// import { FaHiking } from "react-icons/fa";
// import { BsPersonWalking } from "react-icons/bs";
// import { GiCampingTent } from "react-icons/gi";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { GoPerson } from "react-icons/go";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { VscTriangleDown } from "react-icons/vsc";
// import { db } from '../firebase';
// import { doc, getDoc, collection } from 'firebase/firestore';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { Link } from 'react-router-dom';

// export function InfoRuta({ id, nombre, estrellas, imagen, imagen2, imagen3, descripcion, kilometros, desnivel_positivo, duracion, dificultad, paseo, acampada, URLmap }) {
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [availableDates, setAvailableDates] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedProgramadoId, setSelectedProgramadoId] = useState(null); // Nuevo estado

//     const handleCheckAvailability = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             if (!id) {
//                 throw new Error('El ID de la ruta no está definido.');
//             }

//             const rutaDocRef = doc(db, 'rutas', id);
//             const rutaDoc = await getDoc(rutaDocRef);

//             if (!rutaDoc.exists()) {
//                 throw new Error('No se encontró la ruta');
//             }

//             const rutaData = rutaDoc.data();
//             const rutasCalendarIds = rutaData.rutascalendar || [];

//             if (rutasCalendarIds.length === 0) {
//                 setShowCalendar(false);
//                 setError('No hay rutas disponibles en este momento.');
//                 return;
//             }

//             const programadoCollection = collection(db, 'programado');
//             const availableDates = [];

//             for (const programadoId of rutasCalendarIds) {
//                 const programadoDocRef = doc(programadoCollection, programadoId);
//                 const programadoDoc = await getDoc(programadoDocRef);

//                 if (programadoDoc.exists()) {
//                     const programadoData = programadoDoc.data();
//                     if (programadoData.dia) {
//                         availableDates.push({ 
//                             date: programadoData.dia.toDate(), 
//                             programadoId // Guarda también el ID del documento de "programado"
//                         });
//                     }
//                 }
//             }

//             const today = new Date();
//             const futureDates = availableDates.filter(({ date }) => date >= today);

//             if (futureDates.length === 0) {
//                 setShowCalendar(false);
//                 setError('No hay fechas disponibles para esta ruta.');
//             } else {
//                 setAvailableDates(futureDates);
//                 setShowCalendar(true);
//             }
//         } catch (error) {
//             console.error('Error al obtener la disponibilidad:', error);
//             setError('Hubo un error al obtener la disponibilidad.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDateClick = (date) => {
//         const selected = availableDates.find(d => d.date.toDateString() === date.toDateString());
//         if (selected) {
//             setSelectedDate(selected.date);
//             setSelectedProgramadoId(selected.programadoId); // Guarda el ID de la colección "programado"
//         }
//     };

//     return (
//         <div className="rutaInfo-content">
//             <div className="nombreRuta">{nombre}</div>
//             <div className='rating'>
//                 <FaStar style={{ color: 'black', fontSize: '30px' }} />
//                 <span style={{ color: 'black', fontSize: '20px' }}>{estrellas}</span>
//             </div>
//             <div className="gallery">
//                 <div className="main-imag">
//                     <img src={imagen} alt="Imagen principal" />
//                 </div>
//                 <div className="side-imag">
//                     <img src={imagen2} alt="Imagen lateral 1" />
//                     <img src={imagen3} alt="Imagen lateral 2" />
//                 </div>
//             </div>
//             <p className="infoRuta-description">{descripcion}</p>

//             <div className="InfoR-button-container">
//                 <div className="InfoR-button" onClick={handleCheckAvailability}>
//                     Ver disponibilidad
//                     <VscTriangleDown style={{ color: 'white', fontSize: '30px' }} />
//                 </div>
//             </div>

//             {showCalendar && (
//                 <div className="calendar-container">
//                     <h3>Fechas disponibles:</h3>
//                     <Calendar
//                         onClickDay={handleDateClick}
//                         tileDisabled={({ date }) => !availableDates.some(d => d.date.toDateString() === date.toDateString())}
//                     />
//                 </div>
//             )}

//             {selectedDate && (
//                 <div className="reserva-container">
//                     <h3>Información de la reserva</h3>
//                     <p><strong>ID de la reserva (programado):</strong> {selectedProgramadoId}</p> {/* Ahora muestra el ID correcto */}
//                     <p><strong>Fecha seleccionada:</strong> {selectedDate.toLocaleDateString()}</p>
//                     <p><strong>Ruta:</strong> {nombre}</p>
//                     <p><strong>Dificultad:</strong> {dificultad}</p>
//                     <p><strong>Duración:</strong> {duracion} minutos</p>
//                     <p><strong>Distancia:</strong> {kilometros} km</p>

//                     <Link
//                         to={{
//                             pathname: `/reserva/${id}`,
//                             state: {
//                                 id,
//                                 nombre,
//                                 estrellas,
//                                 imagen,
//                                 descripcion,
//                                 distancia: kilometros,
//                                 desnivel_positivo,
//                                 duracion,
//                                 kilometros,
//                                 dificultad,
//                                 paseo,
//                                 acampada,
//                                 URLmap,
//                                 selectedDate,
//                                 programadoId: selectedProgramadoId, // Envía el ID correcto
//                             }
//                         }}
//                     >
//                         <button>Reservar</button>
//                     </Link>
//                 </div>
//             )}

//             {loading && <p>Cargando disponibilidad...</p>}
//             {error && <p className="error-message">{error}</p>}
//         </div>
//     );
// }
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

export function Programacion({ id, nombre, estrellas, imagen, imagen2, imagen3, descripcion, kilometros, desnivel_positivo, duracion, dificultad, paseo, senderismo, acampada, participantes}) {
    // const [showCalendar, setShowCalendar] = useState(false); // Estado para mostrar/ocultar el calendario
    // const [availableDates, setAvailableDates] = useState([]); // Estado para almacenar las fechas disponibles
    // const [loading, setLoading] = useState(false); // Estado para manejar la carga
    // const [error, setError] = useState(null); // Estado para manejar errores
    // const [selectedDate, setSelectedDate] = useState(null); // Estado para la fecha seleccionada
    // const [selectedProgramadoId, setSelectedProgramadoId] = useState(null);

    // // Función para obtener las fechas disponibles
    // const handleCheckAvailability = async () => {
    //     setLoading(true);
    //     setError(null);
    
    //     try {
    //         if (!id) {
    //             throw new Error('El ID de la ruta no está definido.');
    //         }
    
    //         const rutaDocRef = doc(db, 'rutas', id);
    //         const rutaDoc = await getDoc(rutaDocRef);
    
    //         if (!rutaDoc.exists()) {
    //             throw new Error('No se encontró la ruta');
    //         }
    
    //         const rutaData = rutaDoc.data();
    //         const rutasCalendarIds = rutaData.rutascalendar || [];
    
    //         if (rutasCalendarIds.length === 0) {
    //             setShowCalendar(false);
    //             setError('No hay rutas disponibles en este momento.');
    //             return;
    //         }
    
    //         const programadoCollection = collection(db, 'programado');
    //         let availableDatesTemp = [];
    
    //         console.log("Obteniendo fechas disponibles...");
    //         for (const programadoId of rutasCalendarIds) {
    //             const programadoDocRef = doc(programadoCollection, programadoId);
    //             const programadoDoc = await getDoc(programadoDocRef);
    
    //             if (programadoDoc.exists()) {
    //                 const programadoData = programadoDoc.data();
    //                 if (programadoData.dia) {
    //                     availableDatesTemp.push({ 
    //                         date: programadoData.dia.toDate(), 
    //                         programadoId 
    //                     });
    //                 }
    //             }
    //         }
    
    //         const today = new Date();
    //         const futureDates = availableDatesTemp.filter(d => d.date >= today);
    
    //         if (futureDates.length === 0) {
    //             setShowCalendar(false);
    //             setError('No hay fechas disponibles para esta ruta.');
    //         } else {
    //             setAvailableDates(futureDates);
    //             setShowCalendar(true);
    //         }
    //     } catch (error) {
    //         console.error('Error al obtener la disponibilidad:', error);
    //         setError('Hubo un error al obtener la disponibilidad.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    

    // const handleReservar = async (date) => {
    //     try {
    //         console.log("Reservando la ruta para la fecha:", date.toLocaleDateString());

    //         // Aquí puedes agregar la lógica para guardar la reserva en Firestore
    //         // Por ejemplo:
    //         // const reservaDocRef = await addDoc(collection(db, 'reservas'), {
    //         //     rutaId: id,
    //         //     fecha: date,
    //         //     usuarioId: usuarioActual.uid,
    //         // });

    //         alert(`Reserva confirmada para el ${date.toLocaleDateString()}`);
    //     } catch (error) {
    //         console.error('Error al reservar la ruta:', error);
    //         alert('Hubo un error al reservar la ruta.');
    //     }
    // };

    // const handleDateClick = (date) => {
    //     const selected = availableDates.find(d => d.date.toDateString() === date.toDateString());
    //     if (selected) {
    //         setSelectedDate(selected.date);
    //         setSelectedProgramadoId(selected.programadoId);
    //     }
    // };
    

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
                {senderismo && (
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

            <div className="InfoRutaActividad-title">
                <GoPerson className = "InfoRuta-iconAct" />
                <span>Participantes</span>
            </div>
            <div className="InfoRutametrica2" style={{flexDirection: 'column', alignItems: 'center', backgroundColor:'#f9f9f9', borderRadius: '8px'}}>
                {participantes.map((nombre) => (   /* aprticipantes serian los nombre de los usuarios */
                    <div className="InfoRutacontainer3">
                        <div className="InfoRutametrica2">
                            <IoMdCheckmarkCircleOutline className="InfoRuta-iconAct"/>
                        </div>
                        <div className="InfoRutametrica2">
                            <span className="InfoRutainformacion" style={{fontSize: '19px'}}>{nombre}</span>
                        </div>
                    </div>
                ))}
            </div>


            </div>
        </div> 
    );
}

