import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
 
/**
 * Page Contact - Page dédiée au formulaire de contact
 */
const ContactPage = () => {
  const [showContactForm, setShowContactForm] = useState(false)
 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Contact" showBackButton backLink="/" />
 
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Une question ? Une suggestion ? Nous sommes à votre écoute
            </p>
          </div>
 
          {/* Informations de contact */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Formulaire de contact */}
            <div className="card">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Envoyez-nous un message
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Remplissez notre formulaire de contact et nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary w-full"
              >
                Ouvrir le formulaire
              </button>
            </div>
 
            {/* Email direct */}
            <div className="card">
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
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Email
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Vous pouvez également nous contacter directement par email :
              </p>
              <a
                href="mailto:nleberre5@gmail.com"
                className="text-primary-600 hover:text-primary-700 font-medium text-lg"
              >
                nleberre5@gmail.com
              </a>
            </div>
          </div>
 
          {/* Questions fréquentes */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Questions fréquentes
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Comment puis-je utiliser EasyCantine pour mon établissement ?
                </h3>
                <p className="text-gray-600">
                  Contactez-nous via le formulaire ci-dessus en précisant le nom et l'adresse
                  de votre établissement. Nous vous créerons un compte administrateur et vous
                  fournirons toutes les informations nécessaires pour démarrer.
                </p>
              </div>
 
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Les parents doivent-ils créer un compte ?
                </h3>
                <p className="text-gray-600">
                  Non, l'accès aux menus est totalement public. Les parents peuvent consulter
                  les menus via un simple lien web sans aucune inscription. Ils peuvent
                  optionnellement s'abonner à la newsletter pour recevoir des notifications
                  par email.
                </p>
              </div>
 
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Combien coûte l'utilisation d'EasyCantine ?
                </h3>
                <p className="text-gray-600">
                  Le service est actuellement en phase de déploiement. Contactez-nous pour
                  discuter des modalités adaptées à votre établissement.
                </p>
              </div>
 
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Puis-je modifier ou supprimer un menu après publication ?
                </h3>
                <p className="text-gray-600">
                  Oui, depuis votre espace administrateur, vous pouvez à tout moment modifier
                  ou supprimer un menu publié. Les changements sont immédiatement visibles
                  pour les parents.
                </p>
              </div>
 
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Mes données sont-elles sécurisées ?
                </h3>
                <p className="text-gray-600">
                  Oui, toutes les données sont hébergées de manière sécurisée sur les serveurs
                  Firebase de Google. Nous ne collectons que les informations strictement
                  nécessaires au fonctionnement du service et respectons le RGPD.
                </p>
              </div>
            </div>
          </section>
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
 
export default ContactPage