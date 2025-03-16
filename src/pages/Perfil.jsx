import React, { useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import './Perfil.css';
import "../styles/RutasPopulares.css";
import { UserContext } from '../Context/UserContext';

export default function Perfil() {
    const profileContext = React.useContext(UserContext);
    const { logged, profile } = profileContext;


    console.log(logged, profile)

    const userData1 = {
        name: "",
        role: "",
        phone: "",
        email: "",
        profileImage: "",
      };
    
      // Actualiza userData1 según el valor de profile.guia
      if (profile?.guia === false) {
        userData1.name = profile.nombre ?? "Nombre no disponible";
        userData1.role = "Estudiante";
        userData1.phone = profile.telefono ?? "Teléfono no disponible";
        userData1.email = profile.email ?? "Email no disponible";
        userData1.profileImage = profile.image ?? "https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg?semt=ais_hybrid";
      } else if (profile?.guia === true) {
        userData1.name = profile.nombre ?? "Nombre no disponible";
        userData1.role = "Guía";
        userData1.phone = profile.telefono ?? "Teléfono no disponible";
        userData1.email = profile.email ?? "Email no disponible";
        userData1.profileImage = profile.image ?? "https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg?semt=ais_hybrid";
      }

    



  const activityStats = {
    Tiemposenderismo: "5h 10m",
    Kmrecorridos: "10,3 KM",
    Rutasrealizadas: "2",
  };

  const upcomingRoutes = [
    {
      name: "Humboldt",
      guide: "Jose Fernandez",
      guideRole: "Guía de senderismo",
      difficulty: "media",
      duration: "3 hora 14 min",
      startTime: "10:00am",
      endTime: "1:14pm (aprox)",
      image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    }
  ];

  const latestRoutes = [
   
      {
        name: "SABAS NIEVES",
        guide: "Jose Fernandez",
        guideRole: "Guía de senderismo",
        difficulty: "baja",
        duration: "1 hora 55 min",
        image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      }
      
  ];

  return (
    <div className='perfil'>
      {/* Renderiza el perfil */}
      <div className='Izquierda'>
        <div className='ProfileCard'>
          <h2>Perfil</h2>
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
                <span className="Label">Nombre:</span>
                <span className='Value'>{userData1.name}</span>
              </div>
              <div className='Columna'>
                <span className="Label">Teléfono:</span>
                <span className="Value">{userData1.phone}</span>
              </div>
              <div className='Columna'>
                <span className="Label">Correo:</span>
                <span className="Value">{userData1.email}</span>
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
        <div className='Proximas-Rutas'>
          <h2>Próximas Rutas Programadas</h2>
          <div className='Rutascontainer1'>
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
        <div className='Ultimas-Rutas' >
          <h2>Últimas Rutas</h2>
          <div className="Rutascontainer2" >
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
  );
}
