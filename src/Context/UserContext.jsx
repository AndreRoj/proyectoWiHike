import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase";
import {doc, getDoc, getFirestore } from "firebase/firestore";

// revisar codigo que no devuelve nada de la bd

const UserContext = createContext(null);
const auth = getAuth(app);
const db =  getFirestore(app)
//si no sirve el context, probar con UserContext.Provider
  const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [profile, setProfile] = useState({})
    const [logged , setLogged] = useState(false)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (userConnected) => {
        if(userConnected){
          const userDocRef = doc(db, "users", userConnected.uid)
          console.log("Referenica: ", userDocRef)

          //setUser(userConnected)
          //console.log("Usuario conectado: ", userConnected.uid)

          try {
            const docSnap = await getDoc(userDocRef)
           //console.log("DocSnap: ", docSnap)

            if(!docSnap.exists()){
              console.log("No existe el documento del usuario: ", userConnected.uid)
              setProfile({})

            }         
              setProfile(docSnap.data())// actualiza e estado con los daos de la bd users
              console.log("Datos del perfil: ", docSnap.data())

              setLogged(true) // actualiza el estado logged 

          } catch (error) {
            console.log("Error al obtener el doc: ",error)
            setProfile({})
          }

        }else{
          //console.log("No hay usuario conectado")
          //setUser(null) // limpia el estado user si no hay nadie conectado
          setProfile({})
          setLogged(false)
        }
      })

      return () => unsubscribe()

    }, [])
    
    return (<UserContext value={{ user, setUser, profile, setProfile, logged}}> {children} </UserContext>)

}

export {UserContext, UserProvider}
