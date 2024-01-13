import React, { useState } from 'react';

const AjouterAbonne = () => {
  const [abonneData, setAbonneData] = useState({
    numAbonnement: '',
    cin: '',
    nom: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbonneData({
      ...abonneData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting abonne data:', abonneData);

    try {
      const response = await fetch('http://localhost:8080/BibliothequeWEB1/addAbonne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(abonneData),
      });

      console.log('Response:', response);

      if (response.ok) {
        // Abonne added successfully
        console.log('Abonne added successfully');
      } else {
        // Handle errors
        console.error('Failed to add abonne');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="ajouter-ouvrage-container">
       <div className="DivForAddIcon"><i className="gg-file-add glyphiconn"></i></div> 
      <h2>Ajouter Abonne</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numAbonnement">Numéro d'abonnement:</label>
        <input
          type="text"
          id="numAbonnement"
          name="numAbonnement"
          value={abonneData.numAbonnement}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="cin">Carte d'identité:</label>
        <input
          type="text"
          id="cin"
          name="cin"
          value={abonneData.cin}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="nom">Nom Complet:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={abonneData.nom}
          onChange={handleInputChange}
          required
        />

        <div className='addButton'><button className='bn632-hover bn26' type="submit">Add Abonne</button></div>
      </form>
    </div>
  );
};

export default AjouterAbonne;
