import '../styles/NuevoTema.css';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { Foro } from '../components/Foro';

export default function NuevoTema({ user }) {
  const { profile } = useContext(UserContext); // Obtener usuario desde contexto
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'foro'), {
        nombre,
        descripcion,
        nombreusuario: profile?.nombre || "Anónimo",
        idusuario: profile?.id || "desconocido",
        mensajes: [] // Se inicia con un array vacío de mensajes
      });

      setNombre('');
      setDescripcion('');
      setMostrarFormulario(false);
      alert("Foro creado con éxito 🎉");
    } catch (error) {
      console.error("Error al crear el foro:", error);
      alert("Hubo un error al crear el foro. Inténtalo de nuevo.");
    }

    setLoading(false);
  };

  return (
    <div className="nuevo-tema-container">
      <img src={user.image} alt={user.name} className="user-image" />
      <h2>{user.name}</h2>

      {!mostrarFormulario ? (
        <button 
          className="nuevo-tema-button" 
          onClick={() => setMostrarFormulario(true)}
        >
          Empezar un nuevo tema
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="nuevo-tema-form">
          <input
            type="text"
            placeholder="Nombre del tema"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción del tema"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Creando..." : "Crear Tema"}
            </button>
            <button type="button" className="cancel-button" onClick={() => setMostrarFormulario(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}