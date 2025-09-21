import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import MyProfile from  './pages/MyProfile'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'> 
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
      </Routes>

    </div>
  )
}

export default App