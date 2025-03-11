
import { Contacto } from '../components/Contacto';
import { Navbar } from '../components/Navbar';
<<<<<<< HEAD
import {Ruta} from '../components/Ruta';
import "./Rutas.css";
=======
import { Ruta } from '../components/Ruta'; // Importa el componente Ruta
import "./Rutas.css";
import { db } from '../firebase'; // Importa la instancia de Firestore
import { getDocs, collection } from "firebase/firestore";

>>>>>>> parent of eeb42a9 (.)

export default function Rutas() {
    return (
        <div className="listadorutas">
            <Navbar/>

            <div className="ll">

<<<<<<< HEAD
            <Ruta/>
            <Ruta/>
            <Ruta/>
            <Ruta/>
            <Ruta/>
            <Ruta/>
=======
  // Llama a fetchRutas cuando el componente se monta
  useEffect(() => {
    fetchRutas();
  }, []); // El array vacío [] asegura que solo se ejecute una vez
>>>>>>> parent of eeb42a9 (.)

            </div>

<<<<<<< HEAD
            <Contacto/>
        </div>
        
    );
=======
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
>>>>>>> parent of eeb42a9 (.)
}