import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, backendUrl, changeAvailability } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpeciality, setFilterSpeciality] = useState('All Specialities');
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = filterSpeciality === 'All Specialities' || doctor.speciality === filterSpeciality;
    return matchesSearch && matchesSpeciality;
  })

  const uniqueSpecialities = ['All Specialities', ...new Set(doctors.map(d => d.speciality))]

  const deleteDoctor = async (doctorId) => {
    try {
      setLoadingDelete(doctorId);
      const response = await axios.post(
        backendUrl + '/api/admin/delete-doctor',
        { doctorId },
        { headers: { atoken: aToken } }
      )

      if (response.data.success) {
        toast.success('Doctor deleted successfully');
        getAllDoctors();
      } else {
        toast.error(response.data.message || 'Failed to delete doctor');
      }
    } catch (error) {
      toast.error('Error deleting doctor: ' + error.message);
    } finally {
      setLoadingDelete(null);
    }
  }

  const activeCount = doctors.filter(d => d.available).length;
  const inactiveCount = doctors.filter(d => !d.available).length;

  return (
    <div className='w-full min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Hero Header */}
      <div className='relative mb-8 overflow-hidden'>
        <div className='glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 animate-fade-in'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            {/* Title Section */}
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-12 h-12 bg-linear-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                  </svg>
                </div>
                <div>
                  <h1 className='text-3xl sm:text-4xl font-black text-gray-900'>Medical Team</h1>
                  <p className='text-gray-500 text-sm'>Manage your healthcare professionals</p>
                </div>
              </div>
            </div>

            {/* Stats Pills */}
            <div className='flex flex-wrap gap-3'>
              <div className='flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='text-sm font-bold text-blue-700'>{doctors.length} Total</span>
              </div>
              <div className='flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-100'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-bold text-green-700'>{activeCount} Active</span>
              </div>
              <div className='flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-100'>
                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                <span className='text-sm font-bold text-red-700'>{inactiveCount} Inactive</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & View Toggle */}
      <div className='glass rounded-2xl p-4 sm:p-6 border border-gray-200 mb-8 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Search Input */}
          <div className='flex-1 relative group'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg className='w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search by name or email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm'
            />
          </div>

          {/* Speciality Filter */}
          <div className='relative'>
            <select
              value={filterSpeciality}
              onChange={(e) => setFilterSpeciality(e.target.value)}
              className='appearance-none w-full lg:w-56 pl-4 pr-10 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer font-medium'
            >
              {uniqueSpecialities.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className='flex bg-gray-100 rounded-xl p-1'>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow-md text-primary' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow-md text-primary' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 10h16M4 14h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Doctors Grid/List */}
      {filteredDoctors.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
          {filteredDoctors.map((doctor, index) => (
            <div 
              key={doctor._id} 
              className='glass card-hover rounded-2xl border border-gray-200 overflow-hidden animate-fade-in-up group'
              style={{animationDelay: `${0.1 + index * 0.05}s`}}
            >
              <div className={`flex ${viewMode === 'grid' ? 'flex-col sm:flex-row' : 'flex-row items-center'}`}>
                {/* Doctor Image */}
                <div className={`relative overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 ${viewMode === 'grid' ? 'w-full sm:w-48 h-52 sm:h-auto' : 'w-20 h-20 m-4 rounded-xl shrink-0'}`}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                  />
                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 ${viewMode === 'list' ? 'hidden' : ''}`}>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
                      doctor.available 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-red-500/90 text-white'
                    }`}>
                      {doctor.available ? '● Online' : '○ Offline'}
                    </span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className={`flex-1 p-5 flex flex-col ${viewMode === 'list' ? 'py-4' : ''}`}>
                  <div className='flex-1'>
                    <div className='flex flex-wrap items-center gap-2 mb-2'>
                      <h3 className='text-xl font-bold text-gray-900 group-hover:text-primary transition-colors'>{doctor.name}</h3>
                      <span className='px-3 py-1 text-xs font-semibold rounded-full bg-linear-to-r from-primary/10 to-indigo-500/10 text-primary border border-primary/20'>
                        {doctor.speciality}
                      </span>
                    </div>
                    <p className='text-sm text-gray-500 mb-4 flex items-center gap-2'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                      {doctor.email}
                    </p>

                    {/* Stats Grid */}
                    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-4'} gap-3 mb-4`}>
                      <div className='text-center p-2 bg-gray-50 rounded-lg'>
                        <p className='text-[10px] text-gray-500 font-medium uppercase tracking-wide'>Degree</p>
                        <p className='text-sm font-bold text-gray-900'>{doctor.degree}</p>
                      </div>
                      <div className='text-center p-2 bg-gray-50 rounded-lg'>
                        <p className='text-[10px] text-gray-500 font-medium uppercase tracking-wide'>Exp.</p>
                        <p className='text-sm font-bold text-gray-900'>{doctor.experience} Yrs</p>
                      </div>
                      <div className='text-center p-2 bg-gray-50 rounded-lg'>
                        <p className='text-[10px] text-gray-500 font-medium uppercase tracking-wide'>Fees</p>
                        <p className='text-sm font-bold text-green-600'>₹{doctor.fees}</p>
                      </div>
                      <div className='text-center p-2 bg-gray-50 rounded-lg'>
                        <p className='text-[10px] text-gray-500 font-medium uppercase tracking-wide'>Status</p>
                        <p className={`text-sm font-bold ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                          {doctor.available ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-3 items-center pt-4 border-t border-gray-100'>
                    {/* Availability Toggle */}
                    <button
                      onClick={() => {
                        setLoadingAvailability(doctor._id);
                        changeAvailability(doctor._id).finally(() => setLoadingAvailability(null));
                      }}
                      disabled={loadingAvailability === doctor._id}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        doctor.available 
                          ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {loadingAvailability === doctor._id ? (
                        <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin'></div>
                      ) : (
                        <>
                          <div className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          {doctor.available ? 'Available' : 'Unavailable'}
                        </>
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteDoctor(doctor._id)}
                      disabled={loadingDelete === doctor._id}
                      className='py-3 px-4 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 border border-red-200 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group/del'
                    >
                      {loadingDelete === doctor._id ? (
                        <div className='w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>
                      ) : (
                        <svg className='w-5 h-5 group-hover/del:animate-wiggle' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='glass rounded-2xl border border-gray-200 p-12 text-center animate-fade-in'>
          <div className='w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>No doctors found</h3>
          <p className='text-gray-500 mb-6'>Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {setSearchTerm(''); setFilterSpeciality('All Specialities');}}
            className='px-6 py-3 bg-linear-to-r from-primary to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300'
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default DoctorsList