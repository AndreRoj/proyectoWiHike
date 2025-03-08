import React from 'react';
import '../styles/MisionVision.css';

export function MisionVision() {
  return (
    <div className="mision-vision-container">
      {/* Sección de Misión */}
      <div className="mision-section">
        <h2 className="section-title">MISIÓN</h2>
        <p className="section-text">
          En busca de ayudar a los estudiantes de la Universidad Metropolitana, a conectar con la naturaleza y prácticas sostenibles para el medio ambiente, a través de WeHike se busca brindar experiencias únicas en excursiones ecológicas y educativas en el Parque Nacional El Ávila, que permita promover la conexión con la naturaleza, la conservación del medio ambiente y el bienestar personal. 
        </p>
      </div>

      {/* Sección de Visión */}
      <div className="vision-section">
        <h2 className="section-title">VISIÓN</h2>
        <p className="section-text">
          En busca de ayudar a los estudiantes de la Universidad Metropolitana, a conectar con la naturaleza y prácticas sostenibles para el medio ambiente, a través de WeHike se busca brindar experiencias únicas en excursiones ecológicas y educativas en el Parque Nacional El Ávila, que permita promover la conexión con la naturaleza, la conservación del medio ambiente y el bienestar personal.
        </p>
      </div>
    </div>
  );
}