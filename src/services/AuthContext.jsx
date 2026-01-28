import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'
 
// Création du contexte d'authentification
const AuthContext = createContext({})
 
// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
}
 
// Provider d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 
  // Connexion avec email et mot de passe
  const signIn = async (email, password) => {
    try {
      setError(null)
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result
    } catch (err) {
      let errorMessage = 'Une erreur est survenue lors de la connexion'
 
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Email ou mot de passe incorrect'
          break
        case 'auth/invalid-email':
          errorMessage = 'Email invalide'
          break
        case 'auth/user-disabled':
          errorMessage = 'Ce compte a été désactivé'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Trop de tentatives. Veuillez réessayer plus tard'
          break
        default:
          errorMessage = err.message
      }
 
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }
 
  // Déconnexion
  const signOut = async () => {
    try {
      setError(null)
      await firebaseSignOut(auth)
    } catch (err) {
      setError('Erreur lors de la déconnexion')
      throw err
    }
  }
 
  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
 
    // Nettoyage lors du démontage du composant
    return unsubscribe
  }, [])
 
  const value = {
    currentUser,
    loading,
    error,
    signIn,
    signOut
  }
 
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}