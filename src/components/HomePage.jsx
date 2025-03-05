import React from 'react';
import { RutasPopulares } from '../RutasPopulares';
const HomePage = ({frase}) => {
  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url(https://intothewild.bg/wp-content/uploads/2022/11/bona-lee-BIvkvLqOVEI-unsplash.jpg)" }}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-5xl text-white font-bold">{frase}</h1>
        </div>
        
      </div>
      
      <article className='h-35 text-6xl text-center text-[#1D8F41] bg-[#EBF4E8] font-rem py-10'>Ruta</article>
    
      <div class="flex items-stretch">
        {/* ruta1 */}
        <div><RutasPopulares
        link="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTEwODkxMjUvMDc2YzFiN2QyM2IzZGRkZDhkNjk3YThmZGRhZTdlZWMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
        nombre="Sabas Nieves"
        nombreGuia="Jose Fernandez"
        duracion="1hora 30minutos"
        dificultad= "Alta"
        /></div>
        {/* ruta2 */}
        <div><RutasPopulares
        link="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvODk5MTU2NzkvMTk2MDc4YjFhOTJhNDcwNDY1M2I5ZWI5NzgzN2EzN2YuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0="
        nombre="Pico Naiguata"
        nombreGuia="Carlos Sandoval"
        duracion="9hora 21minutos"
        dificultad= "Alta"
        /></div>
        {/* ruta3 */}
        <div><RutasPopulares
        link="https://caracashermosadotcom.wordpress.com/wp-content/uploads/2016/05/hotel-humboldt-caracas.jpg"
        nombre="Humboltd"
        nombreGuia="Jose Fernandez"
        duracion="5hora 30minutos"
        dificultad= "Alta"
        /></div>
      </div>

    </div>
    
  );
};

export default HomePage;
