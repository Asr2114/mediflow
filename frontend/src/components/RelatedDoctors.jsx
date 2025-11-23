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
            Related <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Doctors</span>
          </h1>
          <p className='w-full sm:w-2/3 lg:w-1/2 text-center text-sm sm:text-base text-gray-600 mx-auto'>
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        <div className='w-full grid grid-cols-2 sm:grid-cols-auto gap-4 sm:gap-6 pt-6 sm:pt-8 gap-y-6 sm:gap-y-8 px-2 sm:px-3 md:px-0'>
            {relDoc.slice(0,5).map((item,index)=>(
                <div 
                    onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} 
                    key={index} 
                    className='group relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer card-hover shadow-lg hover:shadow-2xl animate-scale-in'
                    style={{animationDelay: `${index * 0.05}s`}}
                >
                    <div className='relative overflow-hidden'>
                        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        <img className='bg-gradient-to-br from-blue-50 to-indigo-50 w-full h-auto transform group-hover:scale-110 transition-transform duration-700' src={item.image} alt={item.name} />
                    </div>
                    <div className='p-3 sm:p-5 relative'>
                        <div className='flex items-center gap-2 text-xs sm:text-sm mb-2'>
                            <div className='relative'>
                                <div className='absolute inset-0 bg-green-400 rounded-full blur-sm opacity-50'></div>
                                <p className='relative w-2 h-2 bg-green-500 rounded-full animate-pulse'></p>
                            </div>
                            <p className='text-green-600 font-medium'>Available</p>
                        </div>
                        <p className='text-gray-900 text-base sm:text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-300'>{item.name}</p>
                        <p className='text-gray-600 text-xs sm:text-sm'>{item.speciality}</p>
                    </div>
                </div>

            ))}

        </div>
        <button 
            onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} 
            className='group relative bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700 px-8 sm:px-12 py-3 sm:py-4 rounded-full mt-8 sm:mt-12 text-sm sm:text-base font-semibold overflow-hidden liquid-button shadow-lg hover:shadow-xl transition-all duration-500 hover:text-primary'
        >
            <span className='relative z-10'>View More Doctors</span>
        </button>
    </div>




    </div>
  )
}

export default RelatedDoctors