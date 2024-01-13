// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/SideBar';
import Home from './Components/Home/Home';
import AjouterOuvrage from './Components/Ouvrage/AjouterOuvrage';
import AjouterAbonne from './Components/Abonne/AjouterAbonne';
import ConsulterOuvrages from './Components/Ouvrage/ConsulterOuvrages';
import ConsulterAbonne from './Components/Abonne/ConsulterAbonne';
import './App.css';

const App = () => {
  const [activeOption, setActiveOption] = useState('');

  return (
    <Router>
      <div className="app">
        <Sidebar activeOption={activeOption} setActiveOption={setActiveOption} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ajouter-ouvrage" element={<AjouterOuvrage />} />
            <Route path="/ajouter-abonne" element={<AjouterAbonne />} />
            <Route path="/consulter-ouvrages" element={<ConsulterOuvrages />} />
            <Route path="/consulter-abonne" element={<ConsulterAbonne />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
