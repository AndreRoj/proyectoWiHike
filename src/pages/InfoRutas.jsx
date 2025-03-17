import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfoRuta } from '../components/InfoRuta';
import { db } from '../firebase'; // Importa tu configuración de Firebase
import { doc, getDoc } from 'firebase/firestore';
import "./HomePage.css";

export default function InfoRutas() {
    const { rutaId } = useParams(); // Obtén el ID de la ruta desde la URL
    const [ruta, setRuta] = useState(null); // Estado para almacenar los datos de la ruta

    useEffect(() => {
        const fetchRuta = async () => {
            try {
                const rutaDocRef = doc(db, 'rutas', rutaId); // Referencia al documento de la ruta
                const rutaDoc = await getDoc(rutaDocRef);

                if (rutaDoc.exists()) {
                    setRuta(rutaDoc.data()); // Guarda los datos de la ruta en el estado
                } else {
                    console.log('No se encontró la ruta');
                }
            } catch (error) {
                console.error('Error al obtener la ruta:', error);
            }
        };

        fetchRuta();
    }, [rutaId]);

    if (!ruta) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className='HomePage'>

            <InfoRuta
                id = {ruta.id}
                nombre={ruta.nombre}
                estrellas={ruta.estrellas}
                imagen={ruta.imagen}
                imagen2={ruta.imagen2}
                imagen3={ruta.imagen3}
                descripcion={ruta.descripcion}
                distancia={ruta.distancia}
                desnivel_positivo={ruta.desnivel_positivo}
                duracion={ruta.duracion}
                kilometros={ruta.kilometros}
                dificultad={ruta.dificultad}
                paseo={ruta.paseo}
                acampada={ruta.acampada}
                URLmap={ruta.URLmap}
            />
        </div>
    );
}