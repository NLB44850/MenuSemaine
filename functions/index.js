const {onDocumentCreated} = require('firebase-functions/v2/firestore')
const {setGlobalOptions} = require('firebase-functions/v2')
const {defineSecret} = require('firebase-functions/params')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

// Définir le secret pour le mot de passe Gmail
const gmailAppPassword = defineSecret('GMAIL_APP_PASSWORD')

// Configurer la région européenne pour toutes les fonctions
setGlobalOptions({region: 'europe-west1'})

admin.initializeApp()

const db = admin.firestore()

/**
 * Fonction Cloud déclenchée automatiquement quand un nouveau menu est créé
 * Envoie un email à tous les abonnés de l'établissement
 */
exports.envoyerEmailNouveauMenu = onDocumentCreated(
  {
    document: 'menus/{menuId}',
    database: '(default)',
    region: 'europe-west1',
    secrets: [gmailAppPassword] // Accès au secret
  },
  async (event) => {
    const snap = event.data
    if (!snap) {
      console.log('No data associated with the event')
      return
    }
    const menu = snap.data()
    const etablissementId = menu.etablissementId

    console.log(`📧 Nouveau menu publié pour ${etablissementId}`)

    // Configuration du transporteur SMTP avec le secret
    const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // ← Gmail
  port: 587,
  secure: false,
  auth: {
    user: 'nleberre5@gmail.com', // ← Votre Gmail
    pass: gmailAppPassword.value(),
  },
})



    try {
      // Récupérer tous les abonnés actifs de cet établissement
      const abonnesSnapshot = await db
        .collection('abonnes')
        .where('etablissementId', '==', etablissementId)
        .where('active', '==', true)
        .get()

      if (abonnesSnapshot.empty) {
        console.log('ℹ️  Aucun abonné trouvé pour cet établissement')
        return null
      }

      console.log(`📬 ${abonnesSnapshot.size} abonné(s) trouvé(s)`)

      // Préparer le contenu de l'email
      const semaine = formatWeekRange(menu.dateDebut, menu.dateFin)
      let contenuMenu = ''

      if (menu.type === 'photo' && menu.photoUrl) {
        contenuMenu = `
          <div style="text-align: center; margin: 20px 0;">
            <img src="${menu.photoUrl}" alt="Menu de la semaine" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
          </div>
        `
      } else if (menu.type === 'texte' && menu.menuTexte) {
        contenuMenu = '<div style="margin: 20px 0;">'
        const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']

        jours.forEach((jour) => {
          if (menu.menuTexte[jour] && menu.menuTexte[jour].trim()) {
            contenuMenu += `
              <div style="margin-bottom: 15px; padding: 15px; background: #f3f4f6; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <h3 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">
                  ${capitalize(jour)}
                </h3>
                <div style="color: #4b5563; line-height: 1.6;">
                  ${menu.menuTexte[jour].replace(/\n/g, '<br/>')}
                </div>
              </div>
            `
          }
        })

        contenuMenu += '</div>'
      }

      // URL du menu public
      const lienMenu = `https://menusemaine-dad56.web.app/ecole/${etablissementId}`

      // Envoyer un email à chaque abonné avec nodemailer
      const emailPromises = []

      abonnesSnapshot.forEach((doc) => {
        const abonne = doc.data()
        const lienDesinscription = `https://menusemaine-dad56.web.app/unsubscribe?token=${abonne.unsubscribeToken}&email=${encodeURIComponent(abonne.email)}`

        const htmlContent = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau menu disponible</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                    <!-- En-tête -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Easy Cantine</h1>
                        <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 14px;">Menu de cantine scolaire</p>
                      </td>
                    </tr>

                    <!-- Contenu -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 24px;">Nouveau menu disponible !</h2>
                        <p style="color: #6b7280; font-size: 18px; margin: 0 0 20px 0; font-weight: 500;">${semaine}</p>

                        ${contenuMenu}

                        <div style="text-align: center; margin-top: 30px;">
                          <a href="${lienMenu}" style="display: inline-block; padding: 14px 32px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                            Voir le menu complet
                          </a>
                        </div>
                      </td>
                    </tr>

                    <!-- Pied de page -->
                    <tr>
                      <td style="padding: 20px 30px; background: #f3f4f6; text-align: center;">
                        <p style="margin: 0 0 10px 0; font-size: 12px; color: #6b7280;">
                          Vous recevez cet email car vous êtes abonné aux notifications de menu de cet établissement.
                        </p>
                        <p style="margin: 0; font-size: 12px;">
                          <a href="${lienDesinscription}" style="color: #3b82f6; text-decoration: none;">Se désabonner</a>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `

        // Envoyer l'email directement avec nodemailer
        const emailPromise = transporter.sendMail({
        from: '"EasyCantine" <nleberre5@gmail.com>', // ← EasyCantine avec Gmail
          to: abonne.email,
          subject: `📅 Nouveau menu : ${semaine}`,
          html: htmlContent,
        })

        emailPromises.push(emailPromise)
      })

      await Promise.all(emailPromises)
      console.log(`✅ ${emailPromises.length} email(s) envoyé(s) avec succès`)

      return null
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi des emails:', error)
      return null
    }
  })

/**
 * Fonctions utilitaires
 */
function formatWeekRange(dateDebut, dateFin) {
  const debut = new Date(dateDebut)
  const fin = new Date(dateFin)

  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ]

  const jourDebut = debut.getDate()
  const jourFin = fin.getDate()
  const mois = months[fin.getMonth()]
  const annee = fin.getFullYear()

  return `Semaine du ${jourDebut} au ${jourFin} ${mois} ${annee}`
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
