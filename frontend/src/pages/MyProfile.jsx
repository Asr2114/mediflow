import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {


  const [userData, setUserData] = useState({
    name: "Abhishek Singh",
    image: assets.profile_pic,
    email: 'abhishek@gmail.com',
    phone: '1234567890',
    address: {
      line1: "Niwaru",
      line2: 'Jhotwara, Jaipur'
    },
    gender: "Male",
    dob: '2004-01-21'
  })

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-lg w-full flex flex-col gap-4 text-sm px-4 sm:px-0 animate-fade-in'>
      <div className='relative group'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500'></div>
        <img className='relative w-32 sm:w-40 rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500 border-4 border-white' src={userData.image} alt={userData.name} />
      </div>

      {isEdit ?
        <input className='bg-gradient-to-r from-gray-50 to-blue-50 text-xl sm:text-3xl font-bold w-full sm:max-w-60 mt-4 p-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} /> :
        <p className='font-bold text-2xl sm:text-4xl bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent mt-4'>{userData.name}</p>

      }

      <hr className='bg-zinc-400 h-px border-none'/>

      <div>
        <p className='text-neutral-500 underline mt-3 text-xs sm:text-sm'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium text-xs sm:text-sm'>Email Id: </p>
          <p className='text-blue-500 text-xs sm:text-sm break-all'>{userData.email}</p>
          <p className='font-medium text-xs sm:text-sm'>Phone:</p>

          {
            isEdit ?
              <input className='bg-gray-100 w-full sm:max-w-52 p-2 rounded text-xs sm:text-sm' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />

              :
              <p className='text-blue-400 text-xs sm:text-sm'>{userData.phone}</p>

          }

          <p className='font-medium text-xs sm:text-sm'>Address:</p>
          {
            isEdit ?
              <div className='flex flex-col gap-2'>
                <input className='bg-gray-100 w-full p-2 rounded text-xs sm:text-sm' type="text" value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                <input className='bg-gray-100 w-full p-2 rounded text-xs sm:text-sm' type="text" value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
              </div> :
              <p className='text-gray-500 text-xs sm:text-sm'>
                {userData.address.line1}
                <br />
                {userData.address.line2}

              </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3 text-xs sm:text-sm'>Basic Information</p>

        <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium text-xs sm:text-sm'>Gender:</p>

          {
            isEdit ?

              <select className='w-full sm:max-w-20 bg-gray-100 p-2 rounded text-xs sm:text-sm' onChange={(e => setUserData(prev => ({ ...prev, gender: e.target.value })))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select> :
              <p className='text-gray-400 text-xs sm:text-sm'>
                {userData.gender}
              </p>
              
        }

        <p className='font-medium text-xs sm:text-sm'>DOB:</p>
        {
          isEdit?
          <input className='bg-gray-100 w-full sm:max-w-48 p-2 rounded text-xs sm:text-sm' type="date" onChange={(e) => setUserData(prev => ({...prev, dob:e.target.value}))} value={userData.dob}/>
          :
          <p className='text-xs sm:text-sm'>{userData.dob}</p>
        }
        </div>
      </div>

      <div className='mt-6 sm:mt-10'>

      {
        isEdit?
        <button className='group relative bg-gradient-to-r from-primary to-indigo-600 text-white px-8 sm:px-10 py-3 rounded-full hover:shadow-xl transition-all w-full sm:w-auto text-sm sm:text-base font-semibold overflow-hidden liquid-button' onClick={()=> setIsEdit(false)}>
          <span className='relative z-10'>Save Information</span>
        </button>
        :
        <button className='group relative border-2 border-primary text-primary px-8 sm:px-10 py-3 rounded-full hover:bg-primary hover:text-white transition-all w-full sm:w-auto text-sm sm:text-base font-semibold hover:shadow-lg' onClick={()=> setIsEdit(true)}>
          Edit Profile
        </button>
      }

      </div>


    </div>
  )
}

export default MyProfile