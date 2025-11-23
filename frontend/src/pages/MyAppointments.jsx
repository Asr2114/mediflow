import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {


  const {doctors} = useContext(AppContext);
  

  return (
    <div className='px-4 sm:px-0 animate-fade-in'>
      <div className='mb-8 animate-fade-in-up'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
          My <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Appointments</span>
        </h1>
        <p className='text-gray-600 text-sm sm:text-base'>Manage and view your upcoming appointments</p>
      </div>

      <div className='mt-6 space-y-6'>
        {doctors.slice(0,3).map((item,index)=>(
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 sm:py-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-4 sm:p-6 transition-all duration-500 card-hover animate-scale-in' key={index} style={{animationDelay: `${index * 0.1}s`}}>
            <div className='shrink-0'>
              <img className='w-full sm:w-32 bg-indigo-50 rounded-lg' src={item.image} alt={item.name} />
            </div>
            <div className='flex-1 text-xs sm:text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold text-sm sm:text-base'>{item.name}</p>
              <p className='mt-1'>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-2 sm:mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-xs mt-2 sm:mt-1'><span className='text-xs sm:text-sm text-neutral-700 font-medium'>Date & Time:</span> 25, July, 2025 | 8:30 PM</p>
            </div>

            <div className='flex flex-row sm:flex-col gap-3 justify-start sm:justify-center mt-2 sm:mt-0'>
              <button className='group relative bg-gradient-to-r from-primary to-indigo-600 text-white text-sm font-semibold text-center w-full sm:min-w-48 py-3 rounded-xl overflow-hidden liquid-button shadow-lg hover:shadow-xl transition-all duration-500'>
                <span className='relative z-10'>Pay Online</span>
              </button>
              <button className='text-sm font-semibold text-center w-full sm:min-w-48 py-3 border-2 border-red-300 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 cursor-pointer text-red-600'>Cancel Appointment</button>
            </div>



            </div>
        ))}
      </div>
      </div>
  )
}

export default MyAppointments