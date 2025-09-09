import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css' // Tailwind CSS is imported
import Hero from './components/Hero';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={
          <>
            <Hero />
          </>
        } />

        <Route path='/admin' element={
          <>
            <AdminDashboard />
          </>
        } />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
