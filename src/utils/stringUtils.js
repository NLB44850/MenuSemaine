/**
 * Utilitaires pour la manipulation des chaînes de caractères
 */
 
/**
 * Créer un slug à partir d'un texte
 * @param {string} text - Le texte à convertir en slug
 * @returns {string} - Le slug généré
 */
export const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normaliser les caractères Unicode
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/--+/g, '-') // Remplacer les tirets multiples par un seul
    .replace(/^-+|-+$/g, '') // Supprimer les tirets au début et à la fin
}
 
/**
 * Capitaliser la première lettre d'une chaîne
 * @param {string} text - Le texte à capitaliser
 * @returns {string} - Le texte capitalisé
 */
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
 
/**
 * Tronquer un texte à une longueur donnée
 * @param {string} text - Le texte à tronquer
 * @param {number} maxLength - La longueur maximale
 * @returns {string} - Le texte tronqué
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}
 
/**
 * Valider une adresse email
 * @param {string} email - L'email à valider
 * @returns {boolean} - true si l'email est valide
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}