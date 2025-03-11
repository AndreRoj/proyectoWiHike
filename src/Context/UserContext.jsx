import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserContext = createContext(null);

const auth = getAuth(app);
const db = getFirestore(app);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);  // Asegúrate de que el perfil esté inicializado como null
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userConnected) => {
      if (userConnected) {
        const userDocRef = doc(db, 'users', userConnected.uid);
        try {
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile(data);  // Asegúrate de que se establezca el perfil con los datos correctos
            console.log('Perfil cargado:', data);
          } else {
            console.log('No such document!');
            setProfile(null);  // Si no existe el documento, se establece como null
          }
          setLogged(true);  // El usuario está loggeado
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
          setProfile(null);  // En caso de error, se establece el perfil como null
        }
      } else {
        setProfile(null);  // Si no hay usuario conectado, se establece el perfil como null
        setLogged(false);  // El usuario no está loggeado
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile, logged }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
