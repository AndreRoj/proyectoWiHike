import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
import "../styles/Navbar.css";
import { IoSearch } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from '../Context/UserContext';
import { app } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(app);

export function Navbar() {
  const profileContext = React.useContext(UserContext);
  const { logged, profile } = profileContext;
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Estado para saber si es móvil

  // Función para detectar si es móvil
  const checkIsMobile = () => {
    return window.innerWidth <= 768; 
  };

  // Efecto para actualizar el estado cuando cambia el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(checkIsMobile()); // Actualiza el estado cuando cambia el tamaño de la pantalla
    };

    window.addEventListener('resize', handleResize); // Escucha el evento de redimensionamiento
    return () => {
      window.removeEventListener('resize', handleResize); // Limpia el evento al desmontar el componente
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
      console.log("Usuario cerró sesión");
      window.location.reload();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna la visibilidad del menú
  };

  // Vista para móviles
  const MobileView = () => (
    <div className="Navbar" data-aos="fade-down">
      {/* Ícono de hamburguesa */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />} {/* Cambia el ícono si el menú está abierto */}
      </div>

      {/* Logo en el centro */}
      <Link style={{ width: '50%', height: 'auto' }} to="/">
        <img src={logo} alt="Logo" />
      </Link>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <Link className="options" to="/rutas" onClick={toggleMenu}>
                Rutas
              </Link>
            </li>
            <li className="options" onClick={toggleMenu}>Galeria</li>
            <li className="options" onClick={toggleMenu}>Foro</li>
            <li className="options">
              <IoSearch />
            </li>
            {logged ? (
              // Si el usuario está logueado
              <>
                <li>
                  <Link className="options" to="/profile" style={{ color: '#4CAF50' }} onClick={toggleMenu}>
                    {profile?.nombre || profile?.email || 'Perfil'}
                  </Link>
                </li>
                <li className="options" onClick={handleLogout}>Salir</li>
              </>
            ) : (
              // Si el usuario no está logueado
              <>
                <li>
                  <Link className="options" to="/login" onClick={toggleMenu}>
                    Ingresa
                  </Link>
                </li>
                <li>
                  <Link className="options" to="/register" onClick={toggleMenu}>
                    Registrate
                  </Link>
                </li>
              </>
            )}
            <li className="options" onClick={toggleMenu}>Contáctanos</li>
          </ul>
        </div>
      )}
    </div>
  );

  // Vista para escritorio
  const DesktopView = () => (
    <div className="Navbar" data-aos="fade-down">
      {/* Elementos a la izquierda */}
      <ul>
        <li>
          <Link className="options" to="/rutas">
            Rutas
          </Link>
        </li>
        <li>  <Link className="options" to="/Perfil">
            Perfil
          </Link>
          </li>
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
                {profile?.nombre || profile?.email || 'Perfil'}
              </Link>
            </li>
            <li className="options" onClick={handleLogout}>Salir</li>
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

        <li> 
          <Link className="options" to = '/contactanos'>
          Contáctanos
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {isMobileView ? <MobileView /> : <DesktopView />}
      <Outlet />
    </>
  );
}