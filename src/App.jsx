import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Rutas from './pages/Rutas';
import Perfil from './pages/Perfil';
import Guia from './pages/Guia';
import InfoRutas from './pages/InfoRutas';
import Contactanos from './pages/Contactanos'; 
import ReservaPago from './pages/ReservaPago';
import PagPrincipal from './admin/PagPrincipal';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import { UserProvider } from './Context/UserContext';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa los estilos de AOS
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      once: true, // Si la animación solo se ejecuta una vez
    });
  }, []);


  return (

    <BrowserRouter>

    <UserProvider>

    <Routes>
    
      <Route element = {<Navbar/>}>

        <Route path='/' element = {<HomePage/>} />
        <Route path='login' element = {<Login/>}/>
        <Route path='register' element = {<Register/>}/>
        <Route path='*' element = {<NotFound/>}/>
        <Route path='rutas' element = {<Rutas/>} />
        <Route path='perfil' element = {<Perfil/>} />
        <Route path='guia' element = {<Guia/>} />
        <Route path="/info_rutas/:rutaId" element={<InfoRutas />} /> {/* Ruta dinámica */}
        <Route path='contactanos' element = {<Contactanos/>} />
        <Route path='reserva' element = {<ReservaPago/>} />
      
      </Route>

      <Route >
        <Route path='*' element = {<NotFound/>}/>
        <Route path='admin' element={<PagPrincipal/>} />
      

      </Route>

    </Routes>

    </UserProvider>

  </BrowserRouter>
  )
}

export default App;