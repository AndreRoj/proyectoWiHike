import "./Login.css" 

export default function Login() {
    return (
        <div>
            <form>
                <h1>Login</h1>
                <label>
                    Email:
                    <input type="email" name="email"/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password"/>
                </label>
                <button type="submit">Login</button>
                 
            </form>
            
        </div>
    )
}