import React, { useEffect, useState, useContext } from 'react';
import { FaPaypal } from "react-icons/fa";
import './ReservaPago.css';
import { UserContext } from '../Context/UserContext';


function ReservaPago(id, guia, dia){

    const profileContext = React.useContext(UserContext);
    const { logged, profile } = profileContext;

    

    return (
        <div className="Reserva-ReservaPago">
            <div className="Reserva-Izquierda">
                <div className="Reserva-Datospersonales">
                    <span>Datos Personales</span>
                    <div className='Reserva-separador'></div> {/* Separador */}
                    <div className="Reserva-row1">
                        <span>Nombre Completo</span>
                        <span>Telefono</span>
                        <span>Correo</span>
                    </div>
                    <div className="Reserva-row2">
                        {/*recorrer lista user y extraer datos*/}
                    </div>
                </div>
                <div className="Reserva-Datosruta">
                    <span>Informacion del recorrido</span>
                    <div className='Reserva-separador'></div> {/* Separador */}
                    <div className="Reserva-row1">
                        <span>Ruta</span>
                        <span>Fecha</span>
                        <span>Hora</span>
                        <span>Duracion</span>
                    </div>
                    <div className="Reserva-row2">
                        {/*recorrer lista user y extraer datos*/}
                    </div>
                </div>
                <div className='Reserva-separador1'></div> {/* Separador */}
                <button className="Reserva-PagoPaypal">
                    <div className='Reserva-rectangulo'></div>
                    <div className='Reserva-icon'> <FaPaypal/></div>
                    <span>PayPal</span>
                </button>

              </div>
              <div className="Reserva-Derecha">
                <div className="Reserva-FinalizarPedido">
                        <button className="Reserva-reserva">Finalizar Pedido</button>
                </div>
                <div className='Reserva-separador'></div> {/* Separador */}
                <div className="Reserva-columna1">
                    <span>Precio:</span>
                    {/*....*/}
                </div>
                <div className="Reserva-columna2">
                    <span>Impuestos + IVA:</span>
                    {/*....*/}
                </div>
                <div className='Reserva-separador'></div> {/* Separador */}
                <div className="Reserva-columna3">
                    <span>Total a pagar:</span>
                    {/*....*/}
                </div>
             </div>
           </div>
    )
}
    export default ReservaPago;
