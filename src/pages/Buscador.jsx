import React, { useEffect, useState } from 'react';
import { IoSearch, IoClose } from "react-icons/io5";
import { Contacto } from '../components/Contacto';
import { Navbar } from '../components/Navbar';
import { Ruta } from '../components/Ruta'; 
import "./Buscador.css";
import { db } from '../firebase'; 
import { getDocs, collection } from "firebase/firestore";


export default function Buscador () {
  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [search, setSearch] = useState("");
  const [filteredRutas, setFilteredRutas] = useState([]); 
  const [filtroTipo, setFiltroTipo] = useState([]);

  // Función para obtener rutas de Firestore
  const fetchRutas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "rutas"));
      const rutasList = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(), 
      }));
      setRutas(rutasList); 
      setFilteredRutas(rutasList);
    } catch (error) {
      console.error("Error fetching documents: ", error);
      setError("Error al cargar las rutas"); 
    } finally {
      setLoading(false); 
    }
  };


  const handleSearch = () => {
    const searchTerm = search.toLowerCase();
    const filtered = rutas.filter((ruta) => {
      const coincideNombre = ruta.nombre.toLowerCase().includes(searchTerm);
      const coincideGuia = ruta.nombreguia.toLowerCase().includes(searchTerm);

      let coincideTipo = true;
      if (filtroTipo === 'paseo') {
        coincideTipo = ruta.paseo === true;
      } else if (filtroTipo === 'senderismo') {
        coincideTipo = ruta.senderismo === true; 
      } else if (filtroTipo === 'acampada') {
        coincideTipo = ruta.acampada === true; 
      }

      return (coincideNombre || coincideGuia) && coincideTipo;
    });
    setFilteredRutas(filtered); 
  };

    const handleKeyDown = (e) => { //esta es para que busque con enter, cuando se presione enter llama a handleSearch
      if (e.key === 'Enter') {
        handleSearch();
      }
    }

    const handleClear = () =>{ //esta es para limpiar search bar con el boton
      setSearch('');
      setFiltroTipo('');
      setFilteredRutas(rutas);
    }

  
  useEffect(() => {
    fetchRutas();
  }, []); 

 
  if (loading) {
    return <div>Cargando rutas...</div>;
  }

  // Muestra un mensaje de error si algo falla
  if (error) {
    return <div>{error}</div>;
  }




  return (
    <div className="listadorutas" >
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange= {(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {search && (
          <button className="clear-button" onClick={handleClear}>
            <IoClose size={20}/>
          </button>
        )}
        <button className="search-button" onClick={handleSearch}>
          <IoSearch size={24} />
        </button>
      </div>
      
      {/* filtro de excursiones*/}
      <div className="filtros">
        <button
          className={filtroTipo === '' ? 'filtro-activo' : ''}
          onClick={() => {setFiltroTipo('')
          handleSearch();
          }}
        >
          Todos
        </button>
        <button
          className={filtroTipo === 'paseo' ? 'filtro-activo' : ''}
          onClick={() => { 
            setFiltroTipo('paseo')
            handleSearch()
          }}

        >
          Paseo
        </button>
        <button
          className={filtroTipo === 'senderismo' ? 'filtro-activo' : ''}
          onClick={() => { 
            setFiltroTipo('senderismo')
            handleSearch()
          }}
        >
          Senderismo
        </button>
        <button
          className={filtroTipo === 'acampada' ? 'filtro-activo' : ''}
          onClick={() => { 
            setFiltroTipo('acampada')
            handleSearch()
          }}
        >
          Acampada
        </button>
      </div>
      

      <div className="ll">
        {/* Mapea las rutas y crea un componente Ruta por cada una */}
        {filteredRutas.map((ruta) => (
          <Ruta
            key={ruta.id}
            id={ruta.id} 
            imagen={ruta.imagen} 
            nombre={ruta.nombre} 
            descripcion={ruta.descripcion} 
            nombreguia={ruta.nombreguia} 
            duracion={ruta.duracion} 
            kilometros={ruta.kilometros} 
            estrellas={ruta.estrellas} 
          />
        ))}
      </div>
      <Contacto />
    </div>
  );
}
