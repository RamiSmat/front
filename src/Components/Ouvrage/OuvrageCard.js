import React from 'react';

const OuvrageCard = ({ ouvrage }) => {
  const getRandomBookImage = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/200/300?random=${randomNumber}`;
  };

  return (
    <div className="abonne-card">
      <img src={getRandomBookImage()} className="imageInCard" alt={ouvrage.titre} />
      <h3>{ouvrage.titre}</h3>
      <p>Date Creation: {ouvrage.dateCreation}</p>
      <p>Disponible: {ouvrage.exist ? <p className='Oui'>
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
  );
};

export default OuvrageCard;
