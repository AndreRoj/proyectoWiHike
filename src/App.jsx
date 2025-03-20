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
import Adminrutas from './admin/Adminrutas';
import Usuarioadmin from './admin/Usuarioadmin'
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import  PagoExitoso  from './pages/PagoExitoso';
import Buscador from './pages/Buscador';
import { UserProvider } from './Context/UserContext';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa los estilos de AOS
import  { useEffect } from 'react';


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
        <Route path="/reserva/:id" element={<ReservaPago />} />
        <Route path="exitosa" element={<PagoExitoso/>} />
        <Route path='busqueda' element={<Buscador/>} />
      
      </Route>
 
      <Route >
          <Route path="/adminrutas" element={<Adminrutas/>}  />
          <Route path="/usuarios" element={<Usuarioadmin/>} />
          <Route path='*' element = {<NotFound/>}/>
      

      </Route>

    </Routes>

    </UserProvider>

  </BrowserRouter>
  )
}

export default App
