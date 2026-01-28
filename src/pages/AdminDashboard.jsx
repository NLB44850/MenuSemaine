import { useState, useEffect } from 'react'
import { useAuth } from '../services/AuthContext'
import { db, storage } from '../services/firebase'
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import { getWeekNumber, getMonday, getFriday, formatWeekRange } from '../utils/dateUtils'
import { compressImage, isImageFile, isValidFileSize, formatFileSize } from '../utils/imageUtils'
 
/**
 * Dashboard Admin - Gestion des menus
 */
const AdminDashboard = () => {
  const { currentUser, signOut } = useAuth()
 
  // États du formulaire
  const [menuType, setMenuType] = useState('texte') // 'photo' ou 'texte'
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [menuTexte, setMenuTexte] = useState({
    lundi: '',
    mardi: '',
    mercredi: '',
    jeudi: '',
    vendredi: ''
  })
 
  // États de l'interface
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [historique, setHistorique] = useState([])
  const [loadingHistorique, setLoadingHistorique] = useState(true)
 
  // Information de l'établissement (pour simplifier le MVP, on utilise l'email comme identifiant)
  const etablissementId = currentUser?.email?.replace(/[@.]/g, '-') || 'unknown'
 
  // Charger l'historique des menus au montage du composant
  useEffect(() => {
    chargerHistorique()
  }, [])
 
  /**
   * Charger l'historique des 4 dernières semaines de menus
   */
  const chargerHistorique = async () => {
    try {
      setLoadingHistorique(true)
      const menusRef = collection(db, 'menus')
      const q = query(
        menusRef,
        where('etablissementId', '==', etablissementId),
        orderBy('publishedAt', 'desc'),
        limit(4)
      )
 
      const querySnapshot = await getDocs(q)
      const menus = []
      querySnapshot.forEach((doc) => {
        menus.push({ id: doc.id, ...doc.data() })
      })
 
      setHistorique(menus)
    } catch (err) {
      console.error('Erreur lors du chargement de l\'historique:', err)
    } finally {
      setLoadingHistorique(false)
    }
  }
 
  /**
   * Gérer la sélection d'une photo
   */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
 
    // Validation du type de fichier
    if (!isImageFile(file)) {
      setError('Veuillez sélectionner une image (JPEG, PNG, WebP)')
      return
    }
 
    // Validation de la taille
    if (!isValidFileSize(file, 5)) {
      setError('La taille de l\'image ne doit pas dépasser 5 Mo')
      return
    }
 
    setPhotoFile(file)
    setError('')
 
    // Créer un aperçu
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }
 
  /**
   * Gérer les changements dans les champs de menu texte
   */
  const handleMenuTexteChange = (jour, valeur) => {
    setMenuTexte((prev) => ({
      ...prev,
      [jour]: valeur
    }))
  }
 
  /**
   * Valider le formulaire avant publication
   */
  const validerFormulaire = () => {
    if (menuType === 'photo') {
      if (!photoFile) {
        setError('Veuillez sélectionner une photo du menu')
        return false
      }
    } else {
      // Vérifier qu'au moins un jour est rempli
      const joursRemplis = Object.values(menuTexte).some((val) => val.trim() !== '')
      if (!joursRemplis) {
        setError('Veuillez remplir au moins un jour de menu')
        return false
      }
    }
    return true
  }
 
  /**
   * Publier le menu
   */
  const publierMenu = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
 
    if (!validerFormulaire()) return
 
    setLoading(true)
 
    try {
      const semaine = getWeekNumber()
      const dateDebut = getMonday()
      const dateFin = getFriday()
 
      let menuData = {
        etablissementId,
        semaine,
        dateDebut: dateDebut.toISOString(),
        dateFin: dateFin.toISOString(),
        type: menuType,
        publishedAt: new Date().toISOString(),
        publishedBy: currentUser.email
      }
 
      // Upload de la photo si type photo
      if (menuType === 'photo') {
        // Compresser l'image
        const compressedImage = await compressImage(photoFile, 1200, 1200, 0.8)
 
        // Upload vers Firebase Storage
        const timestamp = Date.now()
        const filename = `${timestamp}-${photoFile.name}`
        const storageRef = ref(storage, `menus/${etablissementId}/${filename}`)
 
        await uploadBytes(storageRef, compressedImage)
        const photoUrl = await getDownloadURL(storageRef)
 
        menuData.photoUrl = photoUrl
      } else {
        // Ajouter le menu texte
        menuData.menuTexte = menuTexte
      }
 
      // Sauvegarder dans Firestore
      await addDoc(collection(db, 'menus'), menuData)
 
      setSuccess('Menu publié avec succès ! Les parents peuvent maintenant le consulter.')
 
      // Réinitialiser le formulaire
      setMenuType('texte')
      setPhotoFile(null)
      setPhotoPreview(null)
      setMenuTexte({
        lundi: '',
        mardi: '',
        mercredi: '',
        jeudi: '',
        vendredi: ''
      })
 
      // Recharger l'historique
      chargerHistorique()
    } catch (err) {
      console.error('Erreur lors de la publication:', err)
      setError('Erreur lors de la publication du menu. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }
 
  /**
   * Supprimer un menu de l'historique
   */
  const supprimerMenu = async (menu) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) return
 
    try {
      // Supprimer la photo du Storage si c'est un menu photo
      if (menu.type === 'photo' && menu.photoUrl) {
        try {
          const photoRef = ref(storage, menu.photoUrl)
          await deleteObject(photoRef)
        } catch (err) {
          console.error('Erreur lors de la suppression de la photo:', err)
        }
      }
 
      // Supprimer de Firestore
      await deleteDoc(doc(db, 'menus', menu.id))
 
      setSuccess('Menu supprimé avec succès')
      chargerHistorique()
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      setError('Erreur lors de la suppression du menu')
    }
  }
 
  /**
   * Gérer la déconnexion
   */
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      setError('Erreur lors de la déconnexion')
    }
  }
 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        title="Dashboard Gestionnaire"
        actions={
          <button
            onClick={handleSignOut}
            className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-2"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        }
      />
 
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Messages */}
          {error && <ErrorMessage message={error} onClose={() => setError('')} />}
          {success && <SuccessMessage message={success} onClose={() => setSuccess('')} />}
 
          <div className="grid lg:grid-cols-3 gap-8 mt-6">
            {/* Formulaire de publication */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Publier le menu de la semaine
                </h2>
 
                <form onSubmit={publierMenu} className="space-y-6">
                  {/* Sélection du type de menu */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Type de menu
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setMenuType('texte')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          menuType === 'texte'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <span className="font-medium">Saisie texte</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMenuType('photo')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          menuType === 'photo'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <span className="font-medium">Upload photo</span>
                      </button>
                    </div>
                  </div>
 
                  {/* Upload de photo */}
                  {menuType === 'photo' && (
                    <div>
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Photo du menu
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors">
                        <div className="space-y-1 text-center">
                          {photoPreview ? (
                            <div className="mb-4">
                              <img
                                src={photoPreview}
                                alt="Aperçu du menu"
                                className="max-h-64 mx-auto rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setPhotoFile(null)
                                  setPhotoPreview(null)
                                }}
                                className="mt-2 text-sm text-red-600 hover:text-red-700"
                              >
                                Supprimer
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="photo"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                                >
                                  <span>Choisir une image</span>
                                  <input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handlePhotoChange}
                                  />
                                </label>
                                <p className="pl-1">ou glisser-déposer</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, WebP jusqu'à 5 Mo</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
 
                  {/* Saisie texte jour par jour */}
                  {menuType === 'texte' && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Saisissez le menu pour chaque jour de la semaine :
                      </p>
 
                      {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].map((jour) => (
                        <div key={jour}>
                          <label
                            htmlFor={jour}
                            className="block text-sm font-medium text-gray-700 mb-2 capitalize"
                          >
                            {jour}
                          </label>
                          <textarea
                            id={jour}
                            value={menuTexte[jour]}
                            onChange={(e) => handleMenuTexteChange(jour, e.target.value)}
                            rows={3}
                            className="input-field"
                            placeholder="Exemple : Entrée, Plat, Accompagnement, Dessert"
                          />
                        </div>
                      ))}
                    </div>
                  )}
 
                  {/* Bouton de publication */}
                  <button type="submit" disabled={loading} className="btn-primary w-full">
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
                        Publication en cours...
                      </span>
                    ) : (
                      'Publier le menu'
                    )}
                  </button>
                </form>
              </div>
            </div>
 
            {/* Historique des menus */}
            <div className="lg:col-span-1">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Historique des menus
                </h3>
 
                {loadingHistorique ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-gray-600 mt-2">Chargement...</p>
                  </div>
                ) : historique.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    Aucun menu publié pour le moment
                  </p>
                ) : (
                  <div className="space-y-4">
                    {historique.map((menu) => (
                      <div
                        key={menu.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {formatWeekRange(menu.dateDebut, menu.dateFin)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Type : {menu.type === 'photo' ? 'Photo' : 'Texte'}
                            </p>
                          </div>
                          <button
                            onClick={() => supprimerMenu(menu)}
                            className="text-red-600 hover:text-red-700"
                            aria-label="Supprimer le menu"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                        {menu.type === 'photo' && menu.photoUrl && (
                          <img
                            src={menu.photoUrl}
                            alt="Aperçu du menu"
                            className="w-full h-32 object-cover rounded mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
 
              {/* Lien vers la page publique */}
              <div className="card mt-4 bg-primary-50 border border-primary-200">
                <h4 className="font-medium text-primary-900 mb-2">
                  Lien pour les parents
                </h4>
                <p className="text-sm text-primary-700 mb-3">
                  Partagez ce lien avec les parents :
                </p>
                <div className="bg-white rounded p-2 border border-primary-300">
                  <code className="text-xs text-primary-800 break-all">
                    {window.location.origin}/ecole/{etablissementId}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
 
      <Footer />
    </div>
  )
}
 
export default AdminDashboard