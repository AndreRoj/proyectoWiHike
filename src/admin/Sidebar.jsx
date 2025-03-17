import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <nav className="navigation">
          <div className="sidenavItems">
            <ul>
              <li className="nav-item ">Página principal</li>
              <li className="nav-item">Rutas</li>
              <li className="nav-item">Usuarios</li>
              <li className="nav-item">Salir</li>
            </ul>
          </div>
        </nav>
      );
    };

export default Sidebar;