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
        getAllDoctors(); // Refresh the list
      } else {
        toast.error(response.data.message || 'Failed to delete doctor');
      }
    } catch (error) {
      toast.error('Error deleting doctor: ' + error.message);
    } finally {
      setLoadingDelete(null);
    }
  }

  return (
    <div className='w-full p-4 sm:p-8 lg:p-12'>
      {/* Header */}
      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Doctors List</h1>
          <p className='text-gray-600'>Total: {filteredDoctors.length} doctors</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-8'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Search doctors by name or email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors'
            />
          </div>
          <select
            value={filterSpeciality}
            onChange={(e) => setFilterSpeciality(e.target.value)}
            className='px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors'
          >
            {uniqueSpecialities.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Grid / Table */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {filteredDoctors.length > 0 ? filteredDoctors.map((doctor, index) => (
          <div key={index} className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300'>
            <div className='flex flex-col sm:flex-row'>
              {/* Doctor Image */}
              <div className='w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-100'>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                />
              </div>

              {/* Doctor Info */}
              <div className='flex-1 p-6 flex flex-col justify-between'>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <h3 className='text-xl sm:text-2xl font-bold text-gray-900'>{doctor.name}</h3>
                    <span className='px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'>
                      {doctor.speciality}
                    </span>
                  </div>
                  <p className='text-sm text-gray-500 mb-4'>{doctor.email}</p>

                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div>
                      <p className='text-xs text-gray-500 font-medium'>Degree</p>
                      <p className='text-sm font-semibold text-gray-900'>{doctor.degree}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 font-medium'>Experience</p>
                      <p className='text-sm font-semibold text-gray-900'>{doctor.experience} Years</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 font-medium'>Fees</p>
                      <p className='text-sm font-semibold text-gray-900'>₹{doctor.fees}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 font-medium'>Status</p>
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        doctor.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.available ? 'Active' : 'Unavailable'}
                      </span>
                    </div>
                  </div>

                  {doctor.about && (
                    <p className='text-sm text-gray-600 line-clamp-2'>{doctor.about}</p>
                  )}
                </div>

                {/* Actions */}
                <div className='flex gap-3 mt-6 items-center'>
                  <div className='flex items-center gap-3 flex-1 bg-gray-50 px-4 py-3 rounded-lg'>
                    <input
                      type='checkbox'
                      checked={doctor.available}
                      onChange={() => {
                        setLoadingAvailability(doctor._id);
                        changeAvailability(doctor._id).finally(() => setLoadingAvailability(null));
                      }}
                      disabled={loadingAvailability === doctor._id}
                      className='w-5 h-5 cursor-pointer accent-primary'
                    />
                    <label className='text-sm font-medium text-gray-700 cursor-pointer'>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </label>
                    {loadingAvailability === doctor._id && (
                      <div className='w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin ml-auto'></div>
                    )}
                  </div>
                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    disabled={loadingDelete === doctor._id}
                    className='py-2 px-4 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2'
                  >
                    {loadingDelete === doctor._id ? (
                      <>
                        <div className='w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className='lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center'>
            <svg className='w-16 h-16 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
            </svg>
            <p className='text-gray-500 text-lg'>No doctors found</p>
            <p className='text-gray-400 text-sm'>Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorsList