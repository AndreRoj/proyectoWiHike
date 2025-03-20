import { useState } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from "react-router";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const adminEmail = 'admin@correo.unimet.edu.ve'

export default function Login() {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.user.uid);
      console.log(user.user.email);

      console.log(user.email, adminEmail)
      if (user.user.email === adminEmail) {
        navigation('/adminrutas');
      } else {
        navigation('/');
      }
    } catch (error) {
      setError("Correo o contraseña incorrectos");
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Inicia sesión con Google
      const user = result.user;

      console.log("Usuario logueado con Google:", user.uid);
      console.log("Correo del usuario:", user.email);
      console.log(user.email, adminEmail)
      if (user.user.email === adminEmail) {
        navigation('/adminrutas');
      } else {
        navigation('/');
      }
      
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError("Ocurrió un error al iniciar sesión con Google");
    }
  };

  return (
    <div className="login-container" data-aos="slide-up">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="tituloLogin">Bienvenido de vuelta</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit" className="login-button">Iniciar sesión</button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-register-button"
        >
          <img
            src="https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj"
            alt="Google Logo"
            className="google-logo"
          />
          Iniciar sesión con Google
        </button>
        <p className="signup-link">¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      </form>
    </div>
  );
}