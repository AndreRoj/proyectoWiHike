import React from 'react';
import { useState } from 'react'
import './App.css'
import {Navbar} from './components/Navbar'
import  {RutasPopulares}  from './components/RutasPopulares'
import  {Contacto}  from './components/Contacto'
import { HomePage } from './pages/HomePage';



function App() {

  return (
    <>
    <Navbar/>
    <HomePage frase='EXPLORA NUEVAS AVENTURAS EN LA NATURALEZA.'/> 
    <Contacto />
    </>
  )
}

export default App
