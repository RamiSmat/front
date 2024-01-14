import React, { useState } from 'react';
import ModifierOuvragePopup from './ModifierOuvragePopup';

const OuvrageCard = ({ ouvrage, onDeleteClick }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDeleteClick = () => {
    onDeleteClick(ouvrage.titre);
  };

  const handleModifierClick = () => {
    setIsPopupOpen(true);
  };

  const handleUpdateOuvrage = async (updatedOuvrage) => {
    try {
      const response = await fetch(`http://localhost:8080/BibliothequeWEB1/${ouvrage.titre}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOuvrage),
      });
  
      if (response.ok) {
        console.log(`Ouvrage with titre ${ouvrage.titre} updated successfully`);
  
        // Handle the updated data as needed (update state, etc.)
        // ...
  
        // Close the popup after updating
        setIsPopupOpen(false);
      } else {
        throw new Error('Failed to update ouvrage');
      }
    } catch (error) {
      console.error('Error updating ouvrage:', error);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const getRandomBookImage = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/200/300?random=${randomNumber}`;
  };

  return (
    <div className="abonne-card">
      <img src={getRandomBookImage()} className="imageInCard" alt={ouvrage.titre} />
      <h3>{ouvrage.titre}</h3>
      <p>Date Creation: {ouvrage.dateCreation}</p>
      <p>
        Disponible: {ouvrage.exist ? <p className='Oui'><div className='OuiDiv'>Oui</div></p> :
          <p className='Oui'><div className='NonDiv'>Non</div></p>}
      </p>
      <button onClick={handleDeleteClick} className="bn632-hover bn26">
        Supprimer Ouvrage
      </button>
      <button onClick={handleModifierClick} className="bn632-hover bn26">
        Modifier Ouvrage
      </button>

      {isPopupOpen && (
        <ModifierOuvragePopup ouvrage={ouvrage} onUpdateClick={handleUpdateOuvrage} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default OuvrageCard;
