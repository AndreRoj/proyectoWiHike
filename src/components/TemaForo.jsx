
import React, { useState } from 'react';
import "../styles/TemaForo.css";

export function TemaForo({ titulo, autor, fecha, contenido, comentarios }) {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comentarios);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        autor: "UsuarioPrueba", // Puedes cambiar esto por el usuario actual
        rol: "Usuario",
        texto: newComment,
        imagen: "https://via.placeholder.com/50"
      };
      setCommentList([...commentList, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <div className="tema-container">
      <div className="tema-header">
        <h2>{titulo}</h2>
        <p>Publicado por <strong>{autor}</strong> el {fecha}</p>
      </div>
      <div className="tema-content">
        <p>{contenido}</p>
      </div>
      {commentList && commentList.map((comentario, index) => (
        <div key={index} className="comment-container">
          <img src={comentario.imagen} alt={comentario.autor} />
          <div className="comment-content">
            <p className="comment-author">@{comentario.autor}</p>
            <p className="comment-role">{comentario.rol}</p>
            <p>{comentario.texto}</p>
          </div>
        </div>
      ))}
      <form onSubmit={handleAddComment} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Deja un comentario"
          className="comment-input"
        />
        <button type="submit" className="comment-button">Enviar</button>
      </form>
    </div>
  );
}