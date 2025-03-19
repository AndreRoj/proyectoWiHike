import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import './Verrutaitem.css';

const RouteItem = ({ image, name, onEdit, onDelete }) => {
  return (
    <div className="route-item">
      <div className="route-item__image">
        <img src={image} alt={name} />
      </div>
      <div className="route-item__name">
        <span>{name}</span>
      </div>
      <div className="route-item__actions">
        <div className="route-item__action">
          <button onClick={onEdit}>
            <FiEdit />
          </button>
          <span>Editar</span>
        </div>
        <div className="route-item__action">
          <button onClick={onDelete}>
            <FaTrash />
          </button>
          <span>Eliminar</span>
        </div>
      </div>
    </div>
  );
};

export default RouteItem;
