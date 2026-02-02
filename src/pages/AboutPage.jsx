import Header from '../components/Header'
import Footer from '../components/Footer'
 
/**
 * Page À propos - Présentation de l'application EasyCantine
 */
const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="À propos" showBackButton backLink="/" />
 
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              À propos d'EasyCantine
            </h1>
            <p className="text-xl text-gray-600">
              La solution simple et efficace pour partager les menus de cantine scolaire
            </p>
          </div>
 
          {/* Notre mission */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Notre mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              EasyCantine a été créé pour simplifier la communication entre les établissements scolaires
              et les parents d'élèves concernant les menus de cantine. Notre objectif est de rendre
              l'information accessible, claire et instantanée.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nous croyons que les parents ont le droit de savoir ce que mangent leurs enfants à l'école,
              et nous facilitons cette transparence grâce à une plateforme intuitive et moderne.
            </p>
          </section>
 
          {/* Nos valeurs */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Nos valeurs
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Simplicité</h3>
                <p className="text-gray-600 text-sm">
                  Une interface épurée et intuitive, accessible à tous sans formation préalable.
                </p>
              </div>
 
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-lg mb-4">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparence</h3>
                <p className="text-gray-600 text-sm">
                  Information claire et accessible pour tous les parents, sans inscription nécessaire.
                </p>
              </div>
 
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapidité</h3>
                <p className="text-gray-600 text-sm">
                  Publiez vos menus en quelques clics, les parents y accèdent instantanément.
                </p>
              </div>
            </div>
          </section>
 
          {/* Pour qui ? */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Pour qui ?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary-600 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Écoles primaires et maternelles
                  </h3>
                  <p className="text-gray-600">
                    Communiquez facilement les menus de la cantine aux parents d'élèves.
                  </p>
                </div>
              </div>
 
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary-600 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Crèches et garderies
                  </h3>
                  <p className="text-gray-600">
                    Partagez les menus et informez les parents en temps réel.
                  </p>
                </div>
              </div>
 
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary-600 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Centres de loisirs
                  </h3>
                  <p className="text-gray-600">
                    Informez les familles des repas proposés pendant les activités.
                  </p>
                </div>
              </div>
            </div>
          </section>
 
          {/* Zone géographique */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Zone d'intervention
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              EasyCantine est actuellement déployé en <strong>Loire-Atlantique (44)</strong> et
              accompagne les établissements scolaires du département dans leur communication
              avec les familles.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vous êtes un établissement situé dans une autre région ? Contactez-nous pour
              discuter d'un éventuel déploiement dans votre secteur.
            </p>
          </section>
        </div>
      </main>
 
      <Footer />
    </div>
  )
}
 
export default AboutPage