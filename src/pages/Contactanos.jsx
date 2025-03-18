import"./Contactanos.css";
import React from 'react'
import { useState } from "react";
import { AiOutlineMail } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter } from 'react-icons/fa'

function Contactanos() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
        console.log('Formulario enviado:', formData);
      };
     return(
      <div className="Contactanostodo">
      
        <div className="Contactanos-contactanos">
           <h1>Contáctanos</h1>
              <div className='Contactanos-separador'></div> {/* Separador */}
              { /* Contact Form Section */}
        <div className="Contactanos-Contenedor">
            <div className="Contactanos-ContactForm">
              <h2>Enviános un mensaje</h2>
              <form onSubmit={handleSubmit}>
                <div className="Contactanos-Primerafila">
                  <div >
                      <label htmlFor="name">Nombre:</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        />
                  </div> 
                  <div>
                      <label htmlFor="email">Correo:</label>
                      <input 
                        type="email"
                        id="email" 
                        name="email"
                          value={formData.email} 
                          onChange={handleChange}
                        />
                  </div>
                </div> 
                <div>
                      <label htmlFor="message">Mensaje:</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange}>
                        </textarea>
                  </div>
                  <button type="submit">Enviar</button>
                </form>
              </div>
              { /* Contact Info Section */}
              <div className="Contactanos-Contactinfo">
                    <div className="Contactanos-Button"> 
                    <button>
                        <FaPhoneAlt />
                        +58 424-1392205
                    </button>
                    <button> 
                        <AiOutlineMail />
                        wehike@avila.com
                    </button>
                    </div>
                  <div className="Contactanos-Icon">
                  <button>
                        <FaFacebook />
                    </button>
                    <button >
                        <FaInstagram />
                    </button>
                    <button >
                        <FaTwitter />
                    </button>
                  </div>
              </div>
            </div>
          </div>
          </div>
     );
    }
    export default Contactanos;