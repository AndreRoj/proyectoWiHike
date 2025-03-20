import React, { useEffect, useState } from 'react';
import Header from './Headeradmin';
import Sidebar from './Sidebar';
import UserRow from './Userrow';
import './Usuarioadmin.css';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const Usuario = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "solicitud"));
        const solicitudesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Solicitudes obtenidas:", solicitudesList);
        setSolicitudes(solicitudesList);
      } catch (error) {
        console.error("Error al obtener las solicitudes: ", error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleAprobar = async (solicitudId, uid) => {
    try {
      if (!uid) throw new Error("El ID de usuario es indefinido");

      console.log(`Intentando aprobar solicitud ${solicitudId} para usuario ${uid}`);

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error(`El usuario con ID ${uid} no existe en Firestore`);
      }

      await updateDoc(userRef, { guia: true });

      const solicitudRef = doc(db, "solicitud", solicitudId);
      await updateDoc(solicitudRef, {
        aprobado: true,
        desaprobado: false,
      });

      await deleteDoc(solicitudRef);

      alert("Solicitud aprobada y eliminada exitosamente!");

   
      setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== solicitudId));
    } catch (error) {
      console.error("Error al aprobar la solicitud: ", error);
      alert(error.message || "Hubo un error al aprobar la solicitud.");
    }
  };

  const handleDesaprobar = async (solicitudId, uid) => {
    try {
      if (!uid) throw new Error("El ID de usuario es indefinido");

      console.log(`Intentando desaprobar solicitud ${solicitudId} para usuario ${uid}`);

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error(`El usuario con ID ${uid} no existe en Firestore`);
      }

      await updateDoc(userRef, { guia: false });

      const solicitudRef = doc(db, "solicitud", solicitudId);
      await updateDoc(solicitudRef, {
        aprobado: false,
        desaprobado: true,
      });

      
      await deleteDoc(solicitudRef);

      alert("Solicitud desaprobada y eliminada exitosamente!");


      setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== solicitudId));
    } catch (error) {
      console.error("Error al desaprobar la solicitud: ", error);
      alert(error.message || "Hubo un error al desaprobar la solicitud.");
    }
  };

  return (
    <div className="usuarioadmin">
      <Header />
      <div className="usuario-content">
        <Sidebar />
        <main className="main-content">
          <h2 className="section-title">Solicitudes de Guías</h2>
          <div className="user-table">
            <div className="table-header">
            </div>
            {solicitudes.map((solicitud) => (
              <UserRow
                key={solicitud.id}
                fecha={solicitud.fecha ?? "No disponible"}
                mensaje={solicitud.mensaje ?? "Sin mensaje"}
                aprobado={solicitud.aprobado ?? false}
                desaprobado={solicitud.desaprobado ?? false}
                onAprobar={() => handleAprobar(solicitud.id, solicitud.uid)}
                onDesaprobar={() => handleDesaprobar(solicitud.id, solicitud.uid)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Usuario;



