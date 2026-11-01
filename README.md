# OrientEmploi

OrientEmploi est une application web qui regroupe des offres d'emploi et de formations. On peut chercher une offre, filtrer les résultats, mettre des offres en favoris et ouvrir le lien pour postuler.

Projet en binôme : frontend React (Vite, TypeScript), backend Node.js avec Express, données dans un fichier JSON.

## Fonctionnalités

- Recherche par mot-clé (titre ou organisation).
- Filtres par domaine, région, modalité (Présentiel, Télétravail, Hybride) et salaire horaire minimum.
- Bouton « Effacer » pour remettre tous les filtres à zéro.
- Favoris conservés dans le navigateur (`localStorage`), même après un rechargement de la page.
- Bouton « Postuler maintenant » qui ouvre le lien de l'offre.
- Affichage de la date limite et du niveau demandé.

## Prérequis

- [Node.js](https://nodejs.org/) version 20 ou plus récente
- npm (installé avec Node.js)

Pour vérifier :

```bash
node -v
npm -v
```

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/BryanOnadja/OrientEmploi.git
cd OrientEmploi
```

Installer le backend :

```bash
cd backend
npm install
cd ..
```

Installer le frontend :

```bash
cd frontend
npm install
cd ..
```

## Lancement

Il faut deux terminaux ouverts en même temps. Le backend doit être démarré **avant** d'ouvrir le frontend.

### 1. Backend (terminal 1)

```bash
cd backend
npm start
```

Le serveur démarre sur http://localhost:3001 et affiche :

```
Le serveur de OrientEmploi est démarré sur http://localhost:3001
```

Pour redémarrer automatiquement à chaque modification du code, utiliser `npm run dev` (nodemon).

### 2. Frontend (terminal 2)

```bash
cd frontend
npm run dev
```

Ouvrir l'adresse affichée par Vite, normalement http://localhost:5173.

Pour arrêter un serveur, faire `Ctrl + C` dans son terminal.

### Changer l'adresse de l'API (facultatif)

Par défaut, le frontend appelle `http://localhost:3001/api`. Pour utiliser une autre adresse, créer un fichier `frontend/.env` :

```
VITE_API_URL=http://localhost:3001/api
```

## Endpoints de l'API

Adresse de base : `http://localhost:3001/api`

| Méthode | Route | Description |
| --- | --- | --- |
| GET | `/api/offres` | Liste des offres, avec filtres et pagination |
| GET | `/api/filtres` | Valeurs disponibles pour les listes de filtres |

### GET /api/offres

Paramètres facultatifs :

| Paramètre | Type | Description |
| --- | --- | --- |
| `q` | texte | Recherche dans le titre et l'organisation |
| `domaine` | texte | Domaine exact (ex. `Construction`, `TI`, `Santé`) |
| `region` | texte | Région exacte (ex. `Montréal`, `Montérégie`) |
| `modalite` | texte | Modalité exacte (`Présentiel`, `Télétravail` ou `Hybride`) |
| `salaireMin` | nombre | Salaire horaire minimum |
| `page` | nombre | Numéro de page (par défaut 1) |
| `limite` | nombre | Offres par page (par défaut 10) |

Exemple :

```
GET /api/offres?domaine=Construction&salaireMin=20&limite=5
```

Réponse (200) :

```json
{
  "data": [
    {
      "id": 1,
      "type": "emploi",
      "titre": "Journalier de chantier",
      "organisation": "Construction Boréal inc.",
      "region": "Montérégie",
      "ville": "Longueuil",
      "domaine": "Construction",
      "niveau": "Sans diplôme",
      "modalite": "Présentiel",
      "salaire_horaire": 24.5,
      "duree_semaines": null,
      "date_publication": "2026-10-05",
      "date_limite": "2026-11-15",
      "competences": ["sécurité de chantier", "manutention"],
      "description": "Nettoyage du chantier, aide aux métiers spécialisés.",
      "lien": "https://exemple.org/offres/1"
    }
  ],
  "meta": { "total": 1, "page": 1, "limite": 5 }
}
```

Le champ `meta.total` donne le nombre d'offres qui correspondent aux filtres, avant la pagination. Les offres de type `formation` ont une `duree_semaines` et pas de `salaire_horaire`.

### GET /api/filtres

Réponse (200) :

```json
{
  "domaines": ["Construction", "TI", "Santé", "Administration"],
  "regions": ["Montérégie", "Montréal", "Capitale-Nationale", "Laval", "Laurentides", "Estrie"],
  "modalites": ["Présentiel", "Télétravail", "Hybride"]
}
```

### Erreurs

En cas de problème de lecture du fichier de données, l'API répond `500` avec :

```json
{ "error": "Erreur serveur." }
```

## Structure du projet

```
OrientEmploi/
├── backend/
│   ├── data/offres.json    # Données des offres
│   ├── index.js            # Serveur Express (port 3001)
│   ├── routes.js           # Routes /api/offres et /api/filtres
│   ├── repository.js       # Lecture et écriture du fichier JSON
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # FilterBar, OfferList, OfferCard
    │   ├── services/api.ts # Client Axios
    │   ├── App.tsx         # Composant principal
    │   └── main.tsx
    └── package.json
```

## Dépannage

| Problème | Cause probable | Solution |
| --- | --- | --- |
| `npm install` échoue avec `ERESOLVE` dans `frontend` | Conflit de versions TypeScript | Vérifier que `typescript` est à `~5.9.0` dans `frontend/package.json` |
| La page s'ouvre, mais la liste est vide | Le backend n'est pas démarré | Lancer `npm start` dans `backend` |
| `EADDRINUSE` au lancement du backend | Le port 3001 est déjà utilisé | Fermer l'autre programme qui l'utilise |
| `Cannot find module` ou `vite introuvable` | Dépendances non installées | Refaire l'installation dans le dossier concerné |

## Technologies

- Frontend : React 19, TypeScript, Vite, Axios
- Backend : Node.js (modules ES), Express 5, CORS
- Données : fichier JSON (`backend/data/offres.json`)
