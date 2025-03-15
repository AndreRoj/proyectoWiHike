import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Rutas from './pages/Rutas';
import Contactanos from './pages/Contactanos'; 
import Perfil from './pages/Perfil';
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

        <Route path='/' element = {<HomePage frase={'Hello'}/>} />
        <Route path='login' element = {<Login/>}/>
        <Route path='register' element = {<Register/>}/>
        <Route path='*' element = {<NotFound/>}/>
        <Route path='rutas' element = {<Rutas/>} />
        <Route path='contactanos' element = {<Contactanos/>} />
        <Route path='perfil' element = {<Perfil/>} />


        
      </Route>

    </Routes>
    </UserProvider>
  
    
    </BrowserRouter>
  );
}

export default App
