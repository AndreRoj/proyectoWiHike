import React from 'react';
import '../styles/Finalizar.css';
import { Link } from 'react-router-dom'; // Cambia esta línea

export default function Finalizar() {
  return (
    <Link to="/">
    <button className="finalizar-button">
      Finalizar
    </button>
    </Link>
  );
}