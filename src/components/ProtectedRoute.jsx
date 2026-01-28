import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthContext'
import Loader from './Loader'
 
/**
 * Composant de protection des routes admin
 * Redirige vers /admin si l'utilisateur n'est pas authentifié
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
 
  if (loading) {
    return <Loader />
  }
 
  if (!currentUser) {
    return <Navigate to="/admin" replace />
  }
 
  return children
}
 
export default ProtectedRoute