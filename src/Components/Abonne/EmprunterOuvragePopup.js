
import React, { useState } from 'react';

const EmprunterPopup = ({ onEmprunterSubmit, onClose }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    if (title.trim() !== '') {
      onEmprunterSubmit(title);
      setTitle('');
    }
  };

  return (
    <div className="emprunter-popup">
      <div className="emprunter-popup-content">
        <h2>Emprunter Ouvrage</h2>
        <label htmlFor="title">Titre de l'ouvrage:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Ecrire le titre exact de l'ouvrage"
        />
        <div className="emprunter-popup-buttons">
          <button className="bn5" onClick={handleSubmit}>
            Emprunter
          </button>
          <button className="bn5" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmprunterPopup;
