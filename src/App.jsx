import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navbar} from './components/Navbar'
import  {RutasPopulares}  from './components/RutasPopulares'


function App() {

  return (
    <>

    <Navbar/>
    <RutasPopulares
        link="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTEwODkxMjUvMDc2YzFiN2QyM2IzZGRkZDhkNjk3YThmZGRhZTdlZWMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
        nombre="Sabas Nieves"
        nombreGuia="Jose Fernandez"
        duracion="1hora 30minutos"
        dificultad= "Alta"
    />
    

      <h2>Hi Bestieeeeeeeeeeee</h2>
      <h2>se logro</h2>
    </>
  )
}

export default App
