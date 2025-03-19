import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css"; 

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="admin" className="sidebar-link">
            Página Principal
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/adminrutas" className="sidebar-link">
            Rutas
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/usuarios" className="sidebar-link">
            Usuarios
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;