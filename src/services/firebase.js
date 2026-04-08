import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
 
// Configuration Firebase depuis les variables d'environnement
const firebaseConfig = {
  apiKey: "AIzaSyAtaiiMAgW1FiKAsQv8eqzam-8Rb1lXTEE",
  authDomain: "menusemaine-dad56.firebaseapp.com",
  projectId: "menusemaine-dad56",
  storageBucket: "menusemaine-dad56.firebasestorage.app",
  messagingSenderId: "784460574046",
  appId: "1:784460574046:web:f82c23a11667cb1f1933cf",
  measurementId: "G-F74KRRYR0S"
};
 
// Initialisation de Firebase
const app = initializeApp(firebaseConfig)
 
// Export des services Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
 
export default app