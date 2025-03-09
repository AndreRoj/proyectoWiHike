import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Register.css'; // Importa el archivo CSS
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; // Importa addDoc para Firestore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Estilos predeterminados
import './DatePicker.css'; // Estilos personalizados (deben ir después)

const auth = getAuth(app);

export default function Register() {
    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState(''); // Nuevo campo: apellido
    const [email, setEmail] = useState('');
    const [cedula, setCedula] = useState(''); // Nuevo campo: cédula
    const [phone, setPhone] = useState(''); // Nuevo campo: teléfono
    const [birthDate, setBirthDate] = useState(null); // Nuevo campo: fecha de nacimiento
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = async (e) =>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const usuarioRegistrado = await createUserWithEmailAndPassword(auth, email, password) 

            console.log(usuarioRegistrado)
            setEmail("")
            setPassword("")
            setName("")
            setLastName("")
            setCedula("")
            setPhone("")
            setBirthDate("")
            navigation('/')
            setLoading(false)

            console.log("Usuario registrado: ", usuarioRegistrado.user.uid);

            // 2. Guarda la información adicional del usuario en Firestore
            const userData = {
                uid: usuarioRegistrado.user.uid, // ID único del usuario
                nombre: name,
                apellido: lastName, // Nuevo campo: apellido
                email: email,
                cedula: cedula, // Nuevo campo: cédula
                telefono: phone, // Nuevo campo: teléfono
                fechaNacimiento: birthDate, // Nuevo campo: fecha de nacimiento
                fechaRegistro: new Date(), // Fecha de registro
            };

            // Agrega el documento a la colección "users"
            await addDoc(collection(db, "users"), userData);

            console.log("Usuario guardado en Firestore");

            // Limpia los campos del formulario
            setEmail("");
            setPassword("");
            setName("");
            setLastName("");
            setCedula("");
            setPhone("");
            setBirthDate(null);

            // Redirige al usuario a la página principal
            navigation('/');
            
        } catch (error) {
            setLoading(false);
            console.log(error);
            //hacer manejo de errores, solo esta correo en uso
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                setError('El correo ya está en uso');
            } else {
                setError('Ocurrió un error al registrarse');
            }
        }
    };

    return (
        <div className="register-container">
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
                        placeholderText="Selecciona tu fecha de nacimiento"
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
                <p className="login-link">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </form>
        </div>
    );
}