import { useState } from "react"
import "./Login.css" 
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {app} from '../firebase'
import { useNavigate } from "react-router"


const auth = getAuth(app)

export default function Login() {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user.user.uid)
            console.log(user.user.email)
            navigation('/')

        } catch (error) {
            console.log(error)
    }
}

    return (
        <div>
            <form onSubmit = {handleLogin}>
                <h1>Login</h1>
                <label>
                    Email:
                    <input value = {email} onChange = {(e) => setEmail(e.target.value)} type="email" name="email"/> 
                </label>
                <label>
                    Password:
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} type="password" name="password"/>
                </label>
                <button type="submit">Login</button>
                 
            </form>
            
        </div>
    )
}