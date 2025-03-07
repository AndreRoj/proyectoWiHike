import React from 'react';
import "./HomePage.css";
import { RutasPopulares } from '../components/RutasPopulares';
import { Contacto } from '../components/Contacto';

export function HomePage({ frase }) {
    return (
        <div> 
          <div className='pagina'>

            <div className="title-container">

              <h1 className='titulo' >EXPLORA NUEVAS AVENTURAS</h1>
              <h1 className='titulo' >EN LA NATURALEZA.</h1>

            </div>


            <div className="rutas-section">
               <h3 className="rutas-title">RUTAS</h3>
            </div>


          <div className='rutas'>
            <RutasPopulares
                link="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTEwODkxMjUvMDc2YzFiN2QyM2IzZGRkZDhkNjk3YThmZGRhZTdlZWMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWc6eyJ0cmVsbGlzUXVhbXRpc2F0aW9uIjp0cnVlLCJvdmVyc2hvb3REZXJpbmdpbmciOnRydWUsIm9wdGltaXplU2NhbnMiOnRydWUsInF1YW50aXNhdGlvblRhYmxlIjozfX19"
                nombre="Sabas Nieves"
                nombreGuia="Jose Fernandez"
                duracion="1hora 30minutos"
                dificultad="Alta"
            />

            <RutasPopulares
                link="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvODk5MTU2NzkvMTk2MDc4YjFhOTJhNDcwNDY1M2I5ZWI5NzgzN2EzN2YuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0="
                nombre="Pico Naiguata"
                nombreGuia="Carlos Sandoval"
                duracion="9hora 21minutos"
                dificultad="Alta"
            />

            <RutasPopulares
                link="https://caracashermosadotcom.wordpress.com/wp-content/uploads/2016/05/hotel-humboldt-caracas.jpg"
                nombre="Humboltd"
                nombreGuia="Jose Fernandez"
                duracion="5hora 30minutos"
                dificultad="Alta"
            />
            </div>
            </div>
        </div>
    );
}