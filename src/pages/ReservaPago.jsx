import React, { useEffect, useState, useContext } from 'react';
import { FaPaypal } from "react-icons/fa";
import './ReservaPago.css';
import { UserContext } from '../Context/UserContext';


function ReservaPago(id, guia, dia){

    const profileContext = React.useContext(UserContext);
    const { logged, profile } = profileContext;

    

    return (
        <div className="ReservaPago">
            <div className="Izquierda">
                <div className="Datospersonales">
                    <span>Datos Personales</span>
                    <div className='separador'></div> {/* Separador */}
                    <div className="row1">
                        <span>Nombre Completo</span>
                        <span>Telefono</span>
                        <span>Correo</span>
                    </div>
                    <div className="row2">
                        {/*recorrer lista user y extraer datos*/}
                    </div>
                </div>
                <div className="Datosruta">
                    <span>Informacion del recorrido</span>
                    <div className='separador'></div> {/* Separador */}
                    <div className="row1">
                        <span>Ruta</span>
                        <span>Fecha</span>
                        <span>Hora</span>
                        <span>Duracion</span>
                    </div>
                    <div className="row2">
                        {/*recorrer lista user y extraer datos*/}
                    </div>
                </div>
                <div className='separador1'></div> {/* Separador */}
                <button className="PagoPaypal">
                    <div className='rectangulo'></div>
                    <div className='icon'> <FaPaypal/></div>
                    <span>PayPal</span>
                </button>

              </div>
              <div className="Derecha">
                <div className="FinalizarPedido">
                        <button className="reserva">Finalizar Pedido</button>
                </div>
                <div className='separador'></div> {/* Separador */}
                <div className="columna1">
                    <span>Precio:</span>
                    {/*....*/}
                </div>
                <div className="columna2">
                    <span>Impuestos + IVA:</span>
                    {/*....*/}
                </div>
                <div className='separador'></div> {/* Separador */}
                <div className="columna3">
                    <span>Total a pagar:</span>
                    {/*....*/}
                </div>
             </div>
           </div>
    )
}
    export default ReservaPago;
