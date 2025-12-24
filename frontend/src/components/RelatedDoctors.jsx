import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({speciality, docId}) => {

    const {doctors} = useContext(AppContext);

    const [relDoc, setRelDoc] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id != docId);
            setRelDoc(doctorsData);
        }

    },[doctors, speciality, docId])

  return (
    <div>
        <div className='flex flex-col items-center gap-4 sm:gap-6 my-12 sm:my-20 text-gray-900 md:mx-10 px-4'>
        <div className='text-center mb-6 animate-fade-in-up'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3'>
            Related <span className='bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Doctors</span>
          </h1>
          <p className='w-full sm:w-2/3 lg:w-1/2 text-center text-sm sm:text-base text-gray-600 mx-auto'>
            Explore other specialists in the same field
          </p>
        </div>

        {relDoc.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-500'>No related doctors found in this speciality</p>
          </div>
        ) : (
          <div className='w-full grid grid-cols-2 sm:grid-cols-auto gap-4 sm:gap-6 pt-6 sm:pt-8 gap-y-6 sm:gap-y-8 px-2 sm:px-3 md:px-0'>
              {relDoc.slice(0,5).map((item,index)=>(
                  <div 
                      onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} 
                      key={index} 
                      className='group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:border-primary/20 animate-scale-in transition-all duration-500'
                      style={{animationDelay: `${index * 0.05}s`}}
                  >
                      <div className='relative overflow-hidden'>
                          <div className='absolute inset-0 bg-linear-to-br from-primary/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                          <img className='bg-linear-to-br from-blue-50 to-indigo-50 w-full h-auto transform group-hover:scale-110 transition-transform duration-700' src={item.image} alt={item.name} />
                      </div>
                      <div className='p-3 sm:p-5 relative'>
                          <div className='flex items-center gap-2 text-xs sm:text-sm mb-2'>
                              <div className='relative'>
                                  <div className={`absolute inset-0 ${item.available ? 'bg-green-400' : 'bg-red-400'} rounded-full blur-sm opacity-50`}></div>
                                  <p className={`relative w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full ${item.available ? 'animate-pulse' : ''}`}></p>
                              </div>
                              <p className={`${item.available ? 'text-green-600' : 'text-red-500'} font-medium`}>
                                {item.available ? 'Available' : 'Unavailable'}
                              </p>
                          </div>
                          <p className='text-gray-900 text-base sm:text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300'>{item.name}</p>
                          <p className='text-gray-500 text-xs sm:text-sm'>{item.speciality}</p>
                      </div>
                  </div>

              ))}
          </div>
        )}
        <button 
            onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} 
            className='group relative bg-linear-to-r from-primary to-indigo-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full mt-8 sm:mt-12 text-sm sm:text-base font-semibold overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105'
        >
            <span className='relative z-10 flex items-center gap-2'>
              View More Doctors
              <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </span>
        </button>
    </div>
    </div>
  )
}

export default RelatedDoctors