import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { TabItems } from "../../components/TabItems/TabItems";
import "./Foro.css";

export const Foro = () => {
  const [activeTab, setActiveTab] = useState("banner");

  return (
    <div className="PaginaPrincipal1">
      <div className="PaginaPrincipal1-contenedor">
        <div className="PaginaPrincipal1-Header">
          <Header />

          <div className="main-content">
            <Navigation />

            <main className="page-content">
              <h2 className="page-title">Página principal</h2>

              <div className="tabs-container">
                <TabItems activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === "banner" && (
                  <div className="tab-content">
                    <div className="banner-card">
                      <div className="image-column">
                        <h3 className="column-title">Imágen</h3>
                      </div>

                      <div className="content-column">
                        <div className="image-section">
                          <img
                            className="banner-image"
                            alt="Mountain landscape"
                            src="https://c.animaapp.com/fwMzPqWv/img/bona-lee-bivkvlqovei-unsplash-1@2x.png"
                          />
                        </div>

                        <div className="text-section">
                          <p className="banner-text">
                            EXPLORA NUEVAS AVENTURAS
                            <br />
                            EN LA NATURALEZA
                          </p>
                        </div>
                      </div>

                      <div className="actions-column">
                        <div className="action-section">
                          <button className="action-button">
                            <img src="/edit-icon.svg" alt="Edit" />
                          </button>
                          <span className="action-label">Editar</span>
                        </div>

                        <div className="action-section">
                          <button className="action-button">
                            <img src="/delete-icon.svg" alt="Delete" />
                          </button>
                          <span className="action-label">Borrar</span>
                        </div>
                      </div>

                      <div className="text-label">
                        <h3 className="column-title">Texto</h3>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "rutas" && (
                  <div className="tab-content">
                    {/* Content for Rutas populares tab */}
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
};
{/*.foro {
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.foro-container {
  width: 100%;
  max-width: 1440px;
}

.foro-content {
  position: relative;
  min-height: 100vh;
  background-color: white;
}

.main-content {
  display: flex;
}

.page-content {
  flex: 1;
}

.page-title {
  padding: 24px;
  font-family: 'Raleway', Helvetica;
  font-weight: 700;
  font-size: 24px;
}

.tabs-container {
  width: 100%;
}

.tab-content {
  margin-top: 24px;
  padding: 0 24px;
}

.banner-card {
  width: 951px;
  height: 724px;
  background-color: #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.image-column, .content-column, .actions-column {
  border-right: 1px solid #e0e0e0;
}

.column-title {
  font-family: 'Raleway', Helvetica;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
}

.image-column, .actions-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-column {
  display: flex;
  flex-direction: column;
}

.image-section, .text-section {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.image-section {
  border-bottom: 1px solid #e0e0e0;
}

.banner-image {
  width: 307px;
  height: 224px;
  object-fit: cover;
}

.banner-text {
  font-family: 'Paytone One', Helvetica;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
}

.action-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
}

.action-label {
  font-family: 'Raleway', Helvetica;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
}

.text-label {
  position: absolute;
  top: 502px;
  left: 29px;
}

  */}