import React from 'react';
import './UserRow.css';
import { FiEdit} from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const UserRow = ({ nombre, email, telefono, cedula, type }) => {
  return (
    <div className="user-row">
      <div className="user-cell">{nombre}</div>
      <div className="user-cell">
        <a href={`mailto:${email}`} className="user-email">
          {email}
        </a>
      </div>
      <div className="user-cell">{telefono}</div>
      <div className="user-cell">{cedula}</div>
      <div className="user-cell">{type}</div>
      <div className="user-cell actions">
        <div className="action-button">
          <button className="edit-button">
            <FiEdit />
          </button>
          <span>Editar</span>
        </div>
        <div className="action-button">
          <button className="delete-button">
            <FaTrash />
          </button>
          <span>Borrar</span>
        </div>
      </div>
    </div>
  );
};

export default UserRow;
