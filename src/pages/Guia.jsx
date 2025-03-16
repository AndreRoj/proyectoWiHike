import React, { useContext, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import './Perfil.css'; // Archivo de estilos específico para el dashboard del guía
import { UserContext } from '../Context/UserContext';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function DashboardGuia() {
    const profileContext = useContext(UserContext);
    const { logged, profile } = profileContext;

    const [userData1, setUserData1] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
        profileImage: "",
        rutasAlMando: [], // Rutas que el guía está liderando
        upcomingRoutes: [], // Próximas rutas programadas
        valoraciones: [], // Valoraciones de los usuarios
    });

    const [activityStats, setActivityStats] = useState({
        Tiemposenderismo: "0h 0m",
        Kmrecorridos: "0 KM",
        Rutasrealizadas: "0",
    });

    // Función para obtener los detalles de las rutas
    const getRouteDetails = async (routeIds) => {
        if (!routeIds || routeIds.length === 0) return []; // Si no hay IDs, retorna un array vacío

        const routesCollection = collection(db, 'rutas'); // Colección de rutas
        const q = query(routesCollection, where('__name__', 'in', routeIds)); // Consulta las rutas con los IDs proporcionados
        const querySnapshot = await getDocs(q);

        // Mapea los documentos a un array de objetos con los datos de las rutas
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    };

    // Función para obtener las valoraciones de los usuarios
    const getValoraciones = async () => {
        if (!profile?.id) return []; // Si no hay un ID de guía, retorna un array vacío

        const valoracionesCollection = collection(db, 'valoraciones'); // Colección de valoraciones
        const q = query(valoracionesCollection, where('guiaId', '==', profile.id)); // Consulta las valoraciones del guía
        const querySnapshot = await getDocs(q);

        // Mapea los documentos a un array de objetos con los datos de las valoraciones
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    };

    // Función para calcular las estadísticas
    const calculateStats = (rutasAlMando) => {
        let totalKm = 0;
        let totalDuration = 0; // Duración en minutos
        let totalRoutes = rutasAlMando.length;

        rutasAlMando.forEach(route => {
            totalKm += parseFloat(route.kilometros) || 0; // Suma los kilómetros
            totalDuration += parseFloat(route.duracion) || 0; // Suma la duración en minutos
        });

        // Convertir la duración total a horas y minutos
        const hours = Math.floor(totalDuration / 60);
        const minutes = Math.round(totalDuration % 60);

        return {
            Tiemposenderismo: `${hours}h ${minutes}m`,
            Kmrecorridos: `${totalKm.toFixed(1)} KM`, // Redondea a 1 decimal
            Rutasrealizadas: `${totalRoutes}`,
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            if (profile) { // Solo ejecuta si profile no es null o undefined
                // Obtén los detalles de las rutas al mando
                const rutasAlMando = await getRouteDetails(profile.rutasAlMando || []);
                // Obtén los detalles de las próximas rutas
                const upcomingRoutes = await getRouteDetails(profile.proximasrutas || []);
                // Obtén las valoraciones de los usuarios
                const valoraciones = await getValoraciones();

                // Actualiza userData1 con los datos del perfil y las rutas
                const updatedUserData = {
                    name: profile.nombre ?? "Nombre no disponible",
                    role: "Guía",
                    phone: profile.telefono ?? "Teléfono no disponible",
                    email: profile.email ?? "Email no disponible",
                    profileImage: profile.image ?? "https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg?semt=ais_hybrid",
                    rutasAlMando,
                    upcomingRoutes,
                    valoraciones,
                };

                setUserData1(updatedUserData);

                // Calcula las estadísticas basadas en las rutas al mando
                const stats = calculateStats(rutasAlMando);
                setActivityStats(stats);
            }
        };

        fetchData();
    }, [profile]); // Este efecto se ejecuta cuando profile cambia

    return (
        <div className='dashboard-guia'>
            {/* Renderiza el perfil */}
            <div className='Izquierda'>
                <div className='ProfileCard'>
                    <h2>Perfil del Guía</h2>
                    <div className='EditButton'>
                        <button className="editIcon">
                            <BiEdit />
                        </button>
                    </div>
                    <div className='Info'>
                        <div className='Imagenperfil'>
                            <img className="Imagenperfilz" src={userData1.profileImage} alt="ProfileImage" />
                            <p className='Rolusuario'>{userData1.role}</p>
                        </div>
                        <div className='Infousuario'>
                            <div className='Columna'>
                                <span className="Label">Nombre: </span>
                                <span className='Value'> {userData1.name}</span>
                            </div>
                            <div className='Columna'>
                                <span className="Label">Teléfono: </span>
                                <span className="Value"> {userData1.phone}</span>
                            </div>
                            <div className='Columna'>
                                <span className="Label">Correo: </span>
                                <span className="Value"> {userData1.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Renderiza las estadísticas y rutas */}
            <div className='Derecha'>
                <div className='Estadisticas'>
                    <h2>Tu Actividad</h2>
                    <div className='EstadisticasActividad'>
                        {Object.entries(activityStats).map(([key, value]) => (
                            <div key={key} className='StatCards'>
                                <span className='Value1'>{value}</span>
                                <span className='Label1'>{key}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='RutasAlMando'>
                    <h2>Rutas al Mando</h2>
                    {userData1.rutasAlMando.length > 0 ? (
                        <div className='Rutascontainer1'>
                            {userData1.rutasAlMando.map((route, index) => (
                                <div key={index} className="InfoRutas1">
                                    <div className="imagen-ruta">
                                        <img
                                            src={route.imagen || "https://via.placeholder.com/150"}
                                            alt={route.nombre}
                                            className="pngruta"
                                        />
                                        <div className="Rutainfo">
                                            <h3>{route.nombre}</h3>
                                        </div>
                                    </div>
                                    <div className="detallesruta">
                                        <p className='guide'>
                                            <span className="nombreguia">{route.guia} </span>
                                            <span className='rol'>{route.guia}</span>
                                        </p>
                                        <p className="route-info">Dificultad: {route.dificultad}</p>
                                        <p className="route-info">Duración: {route.duracion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tienes rutas al mando en este momento.</p>
                    )}
                </div>
                <div className='Proximas-Rutas'>
                    <h2>Próximas Rutas Programadas</h2>
                    {userData1.upcomingRoutes.length > 0 ? (
                        <div className='Rutascontainer1'>
                            {userData1.upcomingRoutes.map((route, index) => (
                                <div key={index} className="InfoRutas1">
                                    <div className="imagen-ruta">
                                        <img
                                            src={route.imagen || "https://via.placeholder.com/150"}
                                            alt={route.nombre}
                                            className="pngruta"
                                        />
                                        <div className="Rutainfo">
                                            <h3>{route.nombre}</h3>
                                        </div>
                                    </div>
                                    <div className="detallesruta">
                                        <p className='guide'>
                                            <span className="nombreguia">{route.guia} </span>
                                            <span className='rol'>{route.guia}</span>
                                        </p>
                                        <p className="route-info">Dificultad: {route.dificultad}</p>
                                        <p className="route-info">Duración: {route.duracion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tienes próximas rutas programadas.</p>
                    )}
                </div>
                <div className='Valoraciones'>
                    <h2>Valoraciones de los Usuarios</h2>
                    {userData1.valoraciones.length > 0 ? (
                        <div className='ValoracionesContainer'>
                            {userData1.valoraciones.map((valoracion, index) => (
                                <div key={index} className="ValoracionCard">
                                    <div className="UsuarioInfo">
                                        <span className="NombreUsuario">{valoracion.usuarioNombre}</span>
                                        <span className="Puntuacion">⭐ {valoracion.puntuacion}</span>
                                    </div>
                                    <p className="Comentario">{valoracion.comentario}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay valoraciones disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}