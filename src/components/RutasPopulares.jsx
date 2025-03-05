import "../styles/RutasPopulares.css";


export function RutasPopulares({ link, nombre, nombreGuia, duracion, dificultad }) {
  return (
    <article className="ruta-popular">
      <div className="imagen-container">
        <img src={link} alt={nombre} className="imagen" />
        <div className="mas-popular">Más popular</div>
        <h1 className="nombre">{nombre}</h1>
      </div>
      <div className="detalles">
        <div className="guia">
          <strong>{nombreGuia}</strong> Guía de senderismo
        </div>
 
        <div className="duracion">
          Duración {duracion}
        </div>
        <div className="dificultad">
          Dificultad {dificultad}
        </div>
      </div>
    </article>
  );
}