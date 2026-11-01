// Pourcentage de code personnel : 80% 
import React from 'react';
import OfferCard from './OfferCard';
import type { Offre } from './OfferCard';

interface OfferListProps {
  offres: Offre[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

const OfferList: React.FC<OfferListProps> = ({ offres, favorites, onToggleFavorite }) => {
  if (offres.length === 0) {
    return <p>Aucune offre ne correspond à vos critères.</p>;
  }

  return (
    <div>
      {offres.map((offre) => (
        <OfferCard 
          key={offre.id} 
          offre={offre} 
          isFavorite={favorites.includes(offre.id)}
          onToggleFavorite={onToggleFavorite} 
        />
      ))}
    </div>
  );
};

export default OfferList;