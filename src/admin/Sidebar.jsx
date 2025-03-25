// import React from 'react';
// import { Link } from 'react-router-dom';
// import "./Sidebar.css"; 



// const handleLogout = async () => {
//     try {
//       await signOut(auth); // Cierra la sesión del usuario
//       console.log("Usuario cerró sesión");
//       navigate('/'); // Redirige a la página principal
//     } catch (error) {
      
//       console.error("Error al cerrar sesión:", error);
//     }
//   };

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <ul className="sidebar-list">
//         <li className="sidebar-item">
//         </li>
//         <li className="sidebar-item">
//           <Link to="/adminrutas" className="sidebar-link">
//             Rutas
//           </Link>
//         </li>
//         <li className="sidebar-item">
//           <Link to="/usuarios" className="sidebar-link">
//             Solicitudes
//           </Link>
//         </li>
//         <li className="options" onClick={handleLogout} style={{ color: 'red' }}>Salir</li>
  
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Asegúrate de que esta ruta sea correcta
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
      console.log("Usuario cerró sesión");
      navigate('/'); // Redirige a la página principal
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/adminrutas" className="sidebar-link">
            Rutas
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/usuarios" className="sidebar-link">
            Solicitudes
          </Link>
        </li>
        <li 
          className="sidebar-itemm" 
          onClick={handleLogout}
          style={{ 
            color: 'red',
            cursor: 'pointer',
            padding: '10px 15px' // Añade el mismo padding que tus otros items
          }}
        >
          Salirr
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;