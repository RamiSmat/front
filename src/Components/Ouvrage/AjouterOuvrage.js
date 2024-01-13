import React, { useState, useEffect } from 'react';

const AjouterOuvrage = () => {
  const [ouvrageData, setOuvrageData] = useState({
    titre: '',
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOuvrageData({
      ...ouvrageData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('Updated ouvrageData:', ouvrageData);
  }, [ouvrageData]); // Run this effect whenever ouvrageData changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the dateCreation to today's date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // Use prevState to ensure you're updating based on the current state
    setOuvrageData((prevState) => ({
      ...prevState,
      dateCreation: formattedDate,
    }));

    console.log('Submitting ouvrage data:', ouvrageData);

    try {
      const response = await fetch('http://localhost:8080/BibliothequeWEB1/addOuvrage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
            ...ouvrageData,
            dateCreation: formattedDate, // Explicitly convert date to string
          }),
      });

      console.log('Response:', response);

      if (response.ok) {
        // Ouvrage added successfully
        console.log('Ouvrage added successfully');
      } else {
        // Handle errors
        console.error('Failed to add ouvrage');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="ajouter-ouvrage-container">
      <div className="DivForAddIcon">
        <i className="gg-file-add glyphiconn"></i>
      </div>
      <h2>Ajouter Ouvrage</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titre">Titre:</label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={ouvrageData.titre}
          onChange={handleInputChange}
          required
        />

        {/* Add other fields as needed */}

        <div className='addButton'>
          <button className='bn632-hover bn26' type="submit">
            Add Ouvrage
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterOuvrage;
