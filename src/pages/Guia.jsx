import React, { useContext, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './Perfil.css';
import "../styles/RutasPopulares.css";
import { UserContext } from '../Context/UserContext';
import { db } from '../firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

export default function Perfil() {
    const profileContext = useContext(UserContext);
    const { logged, profile } = profileContext;

    const [userData1, setUserData1] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
        profileImage: "",
        latestRoutes: [], // Últimas rutas dadas como guía
        upcomingRoutes: [], // Próximas rutas de guía
        routes: [] // Rutas que tiene permitido dar el guía
    });

    // Estado para las estadísticas
    const [activityStats, setActivityStats] = useState({
        TiempoDeGuia: "0h 0m",
        KmComoGuia: "0 KM",
        RutasACargo: "0",
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

    // Función para obtener las próximas rutas programadas
    const getUpcomingRoutes = async (proximasRutasIds) => {
        if (!proximasRutasIds || proximasRutasIds.length === 0) return []; // Si no hay IDs, retorna un array vacío

        const programadoCollection = collection(db, 'programado'); // Colección de programado
        const q = query(programadoCollection, where('__name__', 'in', proximasRutasIds)); // Consulta los documentos con los IDs proporcionados
        const querySnapshot = await getDocs(q);

        // Obtén los detalles de cada ruta programada
        const upcomingRoutes = await Promise.all(
            querySnapshot.docs.map(async (programadoDoc) => {
                const programadoData = programadoDoc.data();
                const rutaDoc = await getDoc(doc(db, 'rutas', programadoData.idruta)); 
                return {
                    id: programadoDoc.id,
                    ...programadoData,
                    ruta: rutaDoc.data(), // Agrega los detalles de la ruta
                };
            })
        );

        return upcomingRoutes;
    };

    // Función para calcular las estadísticas
    const calculateStats = (latestRoutes, routes) => {
        console.log('acaa' + latestRoutes);
        console.log(latestRoutes);
        let totalKm = 0;
        let totalDuration = 0; // Duración en minutos
        let totalRoutes = routes.length;

        latestRoutes.forEach(route => {
            totalKm += parseFloat(route.ruta.kilometros) || 0; // Suma los kilómetros
            totalDuration += parseFloat(route.ruta.duracion) || 0; // Suma la duración en minutos
        });

        // Convertir la duración total a horas y minutos
        const hours = Math.floor(totalDuration / 60);
        const minutes = Math.round(totalDuration % 60);

        return {
            TiemposenderismoGuia: `${hours}h ${minutes}m`,
            KmrecorridosGuia: `${totalKm.toFixed(1)} KM`, // Redondea a 1 decimal
            RutasrealizadasGuia: `${totalRoutes}`,
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            if (profile) { // Solo ejecuta si profile no es null o undefined
                // Obtén los detalles de las últimas rutas
                const latestRoutes = await getUpcomingRoutes(profile.ultimasrutasguia || []);
                console.log('Ultimas rutas')
                console.log(latestRoutes);

                
                const upcomingRoutes = await getUpcomingRoutes(profile.proximasrutas || []);
                console.log(upcomingRoutes);

                
                const routes = await getRouteDetails(profile.rutasguia || []);
                console.log(routes);

                // Actualiza userData1 con los datos del perfil y las rutas
                const updatedUserData = {
                    name: profile.nombre ?? "Nombre no disponible",
                    role: profile.guia ? "Guía" : "Estudiante",
                    phone: profile.telefono ?? "Teléfono no disponible",
                    email: profile.email ?? "Email no disponible",
                    profileImage: profile.image ?? "https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg?semt=ais_hybrid",
                    latestRoutes,
                    upcomingRoutes,
                    routes,
                };

                setUserData1(updatedUserData);

                // Calcula las estadísticas basadas en las últimas rutas
                const stats = calculateStats(latestRoutes, routes);
                setActivityStats(stats);
            }
        };

        fetchData();
    }, [profile]); // Este efecto se ejecuta cuando profile cambia

    return (
        <div className='perfil'>
            {/* Renderiza el perfil */}
            <div className='perfilIzquierda'>
                <div className='perfilProfileCard'>
                    <h2>Perfil</h2>
                    <div className='perfilEditButton'>
                        <button className="perfileditIcon">
                            <BiEdit />
                        </button>
                    </div>
                    <div className='perfilInfo'>
                        <div className='perfilImagenperfil'>
                            <img className="perfilImagenperfilz" src={userData1.profileImage} alt="ProfileImage" />
                            <p className='perfilRolusuario'>{userData1.role}</p>
                        </div>
                        <div className='perfilInfousuario'>
                            <div className='perfilColumna'>
                                <span className="perfilLabel">Nombre: </span>
                                <span className='perfilValue'> {userData1.name}</span>
                            </div>
                            <div className='perfilColumna'>
                                <span className="perfilLabel">Teléfono: </span>
                                <span className="perfilValue"> {userData1.phone}</span>
                            </div>
                            <div className='perfilColumna'>
                                <span className="perfilLabel">Correo: </span>
                                <span className="perfilValue"> {userData1.email}</span>
                            </div>
                            {profile?.guia && (
                                <div className='perfilGuideDashboardButton'>
                                    {/* Usa Link para redirigir al dashboard del guía */}
                                    <Link to="/perfil" className="perfilguideDashboardBtn">
                                        Ir al Dashboard de Estudiante
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Renderiza las estadísticas y rutas */}
            <div className='perfilDerecha'>
                <div className='perfilEstadisticas'>
                    <h2>Tu Actividad</h2>
                    <div className='perfilEstadisticasActividad'>
                        {Object.entries(activityStats).map(([key, value]) => (
                            <div key={key} className='perfilStatCards'>
                                <span className='perfilValue1'>{value}</span>
                                <span className='perfilLabel1'>{key}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='perfilProximas-Rutas'>
                    <h2>Tus Rutas</h2>
                    {userData1.routes.length > 0 ? (
                        <div className='perfilRutascontainer1'>
                            {userData1.routes.map((route, index) => (
                                <div key={index} className="perfilInfoRutas1">
                                    <div className="perfilimagen-ruta">
                                        <img
                                            src={route.imagen || "https://via.placeholder.com/150"}
                                            alt={route.nombre}
                                            className="perfilpngruta"
                                        />
                                        <div className="perfilRutainfo">
                                            <h3>{route.nombre}</h3>
                                        </div>
                                    </div>
                                    <div className="perfildetallesruta">
                                        <p className='perfilguide'>
                                            <span className="perfilnombreguia">{route.guia} </span>
                                            <span className='perfilrol'>{route.guia}</span>
                                        </p>
                                        <p className="perfilroute-info">Dificultad: {route.dificultad}</p>
                                        <p className="perfilroute-info">Duración: {route.duracion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tienes rutas disponibles.</p>
                    )}
                </div>
                <div className='perfilUltimas-Rutas'>
                    <h2>Guía en las siguientes rutas</h2>
                    {userData1.upcomingRoutes.length > 0 ? (
                        <div className="perfilRutascontainer2">
                            {userData1.upcomingRoutes.map((programado, index) => (
                                <div key={index} className="perfilInfoRutas2">
                                    <div className="perfilimagen-ruta">
                                        <img
                                            src={programado.ruta?.imagen || "https://via.placeholder.com/150"}
                                            alt={programado.ruta?.nombre}
                                            className="perfilpngruta"
                                        />
                                        <div className="perfilRutainfo">
                                            <h3>{programado.ruta?.nombre}</h3>
                                            
                                        </div>
                                    </div>
                                    <div className="perfildetallesruta">
                                        <p>
                                            <span className="perfilnombreguia">{userData1.name} </span>
                                        </p>
                                        <p className="perfilroute-info">Dificultad: {programado.ruta?.dificultad}</p>
                                        <p className="perfilroute-info">Duración: {programado.ruta?.duracion}</p>
                                        <p className="perfilfecha">
                                                Fecha: {new Date(programado.dia?.toDate()).toLocaleString()}
                                            </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tienes próximas rutas programadas.</p>
                    )}
                </div>

                <div className='perfilUltimas-Rutas'>
                    <h2>Ultimas rutas como guia</h2>
                    {userData1.latestRoutes.length > 0 ? (
                        <div className="perfilRutascontainer2">
                            {userData1.latestRoutes.map((programado, index) => (
                                <div key={index} className="perfilInfoRutas2">
                                    <div className="perfilimagen-ruta">
                                        <img
                                            src={programado.ruta?.imagen || "https://via.placeholder.com/150"}
                                            alt={programado.ruta?.nombre}
                                            className="perfilpngruta"
                                        />
                                        <div className="perfilRutainfo">
                                            <h3>{programado.ruta?.nombre}</h3>
                                            
                                        </div>
                                    </div>
                                    <div className="perfildetallesruta">
                                        <p>
                                            <span className="perfilnombreguia">{userData1.name} </span>
                                        </p>
                                        <p className="perfilroute-info">Dificultad: {programado.ruta?.dificultad}</p>
                                        <p className="perfilroute-info">Duración: {programado.ruta?.duracion}</p>
                                        <p className="perfilfecha">
                                                Fecha: {new Date(programado.dia?.toDate()).toLocaleString()}
                                            </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tienes próximas rutas programadas.</p>
                    )}
                </div>


            </div>
        </div>
    );
}