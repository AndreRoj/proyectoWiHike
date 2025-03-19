import React, { useState } from 'react';
import Headeradmin from "./Headeradmin";
import Sidebar from "./Sidebar";
import  TabItems  from './TabNavigation';
import Verrutaitem from './Verrutaitem';
import Edititem from './Edititem';
import './Adminrutas.css';


const Adminrutas = () => {
   const [activeTab, setActiveTab] = useState("ver");
     const tabs1 = [
      { id: "ver", name: "Ver Rutas" },
      { id: "crear", name: "Crear Rutas" },
      { id: "editar", name: "Editar Rutas" },
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
            <TabItems activeTab={activeTab} onTabChange={setActiveTab}  tabs={tabs1}/>
            {activeTab === "ver" && (
              <div className='Adminrutas-ver'>
                <div className='ver-rutas-card'>
                  <div className='ver-rutas-label'>
                    <h3>Imagen</h3>
                  </div>
                  <div className='ver-rutas-label1'>
                    <h3>Nombre</h3>
                  </div>
                  <div className='ver-rutas-label2'>
                    <h3>Editar</h3>
                  </div>
                  <Verrutaitem
                    image="."
                    name="Ruta 1"
                    onEdit={() => console.log("Editar")}
                    onDelete={() => console.log("Eliminar")}
                  />
                  <Verrutaitem
                    image="."
                    name="Ruta 2"
                    onEdit={() => console.log("Editar")}
                    onDelete={() => console.log("Eliminar")}
                  />
                  <Verrutaitem
                    image="."
                    name="Ruta 3"
                    onEdit={() => console.log("Editar")}
                    onDelete={() => console.log("Eliminar")}
                    />
                </div>
              </div>
            )}
            {activeTab === "rutas" && (
              <div className='Adminrutas-crear'>
                <div className='Adminrutas-crear-container'>
                  <Edititem
                      label={"Imagen:"}
                    />
                    <Edititem
                      label={"Nombre:"}
                    />
                    <Edititem
                      label={"Descripción:"}
                    />
                    <Edititem
                      label={"Km:"}
                    />
                    <Edititem
                      label={"Tiempo:"}
                    />
                    <Edititem
                      label={"Fecha"}
                    />
                    <Edititem
                      label={"Limite de personas:"}
                    />
                    <Edititem
                      label={"Pto. de encuentro:"}
                    />
                </div>
                <div className='Adminrutas-finalizar-button'>
                  <button>
                    Finalizar
                  </button>
                </div>
              </div>
            )}
            {activeTab === "sobre" && ( 
              <div className='Adminrutas-editar'>
                 <div className='Adminrutas-editar-container'>
                  <Edititem
                      label={"Imagen:"}
                    />
                    <Edititem
                      label={"Nombre:"}
                    />
                    <Edititem
                      label={"Descripción:"}
                    />
                    <Edititem
                      label={"Km:"}
                    />
                    <Edititem
                      label={"Tiempo:"}
                    />
                    <Edititem
                      label={"Fecha"}
                    />
                    <Edititem
                      label={"Limite de personas:"}
                    />
                    <Edititem
                      label={"Pto. de encuentro:"}
                    />
                </div>
                <div className='Adminrutas-finalizar-button'>
                  <button>
                    Finalizar
                  </button>
                </div>
              </div>
            )}

            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Adminrutas;
