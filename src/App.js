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

import logo from './logo.svg';
import './App.css';
import ReportingForm from './reporting/components/ReportingForm';
import { FormProvider } from './reporting/context/ReportFormContext';
import ReportDetails from './reporting/components/MyReport';
import MyReport from './reporting/components/MyReport';
import ReportInfo from './reporting/components/ReportInfo';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ReportPage from './reporting/pages/ReportPage';
import FeoReport from './feoReporting/components/FEOReport';


function App() {

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully: ', registration);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('New service worker found:', newWorker);

            newWorker.addEventListener('statechange', () => {
              console.log('New service worker state:', newWorker.state);
            });
          });
        } catch (registrationError) {
          console.log('Service Worker registration failed: ', registrationError);
        }
      } else {
        console.log('Service Workers are not supported in this browser.');
      }
    };

    registerServiceWorker();
  }, []);


  return (
    <BrowserRouter>
      <FormProvider>
        <Header />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Hero />} />

          {/* Species Management */}
          <Route path="/speciesDashboard" element={<SpeciesDashboard />} />
          <Route path="/AddSpecies" element={<AddSpecies />} />
          <Route path="/viewAllSpecies" element={<ViewAllSpecies />} />
          <Route path="/viewOneSpecies/:id" element={<ViewOneSpecies />} />
          <Route path="/SpeciesAddRequest" element={<SpeciesAddRequest />} />
          <Route path="/AddNewSpeciesByRequest/:id" element={<AddNewSpeciesByRequest />} />
          <Route path="/AddSpeciesRequest" element={<AddNewSpeciesRequest />} />
          <Route path="/FeoReports" element={<FeoReport />} />

          {/* Reports */}
          <Route path="/report" element={<ReportPage />}>
            <Route path="reportIncident" element={<ReportingForm />} />
            <Route path="myReport" element={<MyReport />} />
          </Route>

          {/* Redirect for undefined routes */}
          <Route path="*" element={<Navigate to="/report/reportIncident" replace />} />
        </Routes>

        <Footer />
      </FormProvider>
    </BrowserRouter>
    //-----------------
    // <BrowserRouter>
    //   <Header />

    //   <Routes>
    //     <Route path='/' element={<Hero />} />

    //       {/* species Managemnt */}
    //       <Route path="/speciesDashboard" element={<SpeciesDashboard />} />
    //       <Route path="/AddSpecies" element={<AddSpecies />} />
    //       <Route path="/viewAllSpecies" element={<ViewAllSpecies />} />
    //       <Route path="/viewOneSpecies/:id" element={<ViewOneSpecies />} />
    //       <Route path="/SpeciesAddRequest" element={<SpeciesAddRequest />} />
    //       <Route path="/AddNewSpeciesByRequest/:id" element={<AddNewSpeciesByRequest />} />
    //       <Route path="/AddSpeciesRequest" element={<AddNewSpeciesRequest />} />
    //       <Route path="/FeoReports" element={<FeoReport />} />
          
    //   </Routes>

    //   <Footer />
    // </BrowserRouter>
    //-----------------
    // <div className="App">
    //   {/*header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
      
    //     <ReportingForm />
    //   </FormProvider>
    //   <FormProvider>
    //     <Router>
    //       <Routes>
    //         <Route path='/report' element={<ReportPage />}>
    //           <Route path='reportIncident' element={<ReportingForm />} />
    //           <Route path='myReport' element={<MyReport />} />
    //         </Route>
    //         <Route path='*' element={<Navigate to="/report/reportIncident" replace />} />
    //       </Routes>
    //     </Router>
    //   </FormProvider>*/}

    //   <FeoReport />




    // </div>
  );
}

export default App;