import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaPaypal } from "react-icons/fa";
import './ReservaPago.css';
import { db } from '../firebase'; // Importa tu configuración de Firebase
import { doc, getDoc } from 'firebase/firestore'; // Importa las funciones de Firestore
import { UserContext } from '../Context/UserContext';
import BotonPaypal from '../components/BotonPaypal'


function ReservaPago() {

    const { id, rutaId } = useParams();
    const reservaId = id || rutaId; // Usa id si está disponible, de lo contrario usa rutaId
    console.log("ID de la reserva desde la URL:", reservaId);

    const [reserva, setReserva] = useState(null); // Datos de la colección 'programado'
    const [ruta, setRuta] = useState(null); // Datos de la colección 'rutas'
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const profileContext = useContext(UserContext);
    const { logged, profile } = profileContext;

    // Obtén los datos de la ruta pasados desde InfoRuta
    const location = useLocation();
    const {
        nombre,
        estrellas,
        imagen,
        descripcion,
        distancia,
        desnivel_positivo,
        duracion,
        kilometros,
        dificultad,
        paseo,
        acampada,
        URLmap,
        selectedDate,
    } = location.state || {};


    useEffect(() => {
        const fetchReserva = async () => {
            try {
                if (!reservaId) {
                    throw new Error('El ID de la reserva no está definido.');
                }
    
                console.log("Obteniendo datos de la reserva con ID:", reservaId);
    
                // 1. Obtener el documento de la colección 'programado'
                const reservaDocRef = doc(db, 'programado', reservaId);
                const reservaDoc = await getDoc(reservaDocRef);
    
                if (!reservaDoc.exists()) {
                    throw new Error('No se encontró la reserva');
                }
    
                const reservaData = reservaDoc.data();
                console.log("Datos de la reserva:", reservaData);
    
                // Guardar la reserva en el estado
                setReserva(reservaData);
    
                // 2. Ahora que tenemos `idruta`, obtener los datos de la ruta
                if (reservaData.idruta) {
                    console.log("Buscando datos de la ruta con ID:", reservaData.idruta);
                    const rutaDocRef = doc(db, 'rutas', reservaData.idruta);
                    const rutaDoc = await getDoc(rutaDocRef);
    
                    if (!rutaDoc.exists()) {
                        throw new Error('No se encontró la ruta asociada');
                    }
    
                    const rutaData = rutaDoc.data();
                    console.log("Datos de la ruta:", rutaData);
    
                    // Guardar los datos en los estados
                    setRuta(rutaData);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError('Hubo un error al obtener los datos.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchReserva();
    }, [reservaId]); 

    

    // Muestra un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Muestra un mensaje de error si algo salió mal
    if (error) {
        return <div>{error}</div>;
    }

    // Muestra un mensaje si no se encontraron datos
    if (!reserva || !ruta) {
        return <div>No se encontraron datos.</div>;
    }

    // Obtén la información del usuario desde el contexto
   

    console.log("Datos de la ruta:", location.state);

    return (
        <div className="Reserva-ReservaPago">
            <div className="Reserva-Izquierda">
                <div className="Reserva-Datospersonales">
                    <span>Datos Personales</span>
                    <div className='Reserva-separador'></div>
                    <div className="Reserva-row1">
                        <span>Nombre Completo</span>
                        <span>Telefono</span>
                        <span>Correo</span>
                    </div>
                    <div className="Reserva-row2">
                        {/* Mostrar los datos del usuario */}
                        {profile && (
                            <>
                                <span>{profile.nombre}</span>
                                <span>{profile.telefono}</span>
                                <span>{profile.email}</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="Reserva-Datosruta">
                    <span>Informacion del recorrido</span>
                    <div className='Reserva-separador'></div>
                    <div className="Reserva-row1">
                        <span>Ruta</span>
                        <span>Fecha</span>
                        <span>Hora</span>
                        <span>Duracion</span>
                    </div>
                    <div className="Reserva-row2">
    {ruta && reserva ? (
        <>
            <span>{ruta.nombre}</span> 
            <span>{reserva.dia ? reserva.dia.toDate().toLocaleDateString() : "Fecha no disponible"}</span>
            <span>{reserva.dia ? reserva.dia.toDate().toLocaleTimeString() : "Hora no disponible"}</span>
            <span>{ruta.duracion} minutos</span>
        </>
    ) : (
        <span>Cargando datos...</span>
    )}
</div>
                </div>
                <div className='Reserva-separador1'></div>
                
            </div>
            <div className="Reserva-Derecha">
                <div className="Reserva-FinalizarPedido">
                <BotonPaypal precio={reserva.precio} />
                </div>
                <div className='Reserva-separador'></div>
                <div className="Reserva-columna1">
                    <span>Precio:</span>
                    {/* Aquí puedes mostrar el precio */}
                    <span>${reserva.precio}</span>
                </div>
                <div className="Reserva-columna2">
                </div>
                <div className='Reserva-separador'></div>
                <div className="Reserva-columna3">
                    <span>Total a pagar:</span>

                    <span>${reserva.precio}</span>
                </div>
            </div>
        </div>
    );
}

export default ReservaPago;