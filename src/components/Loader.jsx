/**
 * Composant Loader - Affiche un spinner de chargement
 */
const Loader = ({ size = 'medium', message = 'Chargement...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4'
  }
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div
        className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}
        role="status"
        aria-label="Chargement"
      ></div>
      {message && (
        <p className="mt-4 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  )
}
 
export default Loader