import React, { useEffect, useState } from 'react';
import { Contacto } from '../components/Contacto';
import { Navbar } from '../components/Navbar';
import { Ruta } from '../components/Ruta'; // Importa el componente Ruta
import "./Rutas.css";
import { db } from '../firebase'; // Importa la instancia de Firestore
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
    <div className="listadorutas">
      <div className="ll">
        {/* Mapea las rutas y crea un componente Ruta por cada una */}
        {rutas.map((ruta) => (
          <Ruta
            key={ruta.id} // Clave única para cada Ruta
            imagen={ruta.imagen} // Pasa la imagen de la ruta
            nombre={ruta.nombre} // Pasa el nombre de la ruta
            descripcion={ruta.descripcion} // Pasa la descripción de la ruta
            nombreguia={ruta.nombreguia} // Pasa el nombre del guía
            duracion={ruta.duracion} // Pasa la duración de la ruta
            kilometros={ruta.kilometros} // Pasa los kilómetros de la ruta
            estrellas={ruta.estrellas} // Pasa las estrellas de la ruta
          />
        ))}
      </div>
      <Contacto />
    </div>
  );
}