import React, { useContext, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './Perfil.css';
import "../styles/RutasPopulares.css";
import { UserContext } from '../Context/UserContext';
import { collection, getDocs, query, where, doc, updateDoc, getFirestore} from 'firebase/firestore';
import { app } from '../firebase';
import { getAuth } from 'firebase/auth';
import { uploadImage } from '../supabaseClient';

const db = getFirestore(app);
const auth = getAuth(app)

export default function Perfil() {
    const profileContext = useContext(UserContext);
    const { logged, profile, setProfile } = profileContext;
    const [isUploading, setIsUploading] = useState(false); 

    const [userData1, setUserData1] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
        profileImage: "",
        latestRoutes: [],
        upcomingRoutes: [],
    });

    // Estado para las estadísticas
    const [activityStats, setActivityStats] = useState({
        Tiemposenderismo: "0h 0m",
        Kmrecorridos: "0 KM",
        Rutasrealizadas: "0",
    });
 
    //borrar
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar la visibilidad del formulario de edición
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        profileImage: "",
    });

    // Función para obtener los detalles de las rutas
    const getRouteDetails = async (routeIds) => {
        if (!routeIds || routeIds.length === 0) return []; // Si no hay IDs, retorna un array vacío

        const routesCollection = collection(db, 'rutas'); // Asegúrate de que 'rutas' es el nombre correcto de tu colección
        const q = query(routesCollection, where('__name__', 'in', routeIds)); // Consulta las rutas con los IDs proporcionados
        const querySnapshot = await getDocs(q);

        // Mapea los documentos a un array de objetos con los datos de las rutas
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    };

    // Función para calcular las estadísticas
    const calculateStats = (latestRoutes) => {
        let totalKm = 0;
        let totalDuration = 0; // Duración en minutos
        let totalRoutes = latestRoutes.length;

        latestRoutes.forEach(route => {
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


    //borrar
    const handleEditClick = () => {
      setIsEditing(true);
      setFormData({
          name: userData1.name,
          phone: userData1.phone,
          email: userData1.email,
          profileImage: userData1.profileImage,
      });
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value,
      });
  };

  // Función para manejar la subida de la imagen de perfil
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Obtiene el archivo del input
    if (!file) {
        alert("Por favor, selecciona un archivo.");
        return;
    }

    try {
        setIsUploading(true);

        // Obtén el usuario actual
        const user = auth.currentUser;
        if (!user || !user.uid) {
            throw new Error("No hay un usuario autenticado o el UID no está disponible.");
        }

        // Sube la imagen a Supabase
        const imageUrl = await uploadImage(file, 'avatars', `user_${user.uid}`);
        console.log("URL de la imagen:", imageUrl); // Depuración

        if (!imageUrl) {
            throw new Error("No se pudo obtener la URL de la imagen.");
        }

        // Actualiza Firestore con la nueva URL de la imagen
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
            image: imageUrl, // Asegúrate de que imageUrl no sea undefined
        });

        // Actualiza el estado local (userData1)
        setUserData1((prevUserData) => ({
            ...prevUserData,
            profileImage: imageUrl,
        }));

        // Actualiza el contexto (profile)
        setProfile((prevProfile) => ({
            ...prevProfile,
            image: imageUrl,
        }));

        console.log("Foto de perfil actualizada correctamente:", imageUrl);
    } catch (error) {
        console.error("Error al subir la imagen o actualizar el perfil:", error);
        alert("Hubo un error al actualizar la foto de perfil.");
    } finally {
        setIsUploading(false); // Desactiva el estado de carga
    }
};

  // Función para guardar los cambios
  const handleSave = async () => {
      try {
          const userDocRef = doc(db, 'users', profile.uid); // Asegúrate de que 'users' es el nombre de tu colección
          await updateDoc(userDocRef, {
              nombre: formData.name,
              telefono: formData.phone,
              email: formData.email,
              image: formData.profileImage,
          });

          // Actualiza el estado local
          setUserData1({
              ...userData1,
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              profileImage: formData.profileImage,
          });

          setIsEditing(false); // Cierra el formulario de edición
          alert('Perfil actualizado correctamente.');
      } catch (error) {
          console.error('Error al actualizar el perfil:', error);
          alert('Hubo un error al actualizar el perfil.');
      }
  };

    useEffect(() => {
        const fetchData = async () => {
            if (profile) { // Solo ejecuta si profile no es null o undefined
                // Obtén los detalles de las últimas rutas
                const latestRoutes = await getRouteDetails(profile.ultimasrutas || []);
                console.log(latestRoutes);
                // Obtén los detalles de las próximas rutas
                const upcomingRoutes = await getRouteDetails(profile.proximasrutas || []);
                console.log(upcomingRoutes);

                // Actualiza userData1 con los datos del perfil y las rutas
                const updatedUserData = {
                    name: profile.nombre ?? "Nombre no disponible",
                    role: profile.guia ? "Guía" : "Estudiante",
                    phone: profile.telefono ?? "Teléfono no disponible",
                    email: profile.email ?? "Email no disponible",
                    profileImage: profile.image ?? "https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg?semt=ais_hybrid",
                    latestRoutes,
                    upcomingRoutes,
                };

                setUserData1(updatedUserData);

                // Calcula las estadísticas basadas en las últimas rutas
                const stats = calculateStats(latestRoutes);
                setActivityStats(stats);
            }
        };

        fetchData();
    }, [profile]); // Este efecto se ejecuta cuando profile cambia

    return (
      <div className='perfil'>
          <div className='perfilIzquierda'>
              <div className='perfilProfileCard'>
                  <h2>Perfil</h2>
                  <div className='perfilEditButton'>
                      <button className="perfileditIcon" onClick={handleEditClick}>
                          <BiEdit />
                      </button>
                  </div>
                  <div className='perfilInfo'>
                      <div className='perfilImagenperfil'>
                          <img className="perfilImagenperfilz" src={userData1.profileImage} alt="ProfileImage" />
                          <p className='perfilRolusuario'>{userData1.role}</p>
                      </div>
                      {isEditing ? (
                          <div className='container'>
                            <div className='perfilEditForm'>
                              <span style={{color: '#009000'}}>Nombre: </span>
                              <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  placeholder="Nombre"
                              />
                            </div>
                            <div className='perfilEditForm'>
                              <span style={{color: '#009000'}}>Telefono: </span>  
                              <input
                                  type="text"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="Teléfono"
                              />
                            </div>
                            <div className='perfilEditForm'>
                              <span style={{color: '#009000'}}>Email: </span>   
                              <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="Correo"
                              />
                            </div>
                            <div className='perfilEditForm'>
                              <span style={{color: '#009000'}}>Foto de perfil: </span> 
                              <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                              />
                            </div>
                            <div style={{marginTop: '30px'}}>
                              <button onClick={handleSave}>Guardar</button>
                              <button onClick={() => setIsEditing(false)}>Cancelar</button>
                            </div>
                        </div>
                          
                      ) : (
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
                                      <Link to="/guia" className="perfilguideDashboardBtn">
                                          Ir al Dashboard de Guía
                                      </Link>
                                  </div>
                              )}
                          </div>
                      )}
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
                    <h2>Próximas Rutas Programadas</h2>
                    {userData1.upcomingRoutes.length > 0 && (
                        <div className='perfilRutascontainer1'>
                            {userData1.upcomingRoutes.map((route, index) => (
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
                    )}
                </div>
                <div className='perfilUltimas-Rutas'>
                    <h2>Últimas Rutas</h2>
                    {userData1.latestRoutes.length > 0 && (
                        <div className="perfilRutascontainer2">
                            {userData1.latestRoutes.map((route, index) => (
                                <div key={index} className="perfilInfoRutas2">
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
                                        <p>
                                            <span className="perfilnombreguia">{route.guia} </span>
                                            <span className='perfilrol'>{route.guia}</span>
                                        </p>
                                        <p className="perfilroute-info">Dificultad: {route.dificultad}</p>
                                        <p className="perfilroute-info">Duración: {route.duracion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                  <div className='perfilUltimas-Rutas'>
                    <h2>Últimas Rutas</h2>
                    {userData1.latestRoutes.length > 0 && (
                        <div className="perfilRutascontainer2">
                            {userData1.latestRoutes.map((route, index) => (
                                <div key={index} className="perfilInfoRutas2">
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
                                        <p>
                                            <span className="perfilnombreguia">{route.guia} </span>
                                            <span className='perfilrol'>{route.guia}</span>
                                        </p>
                                        <p className="perfilroute-info">Dificultad: {route.dificultad}</p>
                                        <p className="perfilroute-info">Duración: {route.duracion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
