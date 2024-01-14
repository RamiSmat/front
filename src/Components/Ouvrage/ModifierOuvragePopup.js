import React, { useState, useEffect } from 'react';

const ModifierOuvragePopup = ({ ouvrage, onUpdateClick, onClose }) => {
  const [newDateCreation, setNewDateCreation] = useState(ouvrage.dateCreation);

  // Update the displayed dateCreation when ouvrage changes
  useEffect(() => {
    setNewDateCreation(ouvrage.dateCreation);
  }, [ouvrage]);

  const handleUpdateClick = () => {
    const updatedOuvrage = {
      dateCreation: newDateCreation,
      titre: ouvrage.titre,
    };
    onUpdateClick(updatedOuvrage);
  };

  return (
    <div className="emprunter-popup">
      <div className="emprunter-popup-content">
        <h2>Modifier Ouvrage</h2>
        <p>Titre: {ouvrage.titre}</p>
        <label>Date Creation:</label>
        <input
          type="text"
          value={newDateCreation}
          onChange={(e) => setNewDateCreation(e.target.value)}
        />
        <div className="emprunter-popup-buttons">
          <button onClick={handleUpdateClick} className="bn5">
            Modifier
          </button>
          <button onClick={onClose} className="bn5">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifierOuvragePopup;
