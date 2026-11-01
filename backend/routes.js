import express from 'express';
import { readOffres } from './repository.js';

const router = express.Router();

// GET /api/offres
router.get('/offres', async (req, res) => {
    try {
        let offres = await readOffres();
        const { domaine, region, salaireMin, q, page = 1, limite = 10 } = req.query;

        if (domaine) offres = offres.filter(o => o.domaine === domaine);
        if (region) offres = offres.filter(o => o.region === region);
        if (salaireMin) offres = offres.filter(o => o.salaire_horaire >= Number(salaireMin));
        if (q) {
            const searchTerm = q.toLowerCase();
            offres = offres.filter(o => 
                (o.titre && o.titre.toLowerCase().includes(searchTerm)) || 
                (o.organisation && o.organisation.toLowerCase().includes(searchTerm))
            );
        }

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limite, 10);
        const paginatedOffres = offres.slice((pageNum - 1) * limitNum, pageNum * limitNum);

        res.status(200).json({
            data: paginatedOffres,
            meta: { total: offres.length, page: pageNum, limite: limitNum }
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// GET /api/filtres
router.get('/filtres', async (req, res) => {
    try {
        const offres = await readOffres();
        const domaines = [...new Set(offres.map(o => o.domaine).filter(Boolean))];
        const regions = [...new Set(offres.map(o => o.region).filter(Boolean))];
        const modalites = [...new Set(offres.map(o => o.modalite).filter(Boolean))];

        res.status(200).json({ domaines, regions, modalites });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// 👈 LA LIGNE CRUCIALE À NE PAS OUBLIER :
export default router;