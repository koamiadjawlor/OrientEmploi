import React from 'react';

export interface Offre {
  id: number;
  type: string;
  titre: string;
  organisation: string;
  region: string;
  ville: string;
  domaine: string;
  niveau?: string;
  modalite?: string;
  salaire_horaire?: number | null;
  duree_semaines?: number | null;
  date_publication?: string;
  date_limite?: string;
  competences?: string[];
  description: string;
  lien?: string; 
}

interface OfferCardProps {
  offre: Offre;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offre, isFavorite, onToggleFavorite }) => {
  return (
    <article style={{ 
      background: '#ffffff',
      border: '1px solid #e5e7eb', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '20px', 
      marginBottom: '20px', 
      borderRadius: '12px', 
      position: 'relative'
    }}>
      {/* Bouton Favori */}
      <button 
        onClick={() => onToggleFavorite(offre.id)}
        style={{
          position: 'absolute', top: '20px', right: '20px',
          background: isFavorite ? '#fef3c7' : '#f3f4f6',
          color: isFavorite ? '#d97706' : '#6b7280',
          border: isFavorite ? '1px solid #fde68a' : '1px solid #e5e7eb',
          borderRadius: '20px', padding: '6px 12px', cursor: 'pointer',
          fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'
        }}
      >
        {isFavorite ? '★ Favori' : '☆ Sauvegarder'}
      </button>
      
      {/* Titre et type */}
      <h3 style={{ marginTop: 0, paddingRight: '120px', color: '#111827', fontSize: '1.25rem' }}>
        {offre.titre} 
        <span style={{ 
          fontSize: '0.7em', color: '#3b82f6', fontWeight: 'bold', 
          backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '12px', 
          marginLeft: '10px', textTransform: 'uppercase' 
        }}>
          {offre.type}
        </span>
      </h3>
      
      {/* Grille d'informations avec détails */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', color: '#4b5563', fontSize: '0.95rem', marginTop: '15px' }}>
        <p style={{ margin: 0 }}>🏢 <strong>{offre.organisation}</strong></p>
        <p style={{ margin: 0 }}>📍 {offre.ville}, {offre.region}</p>
        <p style={{ margin: 0 }}>📁 {offre.domaine}</p>
        
        {offre.niveau && (
          <p style={{ margin: 0 }}>🎓 Niveau : {offre.niveau}</p>
        )}
        
        {offre.type === 'emploi' && offre.salaire_horaire && (
          <p style={{ margin: 0, color: '#059669', fontWeight: 'bold' }}>💰 {offre.salaire_horaire} $/h</p>
        )}
        {offre.type === 'formation' && offre.duree_semaines && (
          <p style={{ margin: 0, color: '#7c3aed', fontWeight: 'bold' }}>⏳ {offre.duree_semaines} semaines</p>
        )}
        
        {offre.date_limite && (
          <p style={{ margin: 0, color: '#dc2626', fontSize: '0.85em' }}>📅 Date limite : {offre.date_limite}</p>
        )}
      </div>

      {/* Description */}
      <p style={{ marginTop: '15px', color: '#374151', fontSize: '0.95rem', lineHeight: '1.5' }}>
        {offre.description}
      </p>
      
      {/* Badges de compétences */}
      {offre.competences && offre.competences.length > 0 && (
        <div style={{ marginTop: '15px', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {offre.competences.map((comp, index) => (
              <span key={index} style={{ background: '#f3f4f6', color: '#374151', padding: '4px 12px', borderRadius: '15px', fontSize: '0.85em', fontWeight: '500' }}>
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}

      {/*  Bouton pour postuler directement */}
      {offre.lien && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <a 
            href={offre.lien} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
            }}
          >
            Postuler maintenant ↗
          </a>
        </div>
      )}
    </article>
  );
};

export default OfferCard;