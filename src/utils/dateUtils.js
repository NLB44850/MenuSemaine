/**
 * Utilitaires pour la manipulation des dates
 */
 
/**
 * Obtenir le numéro de semaine ISO (format YYYY-Www)
 * @param {Date} date - La date
 * @returns {string} - Le numéro de semaine au format "YYYY-Www"
 */
export const getWeekNumber = (date = new Date()) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`
}
 
/**
 * Obtenir le premier jour (lundi) de la semaine en cours
 * @param {Date} date - La date
 * @returns {Date} - Le lundi de la semaine
 */
export const getMonday = (date = new Date()) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Ajustement si dimanche
  return new Date(d.setDate(diff))
}
 
/**
 * Obtenir le dernier jour (vendredi) de la semaine scolaire
 * @param {Date} date - La date
 * @returns {Date} - Le vendredi de la semaine
 */
export const getFriday = (date = new Date()) => {
  const monday = getMonday(date)
  const friday = new Date(monday)
  friday.setDate(monday.getDate() + 4)
  return friday
}
 
/**
 * Formater une date au format "DD/MM/YYYY"
 * @param {Date|string|number} date - La date à formater
 * @returns {string} - La date formatée
 */
export const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}
 
/**
 * Formater une plage de dates pour l'affichage de la semaine
 * @param {Date|string|number} dateDebut - Date de début
 * @param {Date|string|number} dateFin - Date de fin
 * @returns {string} - La plage formatée (ex: "Semaine du 20 au 24 janvier 2025")
 */
export const formatWeekRange = (dateDebut, dateFin) => {
  const debut = new Date(dateDebut)
  const fin = new Date(dateFin)
 
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ]
 
  const jourDebut = debut.getDate()
  const jourFin = fin.getDate()
  const mois = months[fin.getMonth()]
  const annee = fin.getFullYear()
 
  return `Semaine du ${jourDebut} au ${jourFin} ${mois} ${annee}`
}
 
/**
 * Obtenir le nom du jour en français
 * @param {string} jour - Le jour en anglais (lundi, mardi, etc.)
 * @returns {string} - Le nom du jour capitalisé
 */
export const getDayName = (jour) => {
  const days = {
    lundi: 'Lundi',
    mardi: 'Mardi',
    mercredi: 'Mercredi',
    jeudi: 'Jeudi',
    vendredi: 'Vendredi'
  }
  return days[jour] || jour
}
 
/**
 * Vérifier si une date est dans la semaine en cours
 * @param {Date|string|number} date - La date à vérifier
 * @returns {boolean} - true si la date est dans la semaine en cours
 */
export const isCurrentWeek = (date) => {
  const weekNumber = getWeekNumber(new Date(date))
  const currentWeekNumber = getWeekNumber(new Date())
  return weekNumber === currentWeekNumber
}