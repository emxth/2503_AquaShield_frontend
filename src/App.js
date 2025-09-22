import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css' // Tailwind CSS is imported
import Hero from './components/Hero';
import Header from './components/Header';
import Footer from './components/Footer';
import SpeciesDashboard from './SpeciesManagement/speciesDashboard.js';
import AddSpecies from './SpeciesManagement/addSpecies.js';
import ViewAllSpecies from './SpeciesManagement/viewAllSpecies.js';
import ViewOneSpecies from './SpeciesManagement/viewOneSpecies.js';
import SpeciesAddRequest from './SpeciesManagement/speciesAddRequest.js';
import AddNewSpeciesByRequest from './SpeciesManagement/addNewSpeciesByRequest.js';
import AddNewSpeciesRequest from './SpeciesManagement/addSpeciesReqForm.js';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Hero />} />

          {/* species Managemnt */}
          <Route path="/speciesDashboard" element={<SpeciesDashboard />} />
          <Route path="/AddSpecies" element={<AddSpecies />} />
          <Route path="/viewAllSpecies" element={<ViewAllSpecies />} />
          <Route path="/viewOneSpecies/:id" element={<ViewOneSpecies />} />
          <Route path="/SpeciesAddRequest" element={<SpeciesAddRequest />} />
          <Route path="/AddNewSpeciesByRequest/:id" element={<AddNewSpeciesByRequest />} />
          <Route path="/AddSpeciesRequest" element={<AddNewSpeciesRequest />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;