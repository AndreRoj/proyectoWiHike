import React, { useState } from 'react';
import "./PagPrincipal.css";
import Header from "./Headeradmin";
import Sidebar from "./Sidebar";
import  TabItems  from './TabNavigation';
import { FiEdit} from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import Routeitem from './Routeitem';



function PagPrincipal() {
   const [activeTab, setActiveTab] = useState("banner");
  return (
    <div className="PaginaPrincipal1">
      <div className="PaginaPrincipal1-contenedor">
        <div className="PaginaPrincipal1-header"> 
          <Header />
        <div className="PaginaPrincipal1-sidebar">
          <Sidebar />
          <main className="PaginaPrincipal1-page-content">
            <h2 className="PaginaPrincipal1-page-title">Página principal</h2>
            <div className="PaginaPrincipal1-tabnavigation">
              <TabItems activeTab={activeTab} onTabChange={setActiveTab} />
              {activeTab === "banner" && (
                  <div className="BannerPrincipal-content">
                    <div className="Banner-card">
                      <div className="column-image">
                        <h3>Imagen</h3>
                      </div>
                        {/*Contenido para la imagen*/}
                        <div className="section-image">
                          <div className='inside-section-image'>
                          {/*Dejar que el usuario suba la imagen*/}
                          </div>
                        </div>
                       
                        <div className="action-row">
                          <div className="action-section">
                            <button>
                              <FiEdit />
                            </button>
                            <span>Editar</span>
                          </div>
                          <div className="action-section">
                            <button>
                              <FaTrash />
                            </button>
                            <span>Eliminar</span>
                          </div>
                        </div>
                      <div className="column-text">
                        <h3>Texto</h3>
                      </div>
                      <div className="text-section">
                        <div className='inside-text-section'>
                         {/*Contenido para el texto*--- Deberia ser un input*/}
                         </div>
                      </div>
                      <div className="action-row">
                          <div className="action-section">
                            <button>
                              <FiEdit />
                            </button>
                            <span>Editar</span>
                          </div>
                          <div className="action-section">
                            <button>
                              <FaTrash />
                            </button>
                            <span>Eliminar</span>
                          </div>
                        </div>

                    </div>
                  </div>
                )}
                {activeTab === "rutas" && (
                  <div className="PaginaPrincipal2">
                    <div className='PaginaPrincipal2-container'>
                      <Routeitem 
                        key={1}
                        name={"Ruta 1"}
                      />
                      <Routeitem 
                        key={2}
                        name={"Ruta 2"}
                      /><Routeitem 
                      key={3}
                      name={"Ruta 3"}
                      />
                      <Routeitem 
                      key={4}
                      name={"Ruta 4"}
                    />
                    </div>
                  </div>
                )}
                {activeTab === "sobre" && (
                  <div className="tab-content">
                    {/* Content for Sobre wehike tab */}
                  </div>
                )}


            </div>

          </main>
        </div>
        </div>
      </div>
    </div>
  );
}

export default PagPrincipal;
