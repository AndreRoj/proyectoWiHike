import "./Contactanos.css";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter } from "react-icons/fa";

function Contactanos() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);

    // Limpia los campos después de enviar
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Muestra el mensaje de éxito
    setSuccessMessage(true);

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="Contactanos-container">
      <div className="Contactanos-content">
        <div className="tc">Contáctanos</div>
        <div className="Contactanos-separador"></div>

        {/* Mensaje de éxito */}
        {successMessage && <div className="success-message">Enviado exitosamente ✔</div>}

        {/* Sección del formulario */}
        <div className="Contactanos-Contenedor">
          <div className="Contacmetrica">
            <div className="tc2">Envíanos un mensaje</div>
            <form onSubmit={handleSubmit}>
              <div className="PrimeraFila1">
                <div className="pf">
                  <span className="nomb" htmlFor="name">
                    Nombre:{" "}
                  </span>
                  <input
                    className="ContImp"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="pf">
                  <span className="nomb" htmlFor="email">
                    Correo:{" "}
                  </span>
                  <input
                    className="ContImp"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="PrimeraFila1">
                <div className="pf">
                  <span className="nomb" htmlFor="message">
                    Mensaje:
                  </span>
                  <textarea
                    className="ContImp2"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="ContactanosbuttonP">
                Enviar
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="Contacmetrica" style={{ alignItems: "center" }}>
            <div className="PrimeraFila1">
              <button className="ContactanosbuttonP">
                <FaPhoneAlt />
                +58 424-1392205
              </button>
            </div>
            <div className="PrimeraFila1">
              <button className="ContactanosbuttonP">
                <AiOutlineMail />
                wehike@avila.com
              </button>
            </div>
            <div className="PrimeraFila1">
              <button className="ContactanosbuttonP">
                <FaFacebook />
              </button>
              <button className="ContactanosbuttonP">
                <FaInstagram />
              </button>
              <button className="ContactanosbuttonP">
                <FaTwitter />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactanos;