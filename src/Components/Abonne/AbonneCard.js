import React, { useState } from 'react';
import ModifierAbonnePopup from './ModifierAbonnePopup';
import EmprunterPopup from './EmprunterOuvragePopup';

const AbonneCard = ({ abonne, onDeleteAbonne, onUpdateAbonne }) => {
  const [buttonText, setButtonText] = useState(abonne.ouvrage ? 'Rendre Ouvrage' : 'Emprunter Ouvrage');
  const [showEmprunterPopup, setShowEmprunterPopup] = useState(false);
  const [showModifierPopup, setShowModifierPopup] = useState(false);
  const [isOuvrageTaken, setIsOuvrageTaken] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getUserAvatar = () => {
    const gender = abonne.cin % 2 === 0 ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${gender}/${abonne.cin}.jpg`;
  };

  const handleDeleteButtonClick = () => {
    deleteAbonne(abonne.cin);
  };

  const deleteAbonne = async (cin) => {
    try {
      const response = await fetch(`http://localhost:8080/BibliothequeWEB1/deleteAbonne/${cin}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Abonne with CIN ${cin} deleted successfully`);
        onDeleteAbonne(cin);
      } else {
        throw new Error('Failed to delete abonne');
      }
    } catch (error) {
      console.error('Error deleting abonne:', error);
    }
  };

  const handleButtonClick = () => {
    if (abonne.ouvrage) {
      rendreOuvrage(abonne.cin);
    } else {
      setShowEmprunterPopup(true);
    }
  };

  const handleCloseEmprunterPopup = () => {
    setShowEmprunterPopup(false);
    setIsOuvrageTaken(false);
    setErrorMessage('');
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

  const emprunterOuvrage = async (cin, title) => {
    try {
      const ouvrage = await fetchOuvrageByTitle(title);

      if (ouvrage && ouvrage.exist === true) {
        const response = await fetch(`http://localhost:8080/BibliothequeWEB1/emprunter/${title}/${cin}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log(`Ouvrage emprunté by ${cin}`);
        } else {
          throw new Error('Failed to emprunter ouvrage');
        }
      } else {
        console.log('Ouvrage Déjà pris');
        setIsOuvrageTaken(true);
        setErrorMessage('Ouvrage Déjà pris');
      }
    } catch (error) {
      console.error('Error emprunter ouvrage:', error);
      setIsOuvrageTaken(true);
      setErrorMessage('Error emprunter ouvrage');
    }
  };

  const handleCloseModifierPopup = () => {
    setShowModifierPopup(false);
  };

  const handleUpdateAbonne = async (updatedAbonne) => {
    try {
      const response = await fetch(`http://localhost:8080/BibliothequeWEB1/updateAbonne/${abonne.cin}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAbonne),
      });

      if (response.ok) {
        console.log(`Abonne with CIN ${abonne.cin} updated successfully`);

        // Update the state or perform other actions as needed
        onUpdateAbonne(abonne.cin, updatedAbonne);

        // Close the popup after updating
        setShowModifierPopup(false);
      } else {
        throw new Error('Failed to update abonne');
      }
    } catch (error) {
      console.error('Error updating abonne:', error);
    }
  };

  const fetchOuvrageByTitle = async (title) => {
    try {
      const response = await fetch(`http://localhost:8080/BibliothequeWEB1/${encodeURIComponent(title)}`);
      if (response.ok) {
        const ouvrage = await response.json();
        return ouvrage;
      } else {
        console.log(`Error fetching ouvrage for title ${title}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching ouvrage:', error);
      return null;
    }
  };

  return (
    <div className="abonne-card">
      <img src={getUserAvatar()} className="imageInCardd" alt={abonne.nom} />
      <h3>{abonne.nom}</h3>
      <p>CIN: {abonne.cin}</p>
      <p>Numéro Abonnement: {abonne.numAbonnement}</p>

      {abonne.ouvrage && buttonText === 'Rendre Ouvrage' && (
        <p>Ouvrage: {abonne.ouvrage.titre}</p>
      )}

      <button onClick={handleButtonClick} className="bn632-hover bn26">
        {buttonText}
      </button>

      <button onClick={() => setShowModifierPopup(true)} className="bn632-hover bn26">
        Modifier Abonne
      </button>

      <button onClick={handleDeleteButtonClick} className="bn632-hover bn26">
        Supprimer Abonne
      </button>

      {showEmprunterPopup && (
        <EmprunterPopup
          onEmprunterSubmit={(title) => emprunterOuvrage(abonne.cin, title)}
          onClose={handleCloseEmprunterPopup}
          isOuvrageTaken={isOuvrageTaken}
          errorMessage={errorMessage}
        />
      )}

      {showModifierPopup && (
        <ModifierAbonnePopup
          abonne={abonne}
          onUpdateClick={handleUpdateAbonne}
          onClose={handleCloseModifierPopup}
        />
      )}
    </div>
  );
};

export default AbonneCard;
