import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ForoPrincipal.css";

export default function ForoPrincipal() {
  const [foros, setForos] = useState([]);
  const [newForo, setNewForo] = useState({ title: '', tags: '', user: '', image: '' });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewForo({ ...newForo, [name]: value });
  };

  const handleAddForo = (e) => {
    e.preventDefault();
    if (newForo.title && newForo.tags && newForo.user && newForo.image) {
      setForos([...foros, { ...newForo, id: foros.length + 1, tags: newForo.tags.split(',') }]);
      setNewForo({ title: '', tags: '', user: '', image: '' });
      setShowForm(false); // Ocultar el formulario después de añadir el foro
    }
  };

  return (
    <div className="foro-principal-container">
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
        {showForm ? 'Cancelar' : 'Crear Foro'}
      </button>
      {showForm && (
        <form onSubmit={handleAddForo} className="add-foro-form">
          <input
            type="text"
            name="title"
            value={newForo.title}
            onChange={handleInputChange}
            placeholder="Título del foro"
            required
          />
          <input
            type="text"
            name="tags"
            value={newForo.tags}
            onChange={handleInputChange}
            placeholder="Etiquetas (separadas por comas)"
            required
          />
          <input
            type="text"
            name="user"
            value={newForo.user}
            onChange={handleInputChange}
            placeholder="Usuario"
            required
          />
          <input
            type="text"
            name="image"
            value={newForo.image}
            onChange={handleInputChange}
            placeholder="URL de la imagen"
            required
          />
          <button type="submit">Añadir Foro</button>
        </form>
      )}
      {foros.map((foro) => (
        <Link to={`/foro/${foro.id}`} key={foro.id} className="foro-link">
          <div className="foro">
            <img src={foro.image} alt={foro.title} className="foro-image" />
            <h2>{foro.title}</h2>
            <div className="tags">
              {foro.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <p className="user">Creado por: {foro.user}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
