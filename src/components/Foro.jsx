import React from "react";
import "../styles/Foro.css";

export function Foro({ titulo, tags, autor, fecha }) {
  return (
    <div className="foro-container">
      <div className="foro-header">
        <h2>{titulo}</h2>
        <p>Publicado por <strong>{autor}</strong> el {fecha}</p>
      </div>
      <div className="foro-tags">
        {tags.map((tag, index) => (
          <span key={index} className="foro-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}