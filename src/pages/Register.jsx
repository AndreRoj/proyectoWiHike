import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from '../firebase';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import {db} from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const auth = getAuth(app);
export default function Register() {

    const navigation = useNavigate()
    const [name , setName] = useState('')
    const [apellido , setApellido] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [cedula, setCedula] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const handleRegister = async (e) =>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const usuarioRegistrado = await createUserWithEmailAndPassword(auth, email, password) 
            
            const userData = {
                name,
                apellido,
                email,
                cedula,
                telefono,
                fechaNacimiento
            };
            await addDoc(collection(db, 'users'), userData)

            console.log(usuarioRegistrado)
            setEmail("")
            setPassword("")
            setName("")
            setApellido("")
            setCedula("")
            setTelefono("")
            setFechaNacimiento("")
            navigation('/')
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
            //Hacer manejo de errores, solo esta el de correo ya en uso
            if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
                setError('El correo ya está en uso')
            } else {
                setError('Ocurrio un error al registrar usuario')
            }
        }
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