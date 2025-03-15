import React, { useEffect, useState, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Usuario from '../components/Usuario';
import { UserContext } from '../Context/UserContext';
import './Perfil.css';
import { BiEdit } from 'react-icons/bi';
import "../styles/RutasPopulares.css";

function Perfil() {
 {/* const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        const fetchUserData = async () => {
        if (user) {
            try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                console.log('No such document!');
            }
            } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Error al cargar los datos del usuario');
            } finally {
            setLoading(false);
            }
        }
        };

        fetchUserData();
    }, [user]);

    if (loading) {
        return <div>Cargando datos del usuario...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
        */}
      // User profile data
  const userData1 = {
    name: "Nicole Tolve",
    role: "Estudiante",
    phone: "+58 4241392205",
    email: "Nicole@correo.unimet.edu.ve",
    profileImage: "https://c.animaapp.com/tTE84wI0/img/image@2x.png",
  };

  // Activity stats data
  const activityStats = { 
    Tiemposenderismo: "5h 10m", 
    Kmrecorridos: "10,3 KM",
    Rutasrealizadas: "2",
    };
    
  

  // Upcoming routes data
  const upcomingRoutes = [
    {
      name: "Humboldt",
      guide: "Jose Fernandez",
      guideRole: "Guía de senderismo",
      difficulty: "media",
      duration: "3 hora 14 min",
      startTime: "10:00am",
      endTime: "1:14pm (aprox)",
      image:
        "https://c.animaapp.com/tTE84wI0/img/eyjidwnrzxqioijhc3nldhmuywxsdhjhawxzlmnvbsisimtlesi6invwbg9hzhmv-2@2x.png",
    },
  ];

  // Latest routes data
  const latestRoutes = [
    {
      name: "SABAS NIEVES",
      guide: "Jose Fernandez",
      guideRole: "Guía de senderismo",
      difficulty: "baja",
      duration: "1 hora 55 min",
      image:
        "https://c.animaapp.com/tTE84wI0/img/eyjidwnrzxqioijhc3nldhmuywxsdhjhawxzlmnvbsisimtlesi6invwbg9hzhmv-1@2x.png",
    },
    {
      name: "PICO NAIGUATÁ",
      guide: "Jose Fernandez",
      guideRole: "Guía de senderismo",
      difficulty: "alta",
      duration: "9 hora 21 min",
      image:
        "https://c.animaapp.com/tTE84wI0/img/eyjidwnrzxqioijhc3nldhmuywxsdhjhawxzlmnvbsisimtlesi6invwbg9hzhmv@2x.png",
    },
  ];
    return (
        <div className='perfil'>
            <div className='Izquierda'>
               {/* <ul>
                    {userData && (
                        <Usuario
                        nombre={userData.nombre}
                        apellido={userData.apellido}
                        correo={userData.email}
                        telefono={userData.telefono}
                        fechadenacimiento={userData.fechaNacimiento.toDate().toLocaleDateString()}
                        cedula={userData.cedula}
                        />
                    )}
                </ul> */}
                <div className='ProfileCard'>
                <h2>Perfil</h2>
                    <div className='EditButton'>
                        <button  className="editIcon">
                        <BiEdit />
                        </button>
                    </div>
                    <div className='Info'>
                        <div className='Imagenperfil'>
                            <img className="Imagen" 
                            src={userData1.profileImage} 
                            alt="ProfileImage" />
                            <p className='Rolusuario'>{userData1.role}</p>
                        </div>
                        <div className='Infousuario' >
                            <div className='Columna'>
                            <span className="Label" style={{ textAlign: 'left' }}> Nombre: </span>
                            <span className='Value'>{userData1.name}</span>
                            </div>
                            <div className='Columna'>
                            <span className="Label" style={{ textAlign: 'left' }} > Telefono:</span>
                            <span className="Value">{userData1.phone}</span>
                            </div>
                            <div className='Columna'>
                            <span className="Label" style={{ textAlign: 'left' }}> Correo:</span>
                            <span className="Value" style={{ fontSize:'18px'}}>{userData1.email}</span>
                            </div>
                        </div>
                        <div className="Cerrasesion">
                            <button className="logout">Cerrar sesion</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Derecha'>
                <div className='Estadisticas'>
                    <h2>Tu Actividad</h2>
                    <div className='EstadisticasActividad'>
                        <div className='StatCards'>
                            <span className='Value1'>{activityStats.Tiemposenderismo}</span>
                            <span className='Label1'> Horas de senderismo </span>
                        </div>
                        <div className='StatCards'>
                            <span className='Value1'>{activityStats.Kmrecorridos}</span>
                            <span className='Label1'> Kilometros recorridos </span>
                        </div>
                        <div className='StatCards'>
                            <span className='Value1'>{activityStats.Rutasrealizadas}</span>
                            <span className='Label1'> Rutas realizadas </span>
                        </div> 
                    </div>
                </div>
                <div className='Proximas-Rutas'>
                    <h2>Proximas Rutas Programadas</h2>
                    <div className='Rutascontainer1'>
                       {/*Aqui van las proximas rutas del usuario. No se como hacerlo todavia*/ }
                       {/* La idea es que todo se haga desde el prop de rutas*/ }
                       {/* {rutas.map((ruta) => (
                                <RutasPopulares
                                    key={ruta.id}
                                    link={ruta.imagen}
                                    nombre={ruta.nombre}
                                    nombreGuia={ruta.nombreguia}
                                    duracion={ruta.duracion}
                                    dificultad= "Alta"
                                />
                                ))}*/}
                        <div className='Wrapcard'>
                        {upcomingRoutes.map((route, index) => (
                            <div key={index} className="InfoRutas1">
                            <div className="imagen-ruta">
                            <img
                                src={route.image}
                                alt={route.name}
                                className="pngruta"
                            />
                            <div className="Rutainfo">
                                <h3>{route.name}</h3>
                            </div>
                            </div>
                            <div className="detallesruta">
                            <p className='guide'>
                                <span className="nombreguia">{route.guide} </span>
                                <span className='rol'>{route.guideRole}</span>
                            </p>
                            <p className="route-info">Dificultad: {route.difficulty}</p>
                            <p className="route-info">Duración: {route.duration}</p>
                            <p className="route-info">Hora de inicio: {route.startTime}</p>
                            <p className="route-info">Hora de culminacion: {route.endTime}</p>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                    </div>
                <div className='Ultimas-Rutas'>
                    <h2> Ultimas Rutas </h2>
                     {/*Aqui van las proximas rutas del usuario. No se como hacerlo todavia*/ }
                     <div className="Rutascontainer2">
                        {latestRoutes.map((route, index) => (
                            <div key={index} className="InfoRutas2">
                            <div className="imagen-ruta">
                                <img
                                src={route.image}
                                alt={route.name}
                                className="pngruta"
                                />
                                <div className="Rutainfo">
                                <h3 >{route.name}</h3>
                                </div>
                            </div>
                            <div className="detallesruta">
                                <p>
                                <span className="nombreguia">{route.guide} </span>
                                <span className='rol'>{route.guideRole}</span>
                                </p>
                                <p className="route-info">Dificultad: {route.difficulty}</p>
                                <p className="route-info">Duración: {route.duration}</p>
                            </div>
                            </div>
                            ))}
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}
export default Perfil;