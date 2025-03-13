import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Register.css'; 
import { db } from '../firebase';
import {setDoc, doc } from "firebase/firestore"; // Importa addDoc para Firestore
import DatePicker from 'react-datepicker';
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

    const validateName = (value) => {
        const regex = /^[A-Za-z\s]+$/
        return regex.test(value)
    }

    const validateLastName = (value) => {
        const regex = /^[A-Za-z\s]+$/
        return regex.test(value)
    }

    const validateCedula = (value) => {
        const regex = /^\d{6,8}$/
        return regex.test(value)
    }

    const validatePhone = (value) => {
        const regex =/^\d{11}$/
        return regex.test(value)
    }

    const handleRegister = async (e) =>{
        e.preventDefault()
        
        if(!validateName(name)){
            setError('El nombre solo puede contener letras y espacios');
            return;
        }

        if(!validateLastName(lastName)){
            setError('El apellido solo puede contener letras y espacios');
            return;
        }

        if(!validateCedula(cedula)){
            setError('Error en la cédula');
            return;
        }

        if(!validatePhone(phone)){
            setError('El teléfono debe contener 11 dígitos');
            return;
        }

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
            setLoading(true);
            const result = await signInWithPopup(auth, provider); 
            const user = result.user;

           
            if (!user.email.endsWith('@correo.unimet.edu.ve')) {
                setError('Solo se permiten correos con el dominio @correo.unimet.edu.ve');
                await auth.signOut(); 
                return;
            }

            console.log("Usuario registrado con Google: ", user.uid);

       
            const userData = {
                uid: user.uid, 
                nombre: user.displayName?.split(" ")[0] || "", 
                apellido: user.displayName?.split(" ")[1] || "", 
                email: user.email,
                fechaRegistro: new Date(), 
            };

     
            await setDoc(doc(db, "users", usuarioRegistrado.user.uid), userData);

            console.log("Usuario guardado en Firestore");

         
            navigation('/');
        } catch (error) {
            setLoading(false);
            console.error("Error al registrarse con Google: ", error);
            setError('Ocurrió un error al registrarse con Google');
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