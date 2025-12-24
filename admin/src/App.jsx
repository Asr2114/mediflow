import React, { useContext } from 'react'
import Login from './pages/login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/doctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {


  const {aToken} = useContext(AdminContext);

  const {dToken} = useContext(DoctorContext);


  return aToken || dToken ? (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 gradient-mesh'>
      {/* Animated background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float' style={{animationDelay: '-3s'}}></div>
        <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float' style={{animationDelay: '-5s'}}></div>
      </div>

      <Navbar/>
      <div className='flex items-start relative'>
        <Sidebar/>
        <main className='flex-1 min-h-[calc(100vh-80px)] overflow-x-hidden'>
          <Routes>
            {/* Default route - redirect based on token */}
            <Route path='/' element={aToken ? <Dashboard/> : <Navigate to='/doctor-dashboard' />}/>
            
            {/* Admin Routes */}
            <Route path='/dashboard' element={aToken ? <Dashboard/> : <Navigate to='/doctor-dashboard' />}/>
            <Route path='/doctors' element={aToken ? <DoctorsList/> : <Navigate to='/doctor-dashboard' />}/>
            <Route path='/add-doctor' element={aToken ? <AddDoctor/> : <Navigate to='/doctor-dashboard' />}/>
            <Route path='/all-appointments' element={aToken ? <AllAppointments/> : <Navigate to='/doctor-dashboard' />}/> 

            {/* Doctor Routes  */}
            <Route path='/doctor-dashboard' element={dToken ? <DoctorDashboard/> : <Navigate to='/dashboard' />}/>
            <Route path='/doctor-appointments' element={dToken ? <DoctorAppointments/> : <Navigate to='/dashboard' />}/>
            <Route path='/doctor-profile' element={dToken ? <DoctorProfile/> : <Navigate to='/dashboard' />}/>

          </Routes>
        </main>
      </div>
     
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  ): (
    <>
    <Login/>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    
    </>
  )
}

export default App