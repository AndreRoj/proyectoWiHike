import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase";

const UserContext = createContext(null);
const auth = getAuth(app);
//si no sirve el context, probar con UserContext.Provider
  const UserProvider = ({children}) => {

    onAuthStateChanged(auth, (userConnected) =>{
        console.log(userConnected)
    })
    const [user, setUser] = useState('Salome');

    useEffect(() => {
        
    }, [user])

    return(<UserContext value = {{ user, setUser}} > {children}</UserContext>)

}

export {UserContext, UserProvider};
