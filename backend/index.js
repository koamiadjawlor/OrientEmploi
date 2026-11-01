
// Pourcentage de code personnel : 100%

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes.js';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Autorise le frontend React à communiquer avec ce serveur
app.use(express.json()); // Permet de lire les requêtes contenant du JSON

// Utilisation de nos routes
app.use('/api', apiRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur de OrientEmploi est démarré sur http://localhost:${PORT}`);
});