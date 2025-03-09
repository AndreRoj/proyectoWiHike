import React from "react";
import logo from '../assets/Logo.png'
import "../styles/Navbar.css";
import { IoSearch } from "react-icons/io5";
import { Link, Outlet } from "react-router";



export function Navbar() {


    return (

      <>
      <div className="Navbar">
      {/* Elementos a la izquierda */}
      <ul>
        <li> 
          <Link className="options" to = '/rutas'>Rutas</Link>
        </li>



        {/* <li className="options">Rutas</li>  */}
        <li className="options">Galeria</li>
        <li className="options">Foro</li>
      </ul>

      {/* Logo en el centro */}
      <Link style={{ width: '16%', height: 'auto' }} to = '/'> 
      <img
        src={logo}
        alt="Logo"
        
      />
      </Link>

      {/* Elementos a la derecha */}
      <ul>
        <li className="options">
          <IoSearch />
        </li>

        <li> 
          <Link className="options" to = '/login'>Login</Link>
        </li>

        <li> 
          <Link className="options" to = '/register'>sign up</Link>
        </li>

        <li className="options">Contáctanos</li>
      </ul>
    </div>
      <Outlet/>
    </>
    );
  }