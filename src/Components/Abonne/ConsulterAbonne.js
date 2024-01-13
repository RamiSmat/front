
import React, { useState, useEffect } from 'react';
import AbonneCard from './AbonneCard';

const ConsulterAbonne = () => {
  const [abonnes, setAbonnes] = useState([]);
  const [searchCin, setSearchCin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/BibliothequeWEB1/abonnes/${searchCin}`);
        const data = await response.json();
        setAbonnes(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching abonne data:', error);
        setAbonnes([]);
      }
    };

    fetchData();
  }, [searchCin]);

  const handleSearchChange = (event) => {
    setSearchCin(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
   
  };

  return (
    <div>
      <div className="wide-container">
        <h2>Consulter Abonnés</h2>
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Recherche Abonné par CIN"
            value={searchCin}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="abonne-list">
        {abonnes.map((abonne) => (
          <AbonneCard key={abonne.cin} abonne={abonne} />
        ))}
      </div>
    </div>
  );
};

export default ConsulterAbonne;
