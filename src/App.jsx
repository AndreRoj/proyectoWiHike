import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { RutasPopulares } from './RutasPopulares'
import HomePage from './components/HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HomePage
      frase='EXPLORA NUEVAS AVENTURAS EN LA NATURALEZA.'
      />
     
    </>
  )
}

export default App
