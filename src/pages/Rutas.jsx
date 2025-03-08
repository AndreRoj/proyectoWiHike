import React from "react";
import { Contacto } from '../components/Contacto';
import { Navbar } from '../components/Navbar';
import {Ruta} from '../components/Ruta';
import "./Rutas.css";

export default function Rutas() {
    return (
        <div className="listadorutas">
            <Navbar/>

            <div className="ll">

            <Ruta/>
            <Ruta/>
            <Ruta/>
            <Ruta/>
            <Ruta/>
            <Ruta/>

            </div>

            <Contacto/>
        </div>
        
    );
}