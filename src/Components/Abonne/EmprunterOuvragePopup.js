import React, { useState, useEffect } from 'react';

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const EmprunterPopup = ({ onEmprunterSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [suggestions, setSuggestions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/BibliothequeWEB1/${title}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Suggestions:', data);
          setSuggestions(data);
        } else {
          console.log('Empty Suggestions');
          setSuggestions({});
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions({});
      }
    };

    if (title.trim() !== '') {
      fetchData();
    } else {
      setSuggestions({});
    }
  }, [title]);

  const handleSubmit = () => {
    if (!isEmptyObject(suggestions)) {
      onEmprunterSubmit(suggestions.titre); 
      setTitle('');
      setSuggestions({});
    }
  };

  useEffect(() => {
    console.log('Is suggestions empty?', isEmptyObject(suggestions));
  }, [suggestions]);

  return (
    <div className="emprunter-popup">
      <div className="emprunter-popup-content">
        <h2>Emprunter Ouvrage</h2>
        <label htmlFor="title">Titre de l'ouvrage:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ecrire le titre exact de l'ouvrage"
        />
        {!isEmptyObject(suggestions) && (
          <div className="suggestions-container">
            <div className="suggestion-card">
              <h3>{suggestions.titre}</h3>
              <p>Date Creation: {suggestions.dateCreation}</p>
              <p>Disponible: {suggestions.exist ? <p className='Oui'>
        <div className='OuiDiv'>
      Oui
      </div>
      </p> :
      <p className='Oui'>
      <div className='NonDiv'>
      Non
      </div>
      </p>
      }</p>
            </div>
          </div>
        )}
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
