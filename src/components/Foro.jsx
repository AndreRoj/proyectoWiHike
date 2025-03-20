import React from "react";
import "../styles/Foro.css";

export function Foro({ titulo, autor}) {
  return (
    <div className="foro-container">
      <div className="foro-header">
        <h2>{titulo}</h2>
        <p>Publicado por <strong>{autor}</strong> el </p>
      </div>
    </div>
  );
}