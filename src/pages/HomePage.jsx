import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
 
/**
 * Page d'accueil - Présentation du service MenuSemaine
 */
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
 
      <main className="flex-grow">
        {/* Section Hero */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                MenuSemaine
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                La solution simple pour partager les menus de cantine scolaire
              </p>
              <p className="text-lg mb-12 max-w-3xl mx-auto text-primary-50">
                Publiez vos menus en quelques clics et permettez aux parents de consulter
                facilement ce que mangent leurs enfants à la cantine.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/admin" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Espace Gestionnaire
                </Link>
                <a
                  href="#fonctionnalites"
                  className="btn-secondary border-white text-white hover:bg-white/10"
                >
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </section>
 
        {/* Section Fonctionnalités */}
        <section id="fonctionnalites" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Comment ça marche ?
            </h2>
 
            <div className="grid md:grid-cols-2 gap-12">
              {/* Pour les gestionnaires */}
              <div className="card animate-slide-up">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Pour les gestionnaires
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Connectez-vous à votre espace sécurisé</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Publiez le menu (photo ou texte)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Les parents y ont accès immédiatement</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Consultez l'historique de vos menus</span>
                  </li>
                </ul>
              </div>
 
              {/* Pour les parents */}
              <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-success-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Pour les parents
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Aucune inscription nécessaire</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Accédez directement via le lien de votre école</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Consultez le menu de la semaine</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Interface mobile-friendly et accessible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
 
        {/* Section CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Prêt à simplifier la communication des menus ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              MenuSemaine est conçu spécialement pour les écoles et crèches de Loire-Atlantique.
              Simple, rapide et efficace.
            </p>
            <Link to="/admin" className="btn-primary">
              Commencer maintenant
            </Link>
          </div>
        </section>
      </main>
 
      <Footer />
    </div>
  )
}
 
export default HomePage