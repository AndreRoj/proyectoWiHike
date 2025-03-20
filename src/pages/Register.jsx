import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Register.css'; 
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; 
import DatePicker from 'react-datepicker';
import { setDoc, doc } from "firebase/firestore";
import 'react-datepicker/dist/react-datepicker.css'; 
import './DatePicker.css'; 

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Register() {
    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [cedula, setCedula] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [birthDate, setBirthDate] = useState(null); 
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validación del dominio del correo
        if (!email.endsWith('@correo.unimet.edu.ve')) {
            setError('Solo se permiten correos con el dominio @correo.unimet.edu.ve');
            return;
        }

        try {
            setLoading(true);
            const usuarioRegistrado = await createUserWithEmailAndPassword(auth, email, password);

            console.log("Usuario registrado: ", usuarioRegistrado.user.uid);

            
            const userData = {
                uid: usuarioRegistrado.user.uid, 
                nombre: name,
                apellido: lastName,
                email: email,
                cedula: cedula,
                telefono: phone,
                fechaNacimiento: birthDate,
                fechaRegistro: new Date(), 
            };

          
            await setDoc(doc(db, "users", usuarioRegistrado.user.uid), userData);

            console.log("Usuario guardado en Firestore");

          
            setEmail("");
            setPassword("");
            setName("");
            setLastName("");
            setCedula("");
            setPhone("");
            setBirthDate(null);

            
            navigation('/');
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                setError('El correo ya está en uso');
            } else {
                setError('Ocurrió un error al registrarse');
            }
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            if (!user.email.endsWith('@correo.unimet.edu.ve')) {
                console.error('Correo no válido');
                throw new Error('Correo no válido');
            }
    
            const userData = {
                uid: user.uid,
                nombre: user.displayName?.split(' ')[0] || '',
                apellido: user.displayName?.split(' ')[1] || '',
                email: user.email,
                fechaRegistro: new Date(),
            };
    
            // Guardar los datos en Firestore usando el UID del usuario como ID del documento
            await setDoc(doc(db, 'users', user.uid), userData);
    
            console.log('Usuario registrado y datos guardados en Firestore:', userData);
            return userData; // Opcional: devuelve los datos del usuario para usarlos en tu aplicación
        } catch (error) {
            console.error('Error al registrar con Google:', error);
            throw error; // Propaga el error para que puedas manejarlo en tu componente
        }
    };


    return (
        <div className="register-container" data-aos="slide-up">
            <form onSubmit={handleRegister} className="register-form">
                <h1 className="tituloRegister">Crea una cuenta</h1>
                {loading && <div className="loading-message">Cargando...</div>}
                {error && <div className="error-message">{error}</div>}

                {/* Nombre */}
                <div className="input-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="Ingresa tu nombre"
                        required
                    />
                </div>

                {/* Apellido */}
                <div className="input-group">
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        name="lastName"
                        placeholder="Ingresa tu apellido"
                        required
                    />
                </div>

                {/* Correo */}
                <div className="input-group">
                    <label htmlFor="email">Correo:</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Ingresa tu correo"
                        required
                    />
                </div>

                {/* Cédula */}
                <div className="input-group">
                    <label htmlFor="cedula">Cédula:</label>
                    <input
                        id="cedula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        type="text"
                        name="cedula"
                        placeholder="Ingresa tu cédula"
                        required
                    />
                </div>

                {/* Teléfono */}
                <div className="input-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel"
                        name="phone"
                        placeholder="Ingresa tu teléfono"
                        required
                    />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="input-group">
                    <label htmlFor="birthDate">Fecha de Nacimiento:</label>
                    <DatePicker
                        id="birthDate"
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="fecha de nacimiento"
                        showYearDropdown
                        dropdownMode="select"
                        required
                    />
                </div>

                {/* Contraseña */}
                <div className="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>

                <button type="submit" className="register-button">Registrarse</button>
                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="google-register-button"
                >
                    <img
                        src="https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj"
                        alt="Google Logo"
                        className="google-logo"
                    />
                    Registrarse con Google
                </button>
                <p className="login-link">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </form>
        </div>
    );
}