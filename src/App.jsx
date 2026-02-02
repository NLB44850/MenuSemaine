import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './services/AuthContext'
  
// Pages
import HomePage from './pages/HomePage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import MenuPublic from './pages/MenuPublic'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'
 
// Composant de protection des routes admin
import ProtectedRoute from './components/ProtectedRoute'
 
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique : page d'accueil */}
          <Route path="/" element={<HomePage />} />
 
          {/* Route publique : connexion admin */}
          <Route path="/admin" element={<AdminLogin />} />
 
          {/* Route protégée : dashboard admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
 
          {/* Route publique : affichage du menu d'un établissement */}
          <Route path="/ecole/:slug" element={<MenuPublic />} />

          {/* Routes informatives */}
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
 
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
 
export default App