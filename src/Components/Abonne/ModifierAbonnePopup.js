import React, { useState } from 'react';

const ModifierAbonnePopup = ({ abonne, onUpdateClick, onClose }) => {
  const [newNom, setNewNom] = useState(abonne.nom);
  const [newNumAbonnement, setNewNumAbonnement] = useState(abonne.numAbonnement);

  const handleUpdateClick = () => {
    const updatedAbonne = {
      nom: newNom,
      numAbonnement: newNumAbonnement,
    };
    onUpdateClick(updatedAbonne);
  };

  return (
    <div className="emprunter-popup">
      <div className="emprunter-popup-content">
        <h2>Modifier Abonné</h2>
        <label>Nom:</label>
        <input type="text" value={newNom} onChange={(e) => setNewNom(e.target.value)} />
        <label>Numéro Abonnement:</label>
        <input type="text" value={newNumAbonnement} onChange={(e) => setNewNumAbonnement(e.target.value)} />
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

export default ModifierAbonnePopup;
