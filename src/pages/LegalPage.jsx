import Header from '../components/Header'
import Footer from '../components/Footer'
 
/**
 * Page Mentions légales - Informations légales de l'application
 */
const LegalPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Mentions légales" showBackButton backLink="/" />
 
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* En-tête */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mentions légales
            </h1>
            <p className="text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
 
          {/* Éditeur du site */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Éditeur du site
            </h2>
            <div className="text-gray-600 space-y-2">
              <p>
                <strong>Nom du site :</strong> EasyCantine
              </p>
              <p>
                <strong>Adresse web :</strong>{' '}
                <a href="https://menusemaine-dad56.web.app" className="text-primary-600 hover:text-primary-700">
                  https://menusemaine-dad56.web.app
                </a>
              </p>
              <p>
                <strong>Email :</strong>{' '}
                <a href="mailto:nleberre5@gmail.com" className="text-primary-600 hover:text-primary-700">
                  nleberre5@gmail.com
                </a>
              </p>
              <p>
                <strong>Responsable de publication :</strong> Nicolas Le Berre
              </p>
            </div>
          </section>
 
          {/* Hébergement */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Hébergement
            </h2>
            <div className="text-gray-600 space-y-2">
              <p>
                Le site EasyCantine est hébergé par :
              </p>
              <p>
                <strong>Firebase Hosting (Google LLC)</strong>
              </p>
              <p>
                1600 Amphitheatre Parkway<br />
                Mountain View, CA 94043<br />
                États-Unis
              </p>
              <p>
                Site web :{' '}
                <a
                  href="https://firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  https://firebase.google.com
                </a>
              </p>
            </div>
          </section>
 
          {/* Propriété intellectuelle */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Propriété intellectuelle
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>
                L'ensemble du contenu du site EasyCantine (structure, textes, logos, images, etc.)
                est la propriété exclusive de l'éditeur, sauf mention contraire.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou
                publication de ces différents éléments est strictement interdite sans l'accord
                exprès par écrit de l'éditeur.
              </p>
              <p>
                Les images et photos des menus publiées par les établissements demeurent la
                propriété de ces derniers.
              </p>
            </div>
          </section>
 
          {/* Protection des données personnelles */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Protection des données personnelles (RGPD)
            </h2>
            <div className="text-gray-600 space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                4.1 Responsable du traitement
              </h3>
              <p>
                Le responsable du traitement des données est l'éditeur du site, joignable à
                l'adresse email : nleberre5@gmail.com
              </p>
 
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                4.2 Données collectées
              </h3>
              <p>
                Dans le cadre de l'utilisation du site EasyCantine, nous sommes susceptibles de
                collecter les données suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Pour les administrateurs d'établissements :</strong> adresse email,
                  nom de l'établissement, données de connexion (Firebase Authentication)
                </li>
                <li>
                  <strong>Pour les abonnés à la newsletter :</strong> adresse email, nom de
                  l'établissement sélectionné
                </li>
                <li>
                  <strong>Pour les messages de contact :</strong> nom, adresse email, sujet
                  et contenu du message
                </li>
              </ul>
 
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                4.3 Finalité du traitement
              </h3>
              <p>
                Les données personnelles collectées sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Permettre l'authentification des administrateurs</li>
                <li>Envoyer les notifications de nouveaux menus aux abonnés</li>
                <li>Répondre aux demandes de contact</li>
              </ul>
 
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                4.4 Durée de conservation
              </h3>
              <p>
                Les données sont conservées pendant la durée nécessaire aux finalités pour
                lesquelles elles ont été collectées, et conformément aux obligations légales
                de conservation.
              </p>
 
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                4.5 Vos droits
              </h3>
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit à la portabilité de vos données</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à l'adresse :{' '}
                <a href="mailto:nleberre5@gmail.com" className="text-primary-600 hover:text-primary-700">
                  nleberre5@gmail.com
                </a>
              </p>
 
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                4.6 Sécurité des données
              </h3>
              <p>
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles
                appropriées pour protéger vos données personnelles contre la destruction
                accidentelle ou illicite, la perte, l'altération, la diffusion ou l'accès non
                autorisé. Les données sont hébergées de manière sécurisée sur Firebase (Google Cloud).
              </p>
            </div>
          </section>
 
          {/* Cookies */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Cookies
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>
                Le site EasyCantine utilise des cookies essentiels au fonctionnement du service :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Cookies d'authentification :</strong> permettent aux administrateurs
                  de rester connectés à leur espace sécurisé (Firebase Authentication)
                </li>
                <li>
                  <strong>Cookies de session :</strong> nécessaires au bon fonctionnement
                  technique du site
                </li>
              </ul>
              <p>
                Aucun cookie publicitaire ou de tracking n'est utilisé sur ce site.
              </p>
            </div>
          </section>
 
          {/* Limitation de responsabilité */}
          <section className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Limitation de responsabilité
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>
                L'éditeur s'efforce d'assurer au mieux de ses possibilités, l'exactitude et
                la mise à jour des informations diffusées sur ce site. Toutefois, il ne peut
                garantir l'exactitude, la précision ou l'exhaustivité des informations mises
                à disposition.
              </p>
              <p>
                Les menus publiés sur le site sont fournis par les établissements scolaires
                eux-mêmes. L'éditeur ne saurait être tenu responsable des erreurs ou omissions
                dans le contenu des menus.
              </p>
              <p>
                L'éditeur ne pourra être tenu responsable des dommages directs ou indirects
                résultant de l'accès au site ou de l'utilisation du site, y compris
                l'inaccessibilité, les pertes de données, détériorations, destructions ou
                virus qui pourraient affecter l'équipement informatique de l'utilisateur.
              </p>
            </div>
          </section>
 
          {/* Droit applicable */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Droit applicable et juridiction compétente
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>
                Les présentes mentions légales sont régies par le droit français.
              </p>
              <p>
                En cas de litige et à défaut d'accord amiable, le litige sera porté devant
                les tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </div>
          </section>
 
          {/* Contact */}
          <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Des questions sur ces mentions légales ?
            </h2>
            <p className="text-gray-600 mb-4">
              N'hésitez pas à nous contacter pour toute question relative aux présentes
              mentions légales ou à l'utilisation de vos données personnelles.
            </p>
            <a
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Accéder à la page de contact →
            </a>
          </div>
        </div>
      </main>
 
      <Footer />
    </div>
  )
}
 
export default LegalPage