import "./HomePage.css";
import { RutasPopulares } from '../components/RutasPopulares';
import { Contacto } from '../components/Contacto';
import { MisionVision } from '../components/MisionVision';
import { use } from "react";
import { UserContext } from '../Context/UserContext';
import { db } from '../firebase'; 
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const contextUser = use(UserContext);
  const { user, setUser } = contextUser;
  console.log(user);

  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener rutas de Firestore
  const fetchRutas = async () => {
    try {
      const rutasRef = collection(db, "rutas");
      const q = query(rutasRef, orderBy("estrellas", "desc"), limit(3)); // Ordena por "estrellas" y limita a 3
      const querySnapshot = await getDocs(q);

      const rutasList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID del documento
        ...doc.data(), 
      }));

      setRutas(rutasList); // Almacena las rutas en el estado
    } catch (error) {
      console.error("Error fetching documents: ", error);
      setError("Error al cargar las rutas"); // Establece un mensaje de error
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Llama a fetchRutas cuando el componente se monta
  useEffect(() => {
    fetchRutas();
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Cargando rutas...</div>;
  }

  // Muestra un mensaje de error si algo falla
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='HomePage'>
      <div className='pagina' data-aos="fade-down">
        <div className="title-container">
          <h1 className='titulo1' data-aos="fade-right">EXPLORA NUEVAS AVENTURAS</h1>
          <h1 className='titulo2' data-aos="fade-right">EN LA NATURALEZA.</h1>
        </div>

        <div className="rutas-section">
          <h3 className="rutas-title" data-aos="slide-up">RUTAS</h3>
        </div>

        <div className='rutas'>
          {rutas.map((ruta) => (
            <RutasPopulares
              id = {ruta.id}
              link={ruta.imagen}
              nombre={ruta.nombre}
              nombreGuia={ruta.nombreguia}
              duracion={ruta.duracion}
              dificultad= "Alta"
            />
          ))}
        </div>

        <div className="sobrewehike">
          <h3 className="wehike" data-aos="slide-up">SOBRE WEHIKE</h3>
        </div>
        <MisionVision />
        <Contacto />
      </div>
    </div>
  );
}