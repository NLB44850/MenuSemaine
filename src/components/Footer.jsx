import { Link } from 'react-router-dom'
/**
 * Composant Footer - Pied de page de l'application
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()
 
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © {currentYear} EasyCantine. Tous droits réservés.
          </div>
 
          {/* Liens utiles */}
          <div className="flex space-x-6 text-sm">
           <Link
              to="/a-propos"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/mentions-legales"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Mentions légales
            </Link>
          </div>
          </div>
        </div>
    </footer>
  )
}
 
export default Footer