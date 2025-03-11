import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from '../firebase';
import {useState} from 'react';
import { useNavigate } from 'react-router';
<<<<<<< HEAD
=======
import './Register.css'; // Importa el archivo CSS
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; // Importa addDoc para Firestore
import DatePicker from 'react-datepicker';
import { setDoc, doc } from "firebase/firestore";
import 'react-datepicker/dist/react-datepicker.css'; // Estilos predeterminados
import './DatePicker.css'; // Estilos personalizados (deben ir después)
>>>>>>> parent of eeb42a9 (.)

const auth = getAuth(app);
export default function Register() {
<<<<<<< HEAD
=======
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
>>>>>>> parent of eeb42a9 (.)

    const navigation = useNavigate()
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const handleRegister = async (e) =>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const usuarioRegistrado = await createUserWithEmailAndPassword(auth, email, password) 
        
            console.log(usuarioRegistrado)
            setEmail("")
            setPassword("")
            setName("")
            navigation('/')
            setLoading(false)

<<<<<<< HEAD
=======
            console.log("Usuario registrado: ", usuarioRegistrado.user.uid);

            // Guarda la información adicional del usuario en Firestore
            const userData = {
                uid: usuarioRegistrado.user.uid, // ID único del usuario
                nombre: name,
                apellido: lastName,
                email: email,
                cedula: cedula,
                telefono: phone,
                fechaNacimiento: birthDate,
                fechaRegistro: new Date(), // Fecha de registro
            };

            // Agrega el documento a la colección "users"
            await setDoc(doc(db, "users", usuarioRegistrado.user.uid), userData);

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
>>>>>>> parent of eeb42a9 (.)
        } catch (error) {
            setLoading(false)
            console.log(error)
            //Hacer manejo de errores, solo esta el de correo ya en uso
            if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
                setError('El correo ya está en uso')
            }
        }
<<<<<<< HEAD
=======
    };

    const handleGoogleRegister = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider); // Inicia sesión con Google
            const user = result.user;

            // Validación del dominio del correo
            if (!user.email.endsWith('@correo.unimet.edu.ve')) {
                setError('Solo se permiten correos con el dominio @correo.unimet.edu.ve');
                await auth.signOut(); // Cierra la sesión del usuario
                return;
            }

            console.log("Usuario registrado con Google: ", user.uid);

            // Guarda la información adicional del usuario en Firestore
            const userData = {
                uid: user.uid, // ID único del usuario
                nombre: user.displayName?.split(" ")[0] || "", // Nombre del usuario
                apellido: user.displayName?.split(" ")[1] || "", // Apellido del usuario
                email: user.email,
                fechaRegistro: new Date(), // Fecha de registro
            };

            // Agrega el documento a la colección "users"
            await setDoc(doc(db, "users", usuarioRegistrado.user.uid), userData);

            console.log("Usuario guardado en Firestore");

            // Redirige al usuario a la página principal
            navigation('/');
        } catch (error) {
            setLoading(false);
            console.error("Error al registrarse con Google: ", error);
            setError('Ocurrió un error al registrarse con Google');
        }
    };
>>>>>>> parent of eeb42a9 (.)

        const usuarioRegistrado = await createUserWithEmailAndPassword(auth, email, password) 
        
        console.log(usuarioRegistrado)
        setEmail("")
        setPassword("")
        setName("")
        navigation('/')
    }
    
    return (
        <div>
            {loading && <div className="">Cargando...</div>}
            {error && <div className="">{error}</div>}

            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <label>
                    Nombre:
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name"/>
                </label>
                <label>
                    Email:
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email"/>
                </label>
                <label>
                    Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password"/>
                </label>
                <button type="submit">Login</button>
                 
            </form>
            
        </div>
    )
}