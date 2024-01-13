
import React, { useState } from 'react';
import EmprunterPopup from './EmprunterOuvragePopup';

const AbonneCard = ({ abonne }) => {
  const [buttonText, setButtonText] = useState(abonne.ouvrage ? 'Rendre Ouvrage' : 'Emprunter Ouvrage');
  const [showPopup, setShowPopup] = useState(false);

  const getUserAvatar = () => {
    const gender = abonne.cin % 2 === 0 ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${gender}/${abonne.cin}.jpg`;
  };

  const handleButtonClick = () => {
    if (abonne.ouvrage) {
      rendreOuvrage(abonne.cin);
    } else {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const rendreOuvrage = (cin) => {
    fetch(`http://localhost:8080/BibliothequeWEB1/rendre/${cin}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to render ouvrage');
        }
        setButtonText('Emprunter Ouvrage');
        console.log(`Ouvrage rendu by ${cin}`);
      })
      .catch(error => {
        console.error('Error rendering ouvrage:', error);
      });
  };

  const emprunterOuvrage = (cin, title) => {
    fetch(`http://localhost:8080/BibliothequeWEB1/emprunter/${title}/${cin}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to emprunter ouvrage');
        }
        console.log(`Ouvrage emprunté by ${cin}`);
      })
      .catch(error => {
        console.error('Error emprunter ouvrage:', error);
      });
  };

  return (
    <div className="abonne-card">
      <img src={getUserAvatar()} className="imageInCardd" alt={abonne.nom} />
      <h3>{abonne.nom}</h3>
      <p>CIN: {abonne.cin}</p>
      <p>Subscription Number: {abonne.numAbonnement}</p>

      {abonne.ouvrage && buttonText === 'Rendre Ouvrage' && (
        <p>Ouvrage: {abonne.ouvrage.titre}</p>
      )}

      <button onClick={handleButtonClick} className="bn632-hover bn26">
        {buttonText}
      </button>

      {showPopup && (
        <EmprunterPopup
          onEmprunterSubmit={(title) => emprunterOuvrage(abonne.cin, title)}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default AbonneCard;
