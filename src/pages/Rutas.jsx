import React from "react";
import { Contacto } from '../components/Contacto';
import { Navbar } from '../components/Navbar';
import "./Rutas.css";

export default function Rutas() {
    return (
        <div className="Rutas">
            <Navbar/>



            <Contacto/>
        </div>
        
    );
}