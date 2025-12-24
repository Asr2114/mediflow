import React, { useContext, useState, useRef } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const MyProfile = () => {


 const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext);


  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (isEdit) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateUserProfileData = async()=>{
    try{
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);

      image && formData.append('image', image);

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}});

      if(data.success){
        toast.success('Profile Updated Successfully');
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);

      } else{
        toast.error(data.message);

      }

    }catch(error){
      console.log(error);
      toast.error(error.message);

    }
  }

  const handleSave = () => {
    updateUserProfileData();
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setImage(null);
    setImagePreview(null);
  };


  return userData && (
    <div className='max-w-2xl w-full flex flex-col gap-4 text-sm px-4 sm:px-0 animate-fade-in'>
      
      {/* Header Section */}
      <div className='mb-6'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
          My <span className='bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Profile</span>
        </h1>
        <p className='text-gray-600 text-sm'>Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 animate-fade-in-up'>
        {/* Profile Image Section */}
        <div className='relative group flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-8'>
          <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-indigo-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500'></div>
          
          <div className='relative'>
            {/* Hidden file input */}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageChange}
              accept='image/*'
              className='hidden'
            />
            
            {/* Profile Image with Edit Overlay */}
            <div 
              className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-4 ring-primary/10 ${isEdit ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            >
              <img 
                className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500' 
                src={imagePreview || userData.image} 
                alt={userData.name} 
              />
              
              {/* Edit Overlay - Only visible in edit mode */}
              {isEdit && (
                <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300'>
                  <svg className='w-8 h-8 text-white mb-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  <span className='text-white text-xs font-medium'>Change Photo</span>
                </div>
              )}
            </div>

            {/* Remove Image Button - Only visible when new image is selected */}
            {isEdit && imagePreview && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className='absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            )}
          </div>

          <div className='flex-1 text-center sm:text-left'>
            {isEdit ?
              <input className='bg-gray-50 text-2xl sm:text-3xl font-bold w-full max-w-sm p-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} /> :
              <h2 className='font-bold text-2xl sm:text-3xl text-gray-900'>{userData.name}</h2>
            }
            <p className='text-gray-500 text-sm mt-1'>{userData.email}</p>
            
            {/* Image Upload Info - Only visible in edit mode */}
            {isEdit && (
              <div className='mt-3'>
                <p className='text-xs text-gray-400'>
                  Click image to change • Max 5MB • JPG, PNG, GIF
                </p>
                {image && (
                  <p className='text-xs text-green-600 mt-1 font-medium'>
                    ✓ New image selected
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className='h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mb-6'></div>

        {/* Contact Information */}
        <div className='mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='w-8 h-8 bg-linear-to-br from-primary/10 to-indigo-500/10 rounded-lg flex items-center justify-center'>
              <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </div>
            <p className='text-sm font-semibold text-gray-800'>Contact Information</p>
          </div>
          
          <div className='bg-gray-50 rounded-2xl p-4 space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 items-start'>
              <p className='text-gray-500 text-sm font-medium'>Email</p>
              <p className='text-gray-800 text-sm break-all'>{userData.email}</p>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 items-start'>
              <p className='text-gray-500 text-sm font-medium'>Phone</p>
              {isEdit ?
                <input className='bg-white w-full p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm transition-all duration-300' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                :
                <p className='text-primary font-medium text-sm'>{userData.phone}</p>
              }
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 items-start'>
              <p className='text-gray-500 text-sm font-medium'>Address</p>
              {isEdit ?
                <div className='flex flex-col gap-2'>
                  <input className='bg-white w-full p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm transition-all duration-300' type="text" placeholder="Address Line 1" value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                  <input className='bg-white w-full p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm transition-all duration-300' type="text" placeholder="Address Line 2" value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                </div>
                :
                <p className='text-gray-600 text-sm'>{userData.address.line1}<br />{userData.address.line2}</p>
              }
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className='mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='w-8 h-8 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-lg flex items-center justify-center'>
              <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <p className='text-sm font-semibold text-gray-800'>Basic Information</p>
          </div>

          <div className='bg-gray-50 rounded-2xl p-4 space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 items-center'>
              <p className='text-gray-500 text-sm font-medium'>Gender</p>
              {isEdit ?
                <select className='bg-white w-full sm:w-32 p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm transition-all duration-300' onChange={(e => setUserData(prev => ({ ...prev, gender: e.target.value })))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                :
                <p className='text-gray-800 text-sm'>{userData.gender}</p>
              }
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 items-center'>
              <p className='text-gray-500 text-sm font-medium'>Date of Birth</p>
              {isEdit ?
                <input className='bg-white w-full sm:w-48 p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm transition-all duration-300' type="date" onChange={(e) => setUserData(prev => ({...prev, dob:e.target.value}))} value={userData.dob}/>
                :
                <p className='text-gray-800 text-sm'>{userData.dob}</p>
              }
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
          {isEdit ?
            <>
              <button 
                className='group relative bg-linear-to-r from-primary to-indigo-600 text-white px-8 py-3 rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all w-full sm:w-auto text-sm font-semibold overflow-hidden' 
                onClick={updateUserProfileData}
              >
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  Save Changes
                </span>
              </button>
              <button 
                className='group relative border-2 border-gray-200 text-gray-600 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all w-full sm:w-auto text-sm font-semibold' 
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
            :
            <button className='group relative border-2 border-primary text-primary px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition-all w-full sm:w-auto text-sm font-semibold hover:shadow-lg' onClick={()=> setIsEdit(true)}>
              <span className='flex items-center justify-center gap-2'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                </svg>
                Edit Profile
              </span>
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile