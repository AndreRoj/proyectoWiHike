import './ForoPrincipal.css';
import { Link } from 'react-router-dom';
import NuevoTema from '../components/NuevoTema';
import { Foro } from '../components/Foro';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ForoPrincipal() {
  const profileContext = useContext(UserContext);

  if (!profileContext) {
    return <p>Cargando usuario...</p>; // Evitar que la app se rompa si el contexto aún no está disponible
  }

  const { logged, profile = {} } = profileContext;
  const [foros, setForos] = useState([]);

  // Función para obtener los foros desde Firebase
  const fetchForos = async () => {
    try {
      const forosCollection = collection(db, 'foro');
      const forosSnapshot = await getDocs(forosCollection);
      const forosData = forosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setForos(forosData);
    } catch (error) {
      console.error('Error al obtener los foros:', error);
      setForos([]); // Asegurar que no sea undefined
    }
  };

  useEffect(() => {
    fetchForos();
  }, []);

  const user = {
    image: profile?.image ?? "https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg?semt=ais_hybrid",
    name: profile?.nombre ?? "Usuario Anónimo"
  };

  return (
    <div className="foro-principal-container">
      <div className="nuevo-tema-container">
        <NuevoTema user={user} />
      </div>
      <div className="foros-container">
        {Array.isArray(foros) && foros.length > 0 ? (
          foros.map((foro) => (
            <Link key={foro.id} to={`/foro/${foro.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Foro titulo={foro.nombre} autor={foro.nombreusuario} />
            </Link>
          ))
        ) : (
          <p>No hay foros disponibles.</p>
        )}
      </div>
    </div>
  );
}
