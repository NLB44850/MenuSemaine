import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
 
/**
 * Page 404 - Page non trouvée
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
 
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="mb-8">
            <svg
              className="w-24 h-24 text-primary-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Page non trouvée
            </h2>
            <p className="text-gray-600">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>
 
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </main>
 
      <Footer />
    </div>
  )
}
 
export default NotFound