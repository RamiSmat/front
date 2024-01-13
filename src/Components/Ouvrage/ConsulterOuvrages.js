import React, { useState, useEffect } from 'react';
import OuvrageCard from './OuvrageCard';

const ConsulterOuvrages = () => {
  const [ouvrages, setOuvrages] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/BibliothequeWEB1/${searchTitle}`);
        const data = await response.json();
        setOuvrages(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching ouvrages data:', error);
        setOuvrages([]);
      }
    };

    fetchData();
  }, [searchTitle]);
  const handleDeleteOuvrage = async (titre) => {
    try {
      const response = await fetch(`http://localhost:8080/BibliothequeWEB1/${encodeURIComponent(titre)}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Ouvrage with titre ${titre} deleted successfully`);
        
        // Update the state to remove the deleted ouvrage
        setOuvrages(prevOuvrages => prevOuvrages.filter(ouvrage => ouvrage.titre !== titre));
      } else {
        throw new Error('Failed to delete ouvrage');
      }
    } catch (error) {
      console.error('Error deleting ouvrage:', error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  
  };

  return (
    <div>
      <div className="wide-container">
        <h2>Consulter Ouvrages</h2>
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Recherche Ouvrage"
            value={searchTitle}
            onChange={handleSearchChange}
          />
          
        </form>
      </div>
      <div className="abonne-list">
        {ouvrages.map((ouvrage) => (
          <OuvrageCard key={ouvrage.id} ouvrage={ouvrage}  onDeleteClick={handleDeleteOuvrage} />
        ))}
      </div>
    </div>
  );
};

export default ConsulterOuvrages;
