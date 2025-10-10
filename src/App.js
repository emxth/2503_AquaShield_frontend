import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'
import ForgotPassword from './pages/ForgotPassword';
import OTPVerification from './pages/OTPVerification';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      {/* Navbar */}
      <Navbar />

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Page Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
         <Route path='/forgot-password' element={<ForgotPassword />} />
  <Route path='/otp-verification' element={<OTPVerification />} />
  <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App
