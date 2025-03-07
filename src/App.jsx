import React from 'react';
import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (

    <BrowserRouter>

    <Routes>
      <Route path='/' element = {<HomePage frase={'Hello'}/>} />
      <Route path='login' element = {<Login/>}/>
      <Route path='Register' element = {<Register/>}/>
      <Route path='*' element = {<NotFound/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
