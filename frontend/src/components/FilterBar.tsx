import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [domaines, setDomaines] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [modalites, setModalites] = useState<string[]>([]);
  
  const [q, setQ] = useState('');
  const [domaine, setDomaine] = useState('');
  const [region, setRegion] = useState('');
  const [modalite, setModalite] = useState('');
  const [salaireMin, setSalaireMin] = useState('');

  useEffect(() => {
    api.get('/filtres')
      .then(res => {
        setDomaines(res.data.domaines || []);
        setRegions(res.data.regions || []);
        setModalites(res.data.modalites || []);
      })
      .catch(err => console.error("Erreur de chargement des filtres", err));
  }, []);

  const handleApplyFilters = () => {
    onFilterChange({ q, domaine, region, modalite, salaireMin });
  };

  const handleReset = () => {
    setQ('');
    setDomaine('');
    setRegion('');
    setModalite('');
    setSalaireMin('');
    onFilterChange({});
  };

  const inputStyle = { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #d1d5db', 
    flex: '1', 
    minWidth: '140px', 
    outline: 'none',
    boxSizing: 'border-box' as const
  };

  return (
    <div style={{ 
      marginBottom: '30px', 
      padding: '25px', 
      background: '#ffffff', 
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{ marginTop: 0, color: '#1f2937', marginBottom: '20px', fontSize: '1.2rem' }}>
        🔍 Rechercher des opportunités
      </h3>
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Mot clé (ex: Soudure, React)..." 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          style={inputStyle} 
        />
        
        <select value={domaine} onChange={(e) => setDomaine(e.target.value)} style={{...inputStyle, backgroundColor: 'white'}}>
          <option value="">Tous les domaines</option>
          {domaines.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        
        <select value={region} onChange={(e) => setRegion(e.target.value)} style={{...inputStyle, backgroundColor: 'white'}}>
          <option value="">Toutes les régions</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={modalite} onChange={(e) => setModalite(e.target.value)} style={{...inputStyle, backgroundColor: 'white'}}>
          <option value="">Toutes les modalités</option>
          {modalites.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <input 
          type="number" 
          placeholder="Salaire min ($/h)" 
          value={salaireMin} 
          onChange={(e) => setSalaireMin(e.target.value)} 
          style={{...inputStyle, flex: '0 1 140px'}} 
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleApplyFilters} 
          style={{ 
            flex: '2',
            padding: '12px 24px', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '1rem',
            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
          }}
        >
          Appliquer les filtres
        </button>

        <button 
          onClick={handleReset} 
          style={{ 
            flex: '1',
            padding: '12px 16px', 
            background: '#f3f4f6', 
            color: '#4b5563', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: '600', 
            fontSize: '0.95rem'
          }}
        >
          Effacer
        </button>
      </div>
    </div>
  );
};

export default FilterBar;