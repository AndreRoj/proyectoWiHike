import React from 'react'
import { FiEdit} from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import Header from './Headeradmin';
import Sidebar from './Sidebar';
import UserRow from './UserRow';
import './Usuarioadmin.css';

export const Usuario = ({ users }) => {
    
    return (
      <div className="usuarioadmin">
        <Header />
        <div className="usuario-content">
          <Sidebar />
          <main className="main-content">
            <h2 className="section-title">Usuarios</h2>
            <div className="user-table">
              <div className="table-header">
                <div className="usuario-cell">Nombre</div>
                <div className="usuario-cell">Email</div>
                <div className="usuario-cell">Nº de teléfono</div>
                <div className="usuario-cell">Cédula</div>
                <div className="usuario-cell">Tipo</div>
                <div className="usuario-cell">...</div>
              </div>
                <UserRow
                  nombre={"user.nombre"}
                  email={"user.email"}
                  telefono={"user.telefono"}
                  cedula={"user.cedula"}
                  type={"user.type"}
                />
            </div>
          </main>
        </div>
      </div>
    );
  };
  
  export default Usuario;