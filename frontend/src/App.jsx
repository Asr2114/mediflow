import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8'>
        <ToastContainer/>
        <Navbar/>
        <main className='transition-all duration-300'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/doctors' element={<Doctors/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/doctors/:speciality' element={<Doctors/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/my-profile' element={<MyProfile/>}/>
            <Route path='/my-appointments' element={<MyAppointments/>}/>
            <Route path='/appointment/:docId' element={<Appointment/>}/>
          </Routes>
        </main>
        {!isAuthPage && <Footer/>}
      </div>
    </div>
  )
}

export default App