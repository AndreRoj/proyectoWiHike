import React from 'react';
import FotosGaleria from '../components/FotosGaleria';
import './Galeria.css';

export default function Galeria() {

  return (
    <div className='galeria'>
      <div className='title-galeria'>
        <h1>Galería</h1>
      </div>
      <div className="galeria-container">
        <FotosGaleria />
      </div>
    </div>
  );
}