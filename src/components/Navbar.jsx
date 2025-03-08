import React from "react";
import logo from '../assets/Logo.png'
import "../styles/Navbar.css";
import { IoSearch } from "react-icons/io5";



export function Navbar() {
    return (
      <div className="Navbar">
      {/* Elementos a la izquierda */}
      <ul>
        <li className="options">Rutas</li> 
        <li className="options">Galeria</li>
        <li className="options">Foro</li>
      </ul>

      {/* Logo en el centro */}
      <img
        src={logo}
        alt="Logo"
        style={{ width: '16%', height: 'auto' }}
      />

      {/* Elementos a la derecha */}
      <ul>
        <li className="options">
          <IoSearch />
        </li>
        <li className="options">Cuenta</li>
        <li className="options">Contáctanos</li>
      </ul>
    </div>
    );
  }