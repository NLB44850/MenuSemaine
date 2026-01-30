import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../services/firebase'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import { formatWeekRange, getDayName, getWeekNumber } from '../utils/dateUtils'
 
/**
 * Page publique d'affichage du menu d'un établissement
 */
const MenuPublic = () => {
  const { slug } = useParams()
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
 
  useEffect(() => {
    chargerMenuSemaine()
  }, [slug])
 
  /**
   * Charger le menu de la semaine en cours
   */
  const chargerMenuSemaine = async () => {
    try {
      setLoading(true)
      const semaine = getWeekNumber()
 
      const menusRef = collection(db, 'menus')
      const q = query(
        menusRef,
        where('etablissementId', '==', slug),
        where('semaine', '==', semaine),
        orderBy('publishedAt', 'desc'),
        limit(1)
      )
 
      const querySnapshot = await getDocs(q)
 
      if (!querySnapshot.empty) {
        const menuData = querySnapshot.docs[0].data()
        setMenu(menuData)
      } else {
        setMenu(null)
      }
    } catch (err) {
      console.error('Erreur lors du chargement du menu:', err)
      setError('Erreur lors du chargement du menu')
    } finally {
      setLoading(false)
    }
  }
 
  /**
   * Gérer l'impression
   */
  const handlePrint = () => {
    window.print()
  }
 
  /**
   * Copier le lien vers le presse-papiers
   */
  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      alert('Lien copié dans le presse-papiers !')
    })
  }
 
  if (loading) {
    return <Loader message="Chargement du menu..." />
  }
 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Easy Cantine" showBackButton backLink="/" />
 
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="card text-center">
              <svg
                className="w-16 h-16 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Erreur de chargement
              </h2>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : menu ? (
            <div className="animate-fade-in">
              {/* En-tête du menu */}
              <div className="card mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Menu de la cantine
                    </h1>
                    <p className="text-lg text-primary-600 font-medium">
                      {formatWeekRange(menu.dateDebut, menu.dateFin)}
                    </p>
                  </div>
 
                  {/* Actions */}
                  <div className="flex space-x-3 no-print">
                    <button
                      onClick={handlePrint}
                      className="btn-secondary flex items-center space-x-2"
                      aria-label="Imprimer le menu"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                        />
                      </svg>
                      <span className="hidden sm:inline">Imprimer</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="btn-secondary flex items-center space-x-2"
                      aria-label="Copier le lien"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span className="hidden sm:inline">Partager</span>
                    </button>
                  </div>
                </div>
              </div>
 
              {/* Affichage du menu selon le type */}
              {menu.type === 'photo' && menu.photoUrl ? (
                <div className="card">
                  <img
                    src={menu.photoUrl}
                    alt="Menu de la semaine"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              ) : menu.type === 'texte' && menu.menuTexte ? (
                <div className="space-y-4">
                  {Object.entries(menu.menuTexte).map(([jour, contenu]) => {
                    if (!contenu || contenu.trim() === '') return null
 
                    return (
                      <div key={jour} className="menu-day-card animate-slide-up">
                        <h3 className="text-lg font-semibold text-primary-700 mb-3">
                          {getDayName(jour)}
                        </h3>
                        <div className="text-gray-700 whitespace-pre-line">
                          {contenu}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : null}
 
              {/* Information supplémentaire */}
              <div className="mt-6 text-center text-sm text-gray-600 no-print">
                <p>
                  Publié le{' '}
                  {new Date(menu.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ) : (
            <div className="card text-center animate-fade-in">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Menu non disponible
              </h2>
              <p className="text-gray-600">
                Le menu de cette semaine n'est pas encore disponible.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Revenez plus tard ou contactez votre établissement.
              </p>
            </div>
          )}
          
          {/* Formulaire d'inscription à la newsletter */}
          <NewsletterSubscribe
            etablissementId={slug}
            etablissementNom={slug.replace(/-/g, ' ').toUpperCase()}
          />
        </div>
      </main>
 
      <Footer />
    </div>
  )
}
 
export default MenuPublic