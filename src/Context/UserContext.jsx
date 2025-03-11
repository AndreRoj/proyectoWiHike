import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserContext = createContext(null);

const auth = getAuth(app);
const db = getFirestore(app);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);  
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userConnected) => {
      if (userConnected) {
        const userDocRef = doc(db, 'users', userConnected.uid);
        try {
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile(data);  
            console.log('Perfil cargado:', data);
          } else {
            console.log('No such document!');
            setProfile(null); 
          }
          setLogged(true); 
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
          setProfile(null);  
        }
      } else {
        setProfile(null);  
        setLogged(false);  
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
