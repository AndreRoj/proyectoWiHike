// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import './ForoDetalle.css'

// export default function ForoDetalle() {
//   const { id } = useParams(); // Obtiene el ID del foro desde la URL
//   const [foro, setForo] = useState(null);
//   const [mensaje, setMensaje] = useState('');
//   const [mensajes, setMensajes] = useState([]);

//   useEffect(() => {
//     const fetchForo = async () => {
//       try {
//         const foroRef = doc(db, 'foro', id);
//         const foroSnap = await getDoc(foroRef);
//         if (foroSnap.exists()) {
//           const foroData = foroSnap.data();
//           setForo(foroData);
//           setMensajes(foroData.mensajes || []);
//         } else {
//           console.log("Foro no encontrado");
//         }
//       } catch (error) {
//         console.error('Error al obtener foro:', error);
//       }
//     };

//     fetchForo();
//   }, [id]);

//   const handleEnviarMensaje = async () => {
//     // Lógica para enviar mensajes a Firebase (por implementar)
//     console.log("Mensaje enviado:", mensaje);
//     setMensaje('');
//   };

//   if (!foro) return <p>Cargando foro...</p>;

//   return (
//     <div className="foro-detalle-container">
//       <h2>{foro.nombre}</h2>
//       <p><strong>Autor:</strong> {foro.nombreusuario}</p>
//       <p>{foro.descripcion}</p>

//       <div className="chat-container">
//         {mensajes.map((msg, index) => (
//           <div key={index} className="mensaje">
//             <strong>{msg.nombreusuario}:</strong> {msg.mensaje}
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           value={mensaje}
//           onChange={(e) => setMensaje(e.target.value)}
//           placeholder="Escribe un mensaje..."
//         />
//         <button onClick={handleEnviarMensaje}>Enviar</button>
//       </div>
//     </div>
//   );
// }


import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Importa tu configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';
import './ForoDetalle.css'

export default function ForoDetalle() {
  const { id } = useParams();
  const profileContext = useContext(UserContext);
  const { profile } = profileContext; // Obtenemos el perfil del usuario
  const [foro, setForo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const fetchForo = async () => {
      try {
        const foroRef = doc(db, 'foro', id);
        const foroSnap = await getDoc(foroRef);
        if (foroSnap.exists()) {
          const foroData = foroSnap.data();
          setForo(foroData);
          setMensajes(foroData.mensajes || []);
        } else {
          console.log("Foro no encontrado");
        }
      } catch (error) {
        console.error('Error al obtener foro:', error);
      }
    };

    fetchForo();
  }, [id]);

  const handleEnviarMensaje = async () => {
    if (!mensaje.trim()) return; // Evita enviar mensajes vacíos

    const nuevoMensaje = {
      fecha: Timestamp.now(),
      mensaje,
      nombreusuario: profile?.nombre || "Anónimo"
    };

    try {
      const foroRef = doc(db, 'foro', id);
      await updateDoc(foroRef, {
        mensajes: arrayUnion(nuevoMensaje) // Agrega el mensaje al array en Firebase
      });

      // Actualizar el estado local para que el mensaje aparezca sin recargar la página
      setMensajes(prevMensajes => [...prevMensajes, nuevoMensaje]);
      setMensaje(''); // Limpiar el input
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  if (!foro) return <p>Cargando foro...</p>;

  return (
    <div className="foro-detalle-container">
      <h2>{foro.nombre}</h2>
      <p><strong>Autor:</strong> {foro.nombreusuario}</p>
      <p>{foro.descripcion}</p>

      <div className="chat-container">
        {mensajes.map((msg, index) => (
          <div key={index} className="mensaje">
            <strong>{msg.nombreusuario}:</strong> {msg.mensaje}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleEnviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}

