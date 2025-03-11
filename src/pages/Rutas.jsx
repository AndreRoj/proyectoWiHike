import React, { useEffect, useState } from 'react';
import { Contacto } from '../components/Contacto';
import { Navbar } from '../components/Navbar';
import { Ruta } from '../components/Ruta'; 
import "./Rutas.css";
import { db } from '../firebase'; 
import { getDocs, collection } from "firebase/firestore";


export default function Rutas() {
  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener rutas de Firestore
  const fetchRutas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "rutas"));
      const rutasList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID del documento
        ...doc.data(), // Resto de los datos de la ruta
      }));
      setRutas(rutasList); // Almacena las rutas en el estado
    } catch (error) {
      console.error("Error fetching documents: ", error);
      setError("Error al cargar las rutas"); // Establece un mensaje de error
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  
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
    <div className="listadorutas" >
      <div className="ll">
        {/* Mapea las rutas y crea un componente Ruta por cada una */}
        {rutas.map((ruta) => (
          <Ruta
            key={ruta.id} 
            imagen={ruta.imagen} 
            nombre={ruta.nombre} 
            descripcion={ruta.descripcion} 
            nombreguia={ruta.nombreguia} 
            duracion={ruta.duracion} 
            kilometros={ruta.kilometros} 
            estrellas={ruta.estrellas} 
          />
        ))}
      </div>
      <Contacto />
    </div>
  );
}