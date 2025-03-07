import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navbar} from './components/Navbar'
import  {RutasPopulares}  from './components/RutasPopulares'
import  {Contacto}  from './components/Contacto'



function App() {

  return (
    <>


    <HomePage
      frase='EXPLORA NUEVAS AVENTURAS EN LA NATURALEZA.'
      />
     

    </>
  )
}

export default App
