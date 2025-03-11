import React, { use } from 'react';
import logo from '../assets/Logo.png';
import "../styles/Navbar.css";
import { IoSearch } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { UserContext } from '../Context/UserContext';
import { app } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(app);

export function Navbar() {
  const profileContext = use(UserContext);
  const { logged, profile } = profileContext;

  console.log("Estado de logged:", logged);
  console.log("Perfil del usuario:", profile);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
      console.log("Usuario cerró sesión");
      window.location.reload();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <div className="Navbar" data-aos="fade-down">
        {/* Elementos a la izquierda */}
        <ul>
          <li>
            <Link className="options" to="/rutas">
              Rutas
            </Link>
          </li>
          <li className="options">Galeria</li>
          <li className="options">Foro</li>
        </ul>

        {/* Logo en el centro */}
        <Link style={{ width: '16%', height: 'auto' }} to="/">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Elementos a la derecha */}
        <ul>
          <li className="options">
            <IoSearch />
          </li>

          {/* Mostrar opciones condicionales */}
          {logged ? (
            // Si el usuario está logueado
            <>
              <li>
                <Link className="options" to="/profile" style={{ color: '#4CAF50' }}>
                  {profile?.nombre || profile?.email || 'Perfil'} {/* Muestra el nombre o el correo del usuario */}
                </Link>
              </li>
              <li className="options" onClick={handleLogout} >Cerrar sesión</li>
            </>
          ) : (
            // Si el usuario no está logueado
            <>
              <li>
                <Link className="options" to="/login">
                  Ingresa
                </Link>
              </li>
              <li>
                <Link className="options" to="/register">
                  Registrate
                </Link>
              </li>
            </>
          )}

          <li className="options">Contáctanos</li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}