import React from 'react';
import "./HomePage.css";
import { RutasPopulares } from '../components/RutasPopulares';
import { Contacto } from '../components/Contacto';
import { MisionVision } from '../components/MisionVision';
import { Navbar } from '../components/Navbar';
import  {Ruta}  from '../components/Ruta';


export default function HomePage({ frase }) {
    return (
        <div className='HomePage'> 
        <Navbar/>
          <div className='pagina'>

            <div className="title-container">

              <h1 className='titulo1' >EXPLORA NUEVAS AVENTURAS</h1>
              <h1 className='titulo2' >EN LA NATURALEZA.</h1>

            </div>


            <div className="rutas-section">
               <h3 className="rutas-title">RUTAS</h3>
            </div>


          <div className='rutas'>
            <RutasPopulares
                link="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTIzNjEwNTMvZGQ1M2RmMDM2N2RmYjJlZTgxOTdmNWQwZmRhZTBiYjAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
                nombre="Sabas Nieves"
                nombreGuia="Jose Fernandez"
                duracion="1hora 30minutos"
                dificultad="Alta"
            />

            <RutasPopulares
                link="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvODk5MTU2ODAvZDRlYjUyZjU5NTg1YWI4OTQxZWFhNmI1NDkxODM2OTMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
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

            <div className="sobrewehike">
               <h3 className="wehike">SOBRE WEHIKE</h3>
            </div>
            <MisionVision/>
            <Contacto/>

            <Ruta
            imagen= 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcYT1YiGz88bsI5D1hh_KazCEBb9LEfIsxrly2FaXHD67uyWkSdQC52-58NmqoGStOAxXXZL61vpKo3ZX9GIpB7kBbm_fMSRmBInH3AAkrxOzLF7sVfv290Np35EjabjDvBfGR43vMQ7w/s1600/IMG_3310.JPG'
            nombre = 'Sabas Nieves'
            descripcion= 'Ruta de ida y vuelta cerca de Municipio Sucre, Miranda. Se considera una ruta moderada. Es una región muy popular para el senderismo y pasear. por lo que es probable encontrarse con otras personas mientras se está por la zona. '
            nombreguia= 'Jose Fernandes'
            duracion= '1h 35m'
            kilometros= '3.9'
            estrellas = '4.9'
            />

            </div>
        </div>
    );
}