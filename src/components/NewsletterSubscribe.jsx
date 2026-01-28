import { useState } from 'react'
import { db } from '../services/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'

/**
 * Composant d'inscription à la newsletter des menus
 */
const NewsletterSubscribe = ({ etablissementId, etablissementNom }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse email valide')
      return
    }

    setLoading(true)

    try {
      // Vérifier si déjà abonné
      const abonnesRef = collection(db, 'abonnes')
      const q = query(
        abonnesRef,
        where('etablissementId', '==', etablissementId),
        where('email', '==', email.toLowerCase())
      )
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        setError('Vous êtes déjà abonné aux notifications de menus')
        setLoading(false)
        return
      }

      // Créer l'abonnement
      const unsubscribeToken = Math.random().toString(36).substring(2, 15) +
                               Math.random().toString(36).substring(2, 15)

      await addDoc(collection(db, 'abonnes'), {
        email: email.toLowerCase(),
        etablissementId,
        etablissementNom,
        subscribedAt: new Date().toISOString(),
        unsubscribeToken,
        active: true
      })

      setSuccess('✅ Inscription réussie ! Vous recevrez un email à chaque nouveau menu publié.')
      setEmail('')
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err)
      setError('Erreur lors de l\'inscription. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card mt-6 bg-primary-50 border border-primary-200">
      <div className="flex items-start mb-3">
        <svg
          className="w-6 h-6 text-primary-600 mr-2 flex-shrink-0"
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
        <div>
          <h3 className="text-lg font-semibold text-primary-900">
            Recevoir le menu par email
          </h3>
          <p className="text-sm text-primary-700 mt-1">
            Inscrivez-vous pour recevoir automatiquement le menu de la semaine par email dès sa publication.
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}
      {success && <SuccessMessage message={success} onClose={() => setSuccess('')} />}

      <form onSubmit={handleSubscribe} className="mt-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre.email@exemple.com"
            className="input-field flex-1"
            required
            disabled={loading}
            aria-label="Adresse email"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Inscription...
              </span>
            ) : (
              "S'inscrire"
            )}
          </button>
        </div>
      </form>

      <p className="text-xs text-primary-600 mt-3">
        🔒 Votre email ne sera utilisé que pour les notifications de menus.
        Vous pourrez vous désabonner à tout moment.
      </p>
    </div>
  )
}

export default NewsletterSubscribe
