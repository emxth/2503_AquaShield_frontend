import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';
import SpeciesDashboard from './SpeciesManagement/speciesDashboard.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/speciesDashboard" element={<SpeciesDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;