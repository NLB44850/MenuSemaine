import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorMessage from '../components/ErrorMessage'
import ContactForm from '../components/ContactForm'
 
/**
 * Page de connexion admin
 */
const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showContactForm, setShowContactForm] = useState(false)
 
  const { signIn, currentUser } = useAuth()
  const navigate = useNavigate()
 
  // Rediriger si déjà connecté
  useEffect(() => {
    if (currentUser) {
      navigate('/admin/dashboard')
    }
  }, [currentUser, navigate])
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
 
    // Validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }
 
    setLoading(true)
 
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Espace Gestionnaire" showBackButton backLink="/" />
 
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="card animate-fade-in">
            {/* Titre */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Connexion Gestionnaire
              </h1>
              <p className="text-gray-600">
                Connectez-vous pour gérer les menus de votre établissement
              </p>
            </div>
 
            {/* Message d'erreur */}
            {error && <ErrorMessage message={error} onClose={() => setError('')} />}
 
            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="votre-email@exemple.com"
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
 
              {/* Mot de passe */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>
 
              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
 
            {/* Aide */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Première connexion ?{' '}
               <button
                  onClick={() => setShowContactForm(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  Contactez-nous
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
 
      <Footer />
 
      {/* Modal de contact */}
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
    </div>
  )
}
 
export default AdminLogin