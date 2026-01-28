/**
 * Utilitaires pour la manipulation des images
 */
 
/**
 * Compresser une image avant l'upload
 * @param {File} file - Le fichier image
 * @param {number} maxWidth - Largeur maximale en pixels
 * @param {number} maxHeight - Hauteur maximale en pixels
 * @param {number} quality - Qualité de compression (0-1)
 * @returns {Promise<Blob>} - L'image compressée
 */
export const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
 
    reader.onload = (e) => {
      const img = new Image()
 
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
 
        // Calculer les nouvelles dimensions en conservant le ratio
        if (width > height) {
          if (width > maxWidth) {
            height = height * (maxWidth / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = width * (maxHeight / height)
            height = maxHeight
          }
        }
 
        canvas.width = width
        canvas.height = height
 
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
 
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Erreur lors de la compression de l\'image'))
            }
          },
          'image/jpeg',
          quality
        )
      }
 
      img.onerror = () => {
        reject(new Error('Erreur lors du chargement de l\'image'))
      }
 
      img.src = e.target.result
    }
 
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'))
    }
 
    reader.readAsDataURL(file)
  })
}
 
/**
 * Valider qu'un fichier est une image
 * @param {File} file - Le fichier à valider
 * @returns {boolean} - true si c'est une image
 */
export const isImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  return validTypes.includes(file.type)
}
 
/**
 * Valider la taille d'un fichier
 * @param {File} file - Le fichier à valider
 * @param {number} maxSizeMB - Taille maximale en Mo
 * @returns {boolean} - true si la taille est valide
 */
export const isValidFileSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}
 
/**
 * Formater la taille d'un fichier pour l'affichage
 * @param {number} bytes - La taille en octets
 * @returns {string} - La taille formatée
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Octets'
 
  const k = 1024
  const sizes = ['Octets', 'Ko', 'Mo', 'Go']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
 
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}