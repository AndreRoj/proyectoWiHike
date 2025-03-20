import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/UserContext.jsx'

import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <UserProvider>
//     <App />
//     </UserProvider>
//   </StrictMode>,
// )

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("Service Worker registrado:", reg))
      .catch(err => console.log("Error en el registro del Service Worker:", err));
  });
}
