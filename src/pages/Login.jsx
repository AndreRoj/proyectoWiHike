import { useState } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from "react-router";

const auth = getAuth(app);

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
            navigation('/');
        } catch (error) {
            setError("Invalid email or password");
            console.log(error);
        }
    };

    return (
        <div className="login-container">
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
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p className="signup-link">¿No tienes cuenta? <a href="/signup">Sign up</a></p>
            </form>
        </div>
    );
}


// import { useState } from "react"
// import "./Login.css" 
// import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
// import {app} from '../firebase'
// import { useNavigate } from "react-router"


// const auth = getAuth(app)

// export default function Login() {
//     const navigation = useNavigate()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')


//     const handleLogin = async (e) => {
//         e.preventDefault()
        
//         try {
//             const user = await signInWithEmailAndPassword(auth, email, password)
//             console.log(user.user.uid)
//             console.log(user.user.email)
//             navigation('/')

//         } catch (error) {
//             console.log(error)
//     }
// }

//     return (
//         <div className="login">


//             <form onSubmit = {handleLogin}>


//                 <h1 className="tituloLogin">Login</h1>

//                 <label>
//                     Email:
//                     <input value = {email} onChange = {(e) => setEmail(e.target.value)} type="email" name="email"/> 
//                 </label>

//                 <label>
//                     Password:
//                     <input value = {password} onChange = {(e) => setPassword(e.target.value)} type="password" name="password"/>
//                 </label>

//                 <button type="submit">Login</button>
                 
//             </form>
            
//         </div>
//     )
// }


