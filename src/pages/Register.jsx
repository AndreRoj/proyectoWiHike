import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from '../firebase';
import {useState} from 'react';
import { useNavigate } from 'react-router';

const auth = getAuth(app);
export default function Register() {

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

        } catch (error) {
            setLoading(false)
            console.log(error)
            //Hacer manejo de errores, solo esta el de correo ya en uso
            if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
                setError('El correo ya está en uso')
            }
        }

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