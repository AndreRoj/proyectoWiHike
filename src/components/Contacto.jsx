import React from "react";
import logo from '../assets/Logo.png'
import "../styles/Contacto.css";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai'


export function Contacto() {
    return (
        <div className="contacto-container">
        <div className="contacto-content">
          <div className="columna"> 
          <h2 className="contactanos"  >CONTÁCTANOS</h2>

          <div className="seguido">
          <img src={logo} alt="WeHike Logo" className="contacto-logo" />

          <div className="flex-1">
          
          <p className="info">
            <FaPhoneAlt  />   +58 0424-1392205
          </p>
          <p className="info">
            <FaEnvelope  /> wehike@avila.com
          </p>
          <p className="info">
            <FaInstagram /> @WeHike
          </p>
          <p className="info">
            <FaTwitter /> @WeKike
          </p>
          <p className="info">
            <FaFacebookF  /> @WeHike
          </p>
          </div>
          </div>
        </div>
      </div>
    </div>
    );
  }