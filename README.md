# MenuSemaine
 
Application web pour la publication et la consultation des menus de cantine scolaire en Loire-Atlantique.
 
## Description
 
MenuSemaine est une solution simple et efficace permettant aux gestionnaires d'établissements scolaires (écoles, crèches) de publier facilement les menus de la semaine, et aux parents de les consulter sans inscription.
 
### Fonctionnalités principales
 
**Pour les gestionnaires :**
- Authentification sécurisée avec Firebase
- Publication de menus (photo ou texte jour par jour)
- Historique des 4 dernières semaines
- Interface intuitive et responsive
 
**Pour les parents :**
- Consultation publique sans inscription
- Affichage mobile-friendly
- Impression et partage de liens
- Mise à jour en temps réel
 
## Stack Technique
 
- **Frontend** : React 18 + Vite
- **Backend** : Firebase (Firestore + Storage + Authentication)
- **Styling** : Tailwind CSS
- **Routing** : React Router v6
- **Déploiement** : Firebase Hosting
 
## Prérequis
 
Avant de commencer, assurez-vous d'avoir installé :
 
- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- Un compte [Firebase](https://firebase.google.com/)
 
## Installation
 
### 1. Cloner le dépôt
 
```bash
git clone https://github.com/NLB44850/MenuSemaine.git
cd MenuSemaine
```
 
### 2. Installer les dépendances
 
```bash
npm install
```
 
### 3. Configuration Firebase
 
#### Créer un projet Firebase
 
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Ajouter un projet"
3. Donnez un nom à votre projet (ex: "MenuSemaine")
4. Désactivez Google Analytics si non nécessaire
5. Cliquez sur "Créer le projet"
 
#### Activer les services Firebase
 
**a) Authentication :**
1. Dans le menu latéral, cliquez sur "Authentication"
2. Cliquez sur "Commencer"
3. Activez le fournisseur "Email/Password"
4. Cliquez sur "Enregistrer"
 
**b) Firestore Database :**
1. Dans le menu latéral, cliquez sur "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Sélectionnez "Commencer en mode test" (nous configurerons les rules plus tard)
4. Choisissez une région proche (ex: europe-west1 pour la France)
5. Cliquez sur "Activer"
 
**c) Storage :**
1. Dans le menu latéral, cliquez sur "Storage"
2. Cliquez sur "Commencer"
3. Acceptez les règles de sécurité par défaut
4. Choisissez la même région que Firestore
5. Cliquez sur "Terminé"
 
#### Récupérer les identifiants Firebase
 
1. Cliquez sur l'icône de configuration (⚙️) puis "Paramètres du projet"
2. Faites défiler jusqu'à "Vos applications"
3. Cliquez sur l'icône web (</>) pour créer une application web
4. Donnez un nom à l'application (ex: "MenuSemaine Web")
5. Cochez "Configurer Firebase Hosting" (optionnel)
6. Cliquez sur "Enregistrer l'application"
7. Copiez les valeurs de configuration
 
#### Configurer les variables d'environnement
 
1. Copiez le fichier `.env.example` en `.env` :
 
```bash
cp .env.example .env
```
 
2. Ouvrez le fichier `.env` et remplissez avec vos identifiants Firebase :
 
```env
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_projet_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
```
 
#### Déployer les règles de sécurité Firestore et Storage
 
1. Installez Firebase CLI globalement :
 
```bash
npm install -g firebase-tools
```
 
2. Connectez-vous à Firebase :
 
```bash
firebase login
```
 
3. Initialisez Firebase dans le projet (si pas déjà fait) :
 
```bash
firebase init
```
 
Sélectionnez :
- Firestore
- Storage
- Hosting
 
4. Déployez les règles de sécurité :
 
```bash
firebase deploy --only firestore:rules,storage:rules
```
 
### 4. Créer un compte admin
 
Pour créer le premier compte administrateur :
 
1. Allez dans Firebase Console > Authentication > Users
2. Cliquez sur "Ajouter un utilisateur"
3. Entrez l'email et le mot de passe du gestionnaire
4. Cliquez sur "Ajouter un utilisateur"
 
> **Note** : L'identifiant de l'établissement sera automatiquement généré à partir de l'email (ex: `admin@ecole-test.fr` devient `admin-ecole-test-fr`)
 
## Utilisation en développement
 
### Lancer le serveur de développement
 
```bash
npm run dev
```
 
L'application sera accessible sur [http://localhost:3000](http://localhost:3000)
 
### Structure du projet
 
```
MenuSemaine/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # Images et ressources statiques
│   ├── components/      # Composants React réutilisables
│   │   ├── ErrorMessage.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SuccessMessage.jsx
│   ├── pages/           # Pages principales de l'application
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── HomePage.jsx
│   │   ├── MenuPublic.jsx
│   │   └── NotFound.jsx
│   ├── services/        # Services Firebase et contextes
│   │   ├── AuthContext.jsx
│   │   └── firebase.js
│   ├── utils/           # Fonctions utilitaires
│   │   ├── dateUtils.js
│   │   ├── imageUtils.js
│   │   └── stringUtils.js
│   ├── App.jsx          # Composant principal avec routing
│   ├── index.css        # Styles Tailwind CSS
│   └── main.jsx         # Point d'entrée React
├── .env.example         # Exemple de configuration
├── .gitignore
├── firebase.json        # Configuration Firebase Hosting
├── firestore.rules      # Règles de sécurité Firestore
├── firestore.indexes.json
├── storage.rules        # Règles de sécurité Storage
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```
 
## Guide d'utilisation
 
### Pour les gestionnaires
 
1. **Se connecter**
   - Allez sur `/admin`
   - Entrez vos identifiants
   - Cliquez sur "Se connecter"
 
2. **Publier un menu**
   - Choisissez le type : "Saisie texte" ou "Upload photo"
   - **Si photo** : Cliquez pour sélectionner une image ou glissez-déposez
   - **Si texte** : Remplissez les menus pour chaque jour de la semaine
   - Cliquez sur "Publier le menu"
 
3. **Consulter l'historique**
   - L'historique des 4 dernières semaines s'affiche à droite
   - Vous pouvez supprimer un ancien menu en cliquant sur l'icône de corbeille
 
4. **Partager le lien**
   - Le lien pour les parents est affiché dans l'encadré bleu
   - Copiez et partagez ce lien avec les familles
 
### Pour les parents
 
1. **Accéder au menu**
   - Utilisez le lien fourni par votre établissement
   - Format : `https://votre-domaine.com/ecole/identifiant-etablissement`
 
2. **Consulter le menu**
   - Le menu de la semaine en cours s'affiche automatiquement
   - Aucune connexion nécessaire
 
3. **Actions disponibles**
   - **Imprimer** : Cliquez sur le bouton "Imprimer" pour obtenir une version papier
   - **Partager** : Cliquez sur "Partager" pour copier le lien
 
## Déploiement en production
 
### Build de l'application
 
```bash
npm run build
```
 
Les fichiers optimisés seront générés dans le dossier `dist/`
 
### Déploiement sur Firebase Hosting
 
1. Si ce n'est pas déjà fait, initialisez Firebase Hosting :
 
```bash
firebase init hosting
```
 
Configuration recommandée :
- Public directory : `dist`
- Configure as single-page app : `Yes`
- Set up automatic builds : `No`
 
2. Construisez l'application :
 
```bash
npm run build
```
 
3. Déployez sur Firebase :
 
```bash
firebase deploy --only hosting
```
 
4. Votre application sera accessible sur :
   - `https://votre-projet.web.app`
   - `https://votre-projet.firebaseapp.com`
 
### Configuration d'un domaine personnalisé
 
1. Dans Firebase Console, allez dans Hosting
2. Cliquez sur "Ajouter un domaine personnalisé"
3. Suivez les instructions pour configurer vos enregistrements DNS
 
## Structure de la base de données
 
### Collection `etablissements`
 
```javascript
{
  id: "auto-généré",
  nom: "École Primaire du Centre",
  slug: "ecole-primaire-du-centre",
  adminEmail: "admin@ecole.fr",
  createdAt: "2025-01-19T10:00:00.000Z"
}
```
 
### Collection `menus`
 
```javascript
{
  id: "auto-généré",
  etablissementId: "admin-ecole-fr",
  semaine: "2025-W03",
  dateDebut: "2025-01-20T00:00:00.000Z",
  dateFin: "2025-01-24T00:00:00.000Z",
  type: "texte", // ou "photo"
 
  // Si type = "photo"
  photoUrl: "https://storage.googleapis.com/...",
 
  // Si type = "texte"
  menuTexte: {
    lundi: "Salade verte\nPoulet rôti\nHaricots verts\nYaourt",
    mardi: "...",
    mercredi: "...",
    jeudi: "...",
    vendredi: "..."
  },
 
  publishedAt: "2025-01-19T10:00:00.000Z",
  publishedBy: "admin@ecole.fr"
}
```
 
## Sécurité
 
Les règles de sécurité sont configurées dans :
- `firestore.rules` : Protection de la base de données
- `storage.rules` : Protection du stockage des images
 
**Points clés :**
- Lecture publique des menus pour tous
- Écriture réservée aux administrateurs authentifiés
- Validation des types de fichiers et tailles
- Protection contre les suppressions non autorisées
 
## Dépannage
 
### Erreur de connexion Firebase
 
Si vous rencontrez des erreurs de connexion :
1. Vérifiez que toutes les variables d'environnement sont correctement définies dans `.env`
2. Assurez-vous que les services Firebase (Auth, Firestore, Storage) sont activés
3. Vérifiez que les règles de sécurité sont déployées
 
### Images ne s'affichent pas
 
1. Vérifiez que Firebase Storage est activé
2. Vérifiez les règles de sécurité dans `storage.rules`
3. Assurez-vous que l'image est bien uploadée (vérifiez dans Firebase Console > Storage)
 
### Menu ne s'affiche pas
 
1. Vérifiez que le menu est publié pour la semaine en cours
2. Vérifiez l'identifiant de l'établissement dans l'URL
3. Regardez la console du navigateur pour les erreurs
 
## Performance et optimisations
 
- **Images** : Compression automatique des photos avant upload (max 1200x1200px, qualité 80%)
- **Code splitting** : Séparation automatique des bundles React et Firebase
- **Lazy loading** : Chargement différé des images
- **Cache** : Headers de cache configurés pour les assets statiques
 
## Accessibilité
 
L'application respecte les standards d'accessibilité :
- Labels appropriés sur tous les champs de formulaire
- Textes alternatifs sur les images
- Navigation au clavier
- Contraste des couleurs conforme WCAG 2.1
- Rôles ARIA appropriés
 
## Support et contribution
 
Pour signaler un bug ou proposer une amélioration :
1. Ouvrez une issue sur GitHub
2. Décrivez le problème ou la fonctionnalité souhaitée
3. Ajoutez des captures d'écran si pertinent
 
## Licence
 
© 2025 MenuSemaine. Tous droits réservés.
 
## Contact
 
Pour toute question ou demande de support, contactez-nous à : contact@menusemaine.fr
 
---
 
Développé avec ❤️ pour les écoles et crèches de Loire-Atlantique