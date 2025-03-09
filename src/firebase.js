// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNRgD7fhIGGMBbrdFLeL1eOWYmhAxTg1w",
  authDomain: "wehike-7c080.firebaseapp.com",
  projectId: "wehike-7c080",
  storageBucket: "wehike-7c080.firebasestorage.app",
  messagingSenderId: "457241749461",
  appId: "1:457241749461:web:77d3902945f2a0bc2f3f5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);