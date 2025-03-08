import React from 'react';
import { useState } from 'react'
import './App.css'
import {Navbar} from './components/Navbar'
import  {RutasPopulares}  from './components/RutasPopulares'
import  {Contacto}  from './components/Contacto'
import HomePage from './pages/HomePage';
import Rutas from './pages/Rutas';
import { BrowserRouter, Routes, Route } from 'react-router';




function App() {

  return (

    <BrowserRouter>

    <Routes>
      <Route path='/' element = {<HomePage frase={'Hello'}/>} />
      

      <Route path='rutas' element = {<Rutas/>} />


    </Routes>
    
    </BrowserRouter>

  
  )
}

export default App
