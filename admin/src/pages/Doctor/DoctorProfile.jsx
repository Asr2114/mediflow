import React, { useState, useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, updateProfileData } = useContext(DoctorContext)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  useEffect(() => {
    if (profileData) {
      setEditData({
        fees: profileData.fees,
        address: profileData.address || { line1: '', line2: '' },
        available: profileData.available,
        about: profileData.about
      })
    }
  }, [profileData])

  const handleSave = async () => {
    const success = await updateProfileData(editData)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      fees: profileData.fees,
      address: profileData.address || { line1: '', line2: '' },
      available: profileData.available,
      about: profileData.about
    })
    setIsEditing(false)
  }

  // Loading state
  if (!profileData) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-500'>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Header */}
      <div className='glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 mb-6 sm:mb-8 animate-fade-in'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0'>
              <svg className='w-6 h-6 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <div className='min-w-0 flex-1'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 truncate'>My Profile</h1>
              <p className='text-gray-500 text-sm hidden sm:block'>Manage your profile information</p>
            </div>
          </div>
          
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className='flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-primary to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300'
            >
              <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
              </svg>
              <span className='hidden sm:inline'>Edit Profile</span>
              <span className='sm:hidden'>Edit</span>
            </button>
          ) : (
            <div className='flex items-center gap-2'>
              <button 
                onClick={handleCancel}
                className='px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300'
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className='flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300'
              >
                <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
        {/* Left Column - Profile Card */}
        <div className='lg:col-span-1'>
          <div className='glass rounded-2xl border border-gray-200 overflow-hidden animate-fade-in-up'>
            {/* Cover Image */}
            <div className='h-24 sm:h-32 bg-linear-to-r from-primary via-indigo-500 to-purple-500 relative'>
              <div className='absolute inset-0 opacity-20'>
                <div className='absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full'></div>
                <div className='absolute top-8 right-8 w-12 h-12 border-2 border-white/20 rounded-full'></div>
                <div className='absolute bottom-4 left-1/3 w-6 h-6 border-2 border-white/25 rounded-full'></div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className='px-4 sm:px-6 pb-6 -mt-12 sm:-mt-16 relative'>
              <div className='relative inline-block'>
                <img 
                  src={profileData.image} 
                  alt={profileData.name}
                  className='w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-xl object-cover'
                />
                <div className={`absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white ${(isEditing ? editData?.available : profileData.available) ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              
              <div className='mt-4'>
                <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>{profileData.name}</h2>
                <p className='text-primary font-medium'>{profileData.speciality}</p>
                <p className='text-gray-500 text-sm mt-1'>{profileData.degree}</p>
              </div>

              {/* Quick Stats */}
              <div className='grid grid-cols-2 gap-3 mt-6'>
                <div className='bg-blue-50 rounded-xl p-3 text-center'>
                  <p className='text-2xl font-bold text-blue-600'>{profileData.experience}</p>
                  <p className='text-xs text-gray-500'>Experience</p>
                </div>
                <div className='bg-green-50 rounded-xl p-3 text-center'>
                  <p className='text-2xl font-bold text-green-600'>₹{isEditing ? editData?.fees : profileData.fees}</p>
                  <p className='text-xs text-gray-500'>Consultation</p>
                </div>
              </div>

              {/* Availability Toggle */}
              <div className='mt-6 p-4 bg-gray-50 rounded-xl'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-semibold text-gray-900'>Availability</p>
                    <p className='text-xs text-gray-500'>{(isEditing ? editData?.available : profileData.available) ? 'Currently accepting patients' : 'Not available'}</p>
                  </div>
                  <button 
                    onClick={() => isEditing && setEditData({...editData, available: !editData.available})}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                      (isEditing ? editData?.available : profileData.available) ? 'bg-green-500' : 'bg-gray-300'
                    } ${!isEditing && 'cursor-not-allowed opacity-60'}`}
                    disabled={!isEditing}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                      (isEditing ? editData?.available : profileData.available) ? 'left-8' : 'left-1'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Contact Information */}
          <div className='glass rounded-2xl border border-gray-200 p-4 sm:p-6 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
            <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              Contact Information
            </h3>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='text-xs font-medium text-gray-500 mb-1 block'>Email Address</label>
                <p className='text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl'>{profileData.email}</p>
              </div>
              <div>
                <label className='text-xs font-medium text-gray-500 mb-1 block'>Speciality</label>
                <p className='text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl'>{profileData.speciality}</p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className='glass rounded-2xl border border-gray-200 p-4 sm:p-6 animate-fade-in-up' style={{animationDelay: '0.2s'}}>
            <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              Professional Information
            </h3>
            
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div>
                <label className='text-xs font-medium text-gray-500 mb-1 block'>Degree</label>
                <p className='text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl'>{profileData.degree}</p>
              </div>
              <div>
                <label className='text-xs font-medium text-gray-500 mb-1 block'>Experience</label>
                <p className='text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl'>{profileData.experience}</p>
              </div>
              <div>
                <label className='text-xs font-medium text-gray-500 mb-1 block'>Consultation Fee</label>
                {isEditing ? (
                  <input 
                    type='number'
                    value={editData?.fees || ''}
                    onChange={(e) => setEditData({...editData, fees: Number(e.target.value)})}
                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all'
                  />
                ) : (
                  <p className='text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl'>₹{profileData.fees}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className='glass rounded-2xl border border-gray-200 p-4 sm:p-6 animate-fade-in-up' style={{animationDelay: '0.3s'}}>
            <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              Clinic Address
            </h3>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='text-xs font-medium text-gray-500 mb-1 block'>Address Line 1</label>
                {isEditing ? (
                  <input 
                    type='text'
                    value={editData?.address?.line1 || ''}
                    onChange={(e) => setEditData({...editData, address: {...editData.address, line1: e.target.value}})}
                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all'
                  />
                ) : (
                  <p className='text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl'>{profileData.address?.line1 || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className='text-xs font-medium text-gray-500 mb-1 block'>Address Line 2</label>
                {isEditing ? (
                  <input 
                    type='text'
                    value={editData?.address?.line2 || ''}
                    onChange={(e) => setEditData({...editData, address: {...editData.address, line2: e.target.value}})}
                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all'
                  />
                ) : (
                  <p className='text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl'>{profileData.address?.line2 || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div className='glass rounded-2xl border border-gray-200 p-4 sm:p-6 animate-fade-in-up' style={{animationDelay: '0.4s'}}>
            <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              About
            </h3>
            
            {isEditing ? (
              <textarea 
                value={editData?.about || ''}
                onChange={(e) => setEditData({...editData, about: e.target.value})}
                rows={4}
                className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none'
              />
            ) : (
              <p className='text-gray-700 leading-relaxed bg-gray-50 px-4 py-3 rounded-xl'>{profileData.about}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile