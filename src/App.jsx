import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Rutas from './pages/Rutas';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {

  return (

    <BrowserRouter>

    <Routes>
      <Route path='/' element = {<HomePage frase={'Hello'}/>} />
      <Route path='login' element = {<Login/>}/>
      <Route path='register' element = {<Register/>}/>
      <Route path='*' element = {<NotFound/>}/>
      <Route path='rutas' element = {<Rutas/>} />


    </Routes>
    
    </BrowserRouter>
  )
}

export default App
