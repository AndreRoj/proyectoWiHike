import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import Headeradmin from "./Headeradmin";
import Sidebar from "./Sidebar";
import TabItems from './TabNavigation';
import Verrutaitem from './Verrutaitem';
import Edititem from './Edititem';
import './Adminrutas.css';

const Adminrutas = () => {
  const [activeTab, setActiveTab] = useState("ver");
  const [rutas, setRutas] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [nuevaRuta, setNuevaRuta] = useState({
    urlMap: "",
    descripcion: "",
    desnivel_positivo: "",
    dificultad: "",
    duracion: "",
    imagen: "",
    imagen2: "",
    imagen3: "",
    kilometros: "",
    nombre: "",
    nombreguia: "", 
    senderismo: false,
    acampada: false,
    paseo: false,
  });
  const [errores, setErrores] = useState({
    desnivel_positivo: "",
    kilometros: "",
  });

  
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rutas"));
        const rutasList = [];
        querySnapshot.forEach((doc) => {
          rutasList.push({ id: doc.id, ...doc.data() });
        });
        setRutas(rutasList);
      } catch (error) {
        console.error("Error al obtener las rutas: ", error);
      }
    };

    fetchRutas();
  }, []);

  
  const handleDeleteRuta = async (id) => {
    try {
      await deleteDoc(doc(db, "rutas", id));
      alert("Ruta eliminada exitosamente!");
      setRutas(rutas.filter((ruta) => ruta.id !== id));
    } catch (error) {
      console.error("Error al eliminar la ruta: ", error);
      alert("Hubo un error al eliminar la ruta.");
    }
  };

  
  const handleEditRuta = (id) => {
    setRutaSeleccionada(id);
  };

  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "ver") {
      setRutaSeleccionada(null);
    }
  };


  const validarNumero = (valor) => {
    const regex = /^\d*\.?\d*$/;
    return regex.test(valor);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "desnivel_positivo" || name === "kilometros") {
      if (!validarNumero(value)) {
        setErrores({
          ...errores,
          [name]: "Por favor, ingresa solo números en este campo.",
        });
        return; 
      } else {
        setErrores({
          ...errores,
          [name]: "", 
        });
      }
    }

    
    setNuevaRuta({
      ...nuevaRuta,
      [name]: value,
    });
  };

  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNuevaRuta({
      ...nuevaRuta,
      [name]: checked,
    });
  };

  const guardarRuta = async () => {
    try {
    
      if (!validarNumero(nuevaRuta.desnivel_positivo) || !validarNumero(nuevaRuta.kilometros)) {
        alert("Por favor, corrige los errores en los campos numéricos.");
        return;
      }

      
      if (!nuevaRuta.nombre || !nuevaRuta.descripcion || !nuevaRuta.dificultad) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      
      const docRef = await addDoc(collection(db, "rutas"), nuevaRuta);

      
      setRutas([...rutas, { id: docRef.id, ...nuevaRuta }]);

      alert("Ruta creada exitosamente!");
      handleCancelar();
    } catch (error) {
      console.error("Error al crear la ruta: ", error);
      alert("Hubo un error al crear la ruta. Por favor, intenta nuevamente.");
    }
  };

  // esto cancela crear ruta
  const handleCancelar = () => {
    setActiveTab("ver");
    setNuevaRuta({ 
      urlMap: "",
      descripcion: "",
      desnivel_positivo: "",
      dificultad: "",
      duracion: "",
      imagen: "",
      imagen2: "",
      imagen3: "",
      kilometros: "",
      nombre: "",
      nombreguia: "", 
      senderismo: false,
      acampada: false,
      paseo: false,
    });
    setErrores({ 
      desnivel_positivo: "",
      kilometros: "",
    });
  };

  const tabs1 = [
    { id: "ver", name: "Ver Rutas" },
    { id: "crear", name: "Crear Rutas" },
  ];

  return (
    <div className='Adminrutas'>
      <div className='Adminrutas-contenedor'>
        <div className="Adminrutas-header">
          <Headeradmin />
          <div className="Adminrutas-sidebar">
            <Sidebar />
            <div className="Adminrutas-page-content">
              <h2>Rutas</h2>
              <div className='Adminrutas-tabnavigation'>
                <TabItems activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs1} />
                {activeTab === "ver" && (
                  rutaSeleccionada ? (
                    <div className='Adminrutas-editar'>
                      <div className='Adminrutas-editar-container'>
                        <Edititem label={"Imagen:"} />
                        <Edititem label={"Nombre:"} />
                        <Edititem label={"Descripción:"} />
                        <Edititem label={"Km:"} />
                        <Edititem label={"Tiempo:"} />
                        <Edititem label={"Fecha"} />
                        <Edititem label={"Limite de personas:"} />
                        <Edititem label={"Pto. de encuentro:"} />
                      </div>
                      <div className='Adminrutas-finalizar-button'>
                        <button onClick={() => setRutaSeleccionada(null)}>Cancelar</button>
                        <button>Guardar Cambios</button>
                      </div>
                    </div>
                  ) : (
                    <div className='Adminrutas-ver'>
                      <div className='ver-rutas-card'>
                        
                        {rutas.map((ruta) => (
                          <Verrutaitem
                            key={ruta.id}
                            image={ruta.imagen}
                            name={ruta.nombre}
                            onEdit={() => handleEditRuta(ruta.id)}
                            onDelete={() => handleDeleteRuta(ruta.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
                {activeTab === "crear" && (
                  <div className='Adminrutas-crear'>
                    <div className='Adminrutas-crear-container'>
                      <Edititem
                        label={"URL del Mapa:"}
                        name="urlMap"
                        value={nuevaRuta.urlMap}
                        onChange={handleInputChange}
                      />
                      <Edititem
                        label={"Descripción:"}
                        name="descripcion"
                        value={nuevaRuta.descripcion}
                        onChange={handleInputChange}
                      />
                      <Edititem
                        label={"Desnivel Positivo:"}
                        name="desnivel_positivo"
                        value={nuevaRuta.desnivel_positivo}
                        onChange={handleInputChange}
                      />
                      {errores.desnivel_positivo && (
                        <p className="error-message">{errores.desnivel_positivo}</p>
                      )}
                      <div className='Edititem-item'>
                        <h3>Dificultad:</h3>
                        <select
                          name="dificultad"
                          value={nuevaRuta.dificultad}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="fácil">Fácil</option>
                          <option value="intermedio">Intermedio</option>
                          <option value="difícil">Difícil</option>
                        </select>
                      </div>
                      <Edititem
                        label={"Duración:"}
                        name="duracion"
                        value={nuevaRuta.duracion}
                        onChange={handleInputChange}
                      />
                      <Edititem
                        label={"Imagen:"}
                        name="imagen"
                        value={nuevaRuta.imagen}
                        onChange={handleInputChange}
                      />
                      <Edititem
                        label={"Imagen 2:"}
                        name="imagen2"
                        value={nuevaRuta.imagen2}
                        onChange={handleInputChange}
                      />
                      <Edititem
                        label={"Imagen 3:"}
                        name="imagen3"
                        value={nuevaRuta.imagen3}
                        onChange={handleInputChange}
                      />
                      <Edititem
                        label={"Kilómetros:"}
                        name="kilometros"
                        value={nuevaRuta.kilometros}
                        onChange={handleInputChange}
                      />
                      {errores.kilometros && (
                        <p className="error-message">{errores.kilometros}</p>
                      )}
                      <Edititem
                        label={"Nombre:"}
                        name="nombre"
                        value={nuevaRuta.nombre}
                        onChange={handleInputChange}
                      />
                      <Edititem
                        label={"Nombre del Guía:"}
                        name="nombreguia"
                        value={nuevaRuta.nombreguia}
                        onChange={handleInputChange}
                      />
                      <div className='Edititem-item'>
                        <h3>Senderismo:</h3>
                        <input
                          type="checkbox"
                          name="senderismo"
                          checked={nuevaRuta.senderismo}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                      <div className='Edititem-item'>
                        <h3>Acampada:</h3>
                        <input
                          type="checkbox"
                          name="acampada"
                          checked={nuevaRuta.acampada}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                      <div className='Edititem-item'>
                        <h3>Paseo:</h3>
                        <input
                          type="checkbox"
                          name="paseo"
                          checked={nuevaRuta.paseo}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                    <div className='Adminrutas-finalizar-button'>
                      <button onClick={handleCancelar}>Cancelar</button>
                      <button onClick={guardarRuta}>Guardar Cambios</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminrutas;