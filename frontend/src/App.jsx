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
import AIChatBot from './components/AIChat/AIChatBot'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'

  return (
    <div className='min-h-screen bg-linear-to-br from-white via-gray-50 to-blue-50/30 relative overflow-x-hidden'>
      {/* Subtle animated background decoration */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 right-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-primary/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
        <div className='absolute bottom-0 left-0 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-indigo-500/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2'></div>
      </div>
      
      <div className='relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8'>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" className="!mt-16 sm:!mt-0" />
        <Navbar/>
        <main className='transition-all duration-300 pb-20 sm:pb-0'>
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
        
        {/* AI Chatbot - Available on all pages except login */}
        {!isAuthPage && <AIChatBot />}
      </div>
    </div>
  )
}

export default App