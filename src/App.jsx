import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Rutas from './pages/Rutas';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';

function App() {

  return (

    <BrowserRouter>

    <Routes>


      <Route element = {<Navbar/>}>

        <Route path='/' element = {<HomePage frase={'Hello'}/>} />
        <Route path='login' element = {<Login/>}/>
        <Route path='register' element = {<Register/>}/>
        <Route path='*' element = {<NotFound/>}/>
        <Route path='rutas' element = {<Rutas/>} />
        
      </Route>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
