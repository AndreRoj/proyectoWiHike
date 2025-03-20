import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css"; 

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
        </li>
        <li className="sidebar-item">
          <Link to="/adminrutas" className="sidebar-link">
            Rutas
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/solicitudes" className="sidebar-link">
            Solicitudes
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;