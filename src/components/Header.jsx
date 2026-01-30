import { Link } from 'react-router-dom'
 
/**
 * Composant Header - En-tête de l'application
 */
const Header = ({ title, showBackButton = false, backLink = '/', actions }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link
                to={backLink}
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Retour"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {title || 'Easy Cantine'}
              </span>
            </Link>
          </div>
 
          {/* Actions (boutons, menus, etc.) */}
          {actions && <div className="flex items-center space-x-4">{actions}</div>}
        </div>
      </div>
    </header>
  )
}
 
export default Header