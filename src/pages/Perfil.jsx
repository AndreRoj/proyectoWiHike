import React, { useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import './Perfil.css';
import "../styles/RutasPopulares.css";

export default function Perfil() {
  const userData1 = {
    name: "Nicole Tolve",
    role: "Estudiante",
    phone: "+58 4241392205",
    email: "Nicole@correo.unimet.edu.ve",
    profileImage: "https://i.pinimg.com/236x/35/f6/71/35f6716adc65383508eca7cfda5b5594.jpg",
  };

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
    },
  ];

  const latestRoutes = [
   
      {
        name: "SABAS NIEVES",
        guide: "Jose Fernandez",
        guideRole: "Guía de senderismo",
        difficulty: "baja",
        duration: "1 hora 55 min",
        image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        name: "SABAS NIEVES",
        guide: "Jose Fernandez",
        guideRole: "Guía de senderismo",
        difficulty: "baja",
        duration: "1 hora 55 min",
        image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        name: "SABAS NIEVES",
        guide: "Jose Fernandez",
        guideRole: "Guía de senderismo",
        difficulty: "baja",
        duration: "1 hora 55 min",
        image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        name: "SABAS NIEVES",
        guide: "Jose Fernandez",
        guideRole: "Guía de senderismo",
        difficulty: "baja",
        duration: "1 hora 55 min",
        image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        name: "SABAS NIEVES",
        guide: "Jose Fernandez",
        guideRole: "Guía de senderismo",
        difficulty: "baja",
        duration: "1 hora 55 min",
        image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        name: "SABAS NIEVES",
        guide: "Jose Fernandez",
        guideRole: "Guía de senderismo",
        difficulty: "baja",
        duration: "1 hora 55 min",
        image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      
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