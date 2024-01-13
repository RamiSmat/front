// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeOption, setActiveOption }) => {
  return (
  <div  >
      <div className="sidebar">
            <h1 className="sidebar-title">Bibliotheque</h1>
            <Link
              to="/"
              className={`sidebar-link ${activeOption === 'Home' ? 'active' : ''}`}
              onClick={() => setActiveOption('Home')}
            >
              Home
            </Link>
            <Link
              to="/ajouter-ouvrage"
              className={`sidebar-link ${activeOption === 'Ajouter Ouvrage' ? 'active' : ''}`}
              onClick={() => setActiveOption('Ajouter Ouvrage')}
            >
              Ajouter Ouvrage
            </Link>
            <Link
              to="/consulter-ouvrages"
              className={`sidebar-link ${activeOption === 'Consulter Ouvrages' ? 'active' : ''}`}
              onClick={() => setActiveOption('Consulter Ouvrages')}
            >
              Consulter Ouvrages
            </Link>
            <Link
              to="/ajouter-abonne"
              className={`sidebar-link ${activeOption === 'Ajouter Abonné' ? 'active' : ''}`}
              onClick={() => setActiveOption('Ajouter Abonné')}
            >
              Ajouter Abonné
            </Link>
            <Link
              to="/consulter-abonne"
              className={`sidebar-link ${activeOption === 'Consulter Abonnés' ? 'active' : ''}`}
              onClick={() => setActiveOption('Consulter Abonnés')}
            >
              Consulter Abonnés
            </Link>
          </div>
    </div>
    
  );
};

export default Sidebar;
