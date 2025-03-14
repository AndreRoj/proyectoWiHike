import React from 'react';
import "../styles/NuevoTema.css";

export function NuevoTema({ user }) {
    return (
      <div className="nuevo-tema-container">
        <img src={user.image} alt={user.name} className="user-image" />
        <h2>{user.name}</h2>
        <p>{user.role}</p>
        <button className="nuevo-tema-button">Empezar un nuevo tema</button>
      </div>
    );
  }
