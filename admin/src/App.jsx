import React, { useContext } from 'react'
import Login from './pages/login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';

const App = () => {


  const {aToken} = useContext(AdminContext);
  return aToken? (
    <div className='bg-[#F8F9FD]'>

      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/doctors' element={<DoctorsList/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>  
        </Routes>
      </div>
     
      <ToastContainer />
    </div>
  ): (
    <>
    <Login/>
      <ToastContainer />

    
    </>
  )
}

export default App