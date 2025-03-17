import React from 'react';
import '../styles/ResExito.css';
import iconoExito from '../assets/icono-exito.png'; 
import Finalizar from './Finalizar';

export default function ResExito() {
  return (
    <div className="res-exito-container">
      <div className="icono-exito">
        <img src={iconoExito} alt="Éxito" className="icono-exito-img" />
      </div>
      <p className="mensaje-exito">Tu reserva se ha realizado exitosamente</p>
      <Finalizar />
    </div>
  );
}