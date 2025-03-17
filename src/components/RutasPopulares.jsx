import "../styles/RutasPopulares.css";
import { Link } from 'react-router-dom'; // Cambia esta línea


export function RutasPopulares({ id, link, nombre, nombreGuia, duracion, dificultad }) {
  return (

    <Link to={`/info_rutas/${id}`}> {/* Enlace dinámico usando el ID de la ruta */}  
    <article className="ruta-popular" data-aos="fade-up">
      <div className="imagen-container h-screen">
        <img src={link} alt={nombre} className="imagen" />
        <div className="mas-popular">Más popular</div>
        <h1 className="nombre">{nombre}</h1>
      </div>
      <div className="detallesruta">
        <div className="guia">
          <strong>{nombreGuia}</strong> Guía de senderismo
        </div>
 
        <div className="duracion">
          Duración {duracion} minutos
        </div>
        <div className="dificultad">
          Dificultad {dificultad}
        </div>
      </div>
    </article>
    </Link>
  );
}