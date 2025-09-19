import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';
import SpeciesDashboard from './SpeciesManagement/speciesDashboard.js';
import AddSpecies from './SpeciesManagement/addSpecies.js';
import ViewAllSpecies from './SpeciesManagement/viewAllSpecies.js';
import ViewOneSpecies from './SpeciesManagement/viewOneSpecies.js';
import SpeciesAddRequest from './SpeciesManagement/speciesAddRequest.js';
import AddNewSpeciesByRequest from './SpeciesManagement/addNewSpeciesByRequest.js';
import AddNewSpeciesRequest from './SpeciesManagement/addSpeciesReqForm.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* species Managemnt */}
          <Route path="/speciesDashboard" element={<SpeciesDashboard />} />
          <Route path="/AddSpecies" element={<AddSpecies />} />
          <Route path="/viewAllSpecies" element={<ViewAllSpecies />} />
          <Route path="/viewOneSpecies/:id" element={<ViewOneSpecies />} />
          <Route path="/SpeciesAddRequest" element={<SpeciesAddRequest />} />
          <Route path="/AddNewSpeciesByRequest/:id" element={<AddNewSpeciesByRequest />} />
          <Route path="/AddSpeciesRequest" element={<AddNewSpeciesRequest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;