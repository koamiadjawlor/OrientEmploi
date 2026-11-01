import { useEffect, useState } from "react";
import { api } from "./services/api";
import OfferList from "./components/OfferList";
import FilterBar from "./components/FilterBar";
import type { Offre } from "./components/OfferCard";

function App() {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('orientemploi_favoris');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('orientemploi_favoris', JSON.stringify(favorites));
  }, [favorites]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  // NOUVEAU : Clé pour forcer la barre de recherche à se vider
  const [resetKey, setResetKey] = useState(0);
  
  const fetchOffres = () => {
    const queryParams = new URLSearchParams();
    if (filters && filters.q) queryParams.append('q', filters.q);
    if (filters && filters.domaine) queryParams.append('domaine', filters.domaine);
    if (filters && filters.region) queryParams.append('region', filters.region);
    if (filters && filters.salaireMin) queryParams.append('salaireMin', filters.salaireMin);

    api.get(`/offres?${queryParams.toString()}`)
      .then(res => setOffres(res.data.data))
      .catch(err => console.error("Erreur de chargement:", err));
  };

  useEffect(() => {
    fetchOffres();
  }, [filters]);

  const handleToggleFavorite = (id: number) => {
    setFavorites(prevFavs => 
      prevFavs.includes(id) ? prevFavs.filter(favId => favId !== id) : [...prevFavs, id] 
    );
  };

  // NOUVEAU : Fonction pour tout remettre à zéro
  const handleReset = () => {
    setFilters({}); // Annule les filtres API
    setShowFavoritesOnly(false); // Quitte la vue favoris
    setResetKey(prev => prev + 1); // Vide les champs de texte
  };

  const offresAffichees = showFavoritesOnly 
    ? offres.filter(offre => favorites.includes(offre.id)) 
    : offres;

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '50px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <header style={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', 
        padding: '40px 20px', 
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>OrientEmploi</h1>
            <p style={{ margin: '10px 0 0 0', color: '#bfdbfe', fontSize: '1.1rem' }}>
              Trouvez votre prochaine opportunité professionnelle ou de formation.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* NOUVEAU : Bouton Accueil */}
            <button 
              onClick={handleReset}
              style={{
                background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.4)',
                padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s'
              }}
            >
              🏠 Accueil
            </button>

            <button 
              onClick={() => setShowHelp(!showHelp)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.4)',
                padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s'
              }}
            >
              {showHelp ? '✖ Fermer' : '❓ Aide'}
            </button>
          </div>
        </div>
      </header>
      
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <section>
          {showHelp && (
            <div style={{ 
              backgroundColor: '#eff6ff', padding: '20px', borderRadius: '12px', 
              border: '1px solid #bfdbfe', marginBottom: '30px', color: '#1e3a8a',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>💡 Guide d'utilisation</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                <li><strong>Rechercher :</strong> Utilisez la barre blanche ci-dessous pour filtrer par mot-clé, domaine, région ou salaire.</li>
                <li><strong>Sauvegarder :</strong> Cliquez sur "☆ Ajouter" pour mettre une offre de côté.</li>
                <li><strong>Retrouver vos favoris :</strong> Cliquez sur "★ Favoris" au-dessus de la liste pour ne voir que vos offres sauvegardées.</li>
                <li><strong>Réinitialiser :</strong> Cliquez sur "🏠 Accueil" en haut pour vider vos recherches et revenir à la page principale.</li>
              </ul>
            </div>
          )}

          {/* NOUVEAU : La propriété key={resetKey} permet de vider les champs */}
          <FilterBar key={resetKey} onFilterChange={setFilters} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', marginTop: '40px' }}>
            <h2 style={{ margin: 0, color: '#1f2937', fontSize: '1.5rem' }}>
              Offres disponibles <span style={{ color: '#6b7280', fontSize: '0.8em', fontWeight: 'normal' }}>({offresAffichees.length})</span>
            </h2>
            
            <button 
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={{ 
                fontSize: '0.95em', color: showFavoritesOnly ? '#92400e' : '#6b7280', 
                background: showFavoritesOnly ? '#fef3c7' : '#ffffff', 
                padding: '8px 16px', borderRadius: '20px', 
                border: showFavoritesOnly ? '1px solid #fde68a' : '1px solid #e5e7eb', 
                cursor: 'pointer', fontWeight: '600',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <span style={{ color: showFavoritesOnly ? '#d97706' : '#9ca3af', fontSize: '1.2em' }}>★</span>
              {favorites.length} Favoris {showFavoritesOnly ? '(Actif)' : ''}
            </button>
          </div>
          
          <OfferList offres={offresAffichees} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        </section>
      </main>
    </div>
  );
}

export default App;