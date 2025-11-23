import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

function Doctors() {

   const {speciality} = useParams();

   const [filterDoc, setFilterDoc] = useState([]);
   const [showFilterSwipe, setShowFilterSwipe] = useState(true);
   const filterScrollRef = useRef(null);

   const {doctors} = useContext(AppContext);

   const navigate = useNavigate();

   const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else{
      setFilterDoc(doctors)
    }
   }

   useEffect(()=>{
    applyFilter();

   }, [doctors, speciality])

   useEffect(() => {
    const container = filterScrollRef.current
    if (!container) return

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setShowFilterSwipe(scrollLeft + clientWidth < scrollWidth - 10 && scrollLeft < 50)
    }

    container.addEventListener('scroll', checkScroll)
    checkScroll()

    return () => container.removeEventListener('scroll', checkScroll)
  }, [])

   

  const specialities = [
    { name: 'General physician', icon: '👨‍⚕️', color: 'from-blue-400 to-cyan-500' },
    { name: 'Gynecologist', icon: '👩‍⚕️', color: 'from-pink-400 to-rose-500' },
    { name: 'Dermatologist', icon: '🔬', color: 'from-purple-400 to-indigo-500' },
    { name: 'Pediatricians', icon: '👶', color: 'from-yellow-400 to-orange-500' },
    { name: 'Neurologist', icon: '🧠', color: 'from-indigo-400 to-purple-500' },
    { name: 'Gastroenterologist', icon: '🫀', color: 'from-green-400 to-emerald-500' }
  ]

  return (
    <div className='px-4 sm:px-0'>
      <div className='mb-6 sm:mb-8 animate-fade-in-up'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
          Find Your <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Specialist</span>
        </h1>
        <p className='text-gray-600 text-sm sm:text-base'>Browse through our extensive list of trusted doctors by speciality</p>
      </div>
      
      <div className='flex flex-col lg:flex-row items-start gap-6 sm:gap-8 mt-6 sm:mt-8'>
        {/* Enhanced Filter Section */}
        <div className='w-full lg:w-auto'>
          <div className='sticky top-4 animate-fade-in-up'>
            <div className='relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-gray-100 overflow-hidden group lg:min-w-[280px]'>
              {/* Animated Background Pattern */}
              <div className='absolute inset-0 opacity-5'>
                <div className='absolute inset-0' style={{
                  backgroundImage: `
                    linear-gradient(rgba(95, 111, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(95, 111, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              
              {/* Floating Orbs */}
              <div className='absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float'></div>
              <div className='absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl animate-float' style={{animationDelay: '2s'}}></div>
              
              <div className='relative z-10'>
                <h3 className='text-base font-bold text-gray-900 mb-5 flex items-center gap-2.5'>
                  <div className='w-8 h-8 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                    </svg>
                  </div>
                  <span className='bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>Filter by Speciality</span>
                </h3>
                
                {/* All Doctors Button */}
                <button
                  onClick={() => navigate('/doctors')}
                  className={`group relative w-full flex items-center justify-between px-5 py-4 rounded-2xl mb-4 transition-all duration-500 overflow-hidden liquid-button ${
                    !speciality 
                      ? 'bg-gradient-to-r from-primary via-indigo-600 to-purple-600 text-white shadow-xl scale-105' 
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-indigo-500/5 hover:shadow-lg'
                  }`}
                >
                  <div className='flex items-center gap-3 relative z-10'>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-500 transform ${
                      !speciality ? 'bg-white/20 scale-110' : 'bg-gradient-to-br from-primary/10 to-indigo-500/10 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-indigo-500/20'
                    }`}>
                      {!speciality ? '⭐' : '👁️'}
                    </div>
                    <span className='font-bold text-sm sm:text-base'>All Doctors</span>
                  </div>
                  {!speciality && (
                    <>
                      <div className='absolute inset-0 bg-white/20 animate-pulse'></div>
                      <div className='absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping'></div>
                    </>
                  )}
                  {!speciality && (
                    <svg className='w-5 h-5 text-white/80 relative z-10 transform group-hover:rotate-180 transition-transform duration-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  )}
                </button>

                {/* Speciality Filters */}
                <div className='relative'>
                  {/* Swipe Indicator for Mobile Filters */}
                  {showFilterSwipe && (
                    <div className='lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none'>
                      <div className='flex flex-col items-center gap-2 bg-gradient-to-l from-primary/90 via-primary/70 to-transparent px-4 py-3 rounded-l-full backdrop-blur-sm'>
                        <div className='flex items-center gap-1 text-white text-xs font-semibold animate-pulse'>
                          <span>Swipe</span>
                          <svg className='w-4 h-4 animate-bounce-x' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M9 5l7 7-7 7' />
                          </svg>
                        </div>
                        <div className='flex gap-1'>
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i}
                              className='w-1 h-1 bg-white/60 rounded-full animate-pulse'
                              style={{animationDelay: `${i * 0.2}s`}}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='lg:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none'></div>
                  
                  <div 
                    ref={filterScrollRef}
                    className='flex lg:flex-col gap-2.5 lg:space-y-2.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide'
                    style={{scrollBehavior: 'smooth'}}
                  >
                    {specialities.map((spec, index) => {
                      const isActive = speciality === spec.name
                      return (
                        <button
                          key={index}
                          onClick={() => isActive ? navigate('/doctors') : navigate(`/doctors/${spec.name}`)}
                          className={`group relative w-full lg:w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-500 overflow-hidden transform liquid-button shrink-0 ${
                            isActive 
                              ? `bg-gradient-to-r ${spec.color} text-white shadow-2xl scale-105` 
                              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary hover:shadow-xl hover:scale-[1.02]'
                          }`}
                          style={{animationDelay: `${index * 0.05}s`, minWidth: '220px'}}
                        >
                        {/* Liquid Background Effect */}
                        {isActive && (
                          <>
                            <div className='absolute inset-0 bg-white/20 animate-pulse'></div>
                            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent'></div>
                          </>
                        )}
                        
                        {/* Icon with Glow */}
                        <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-500 transform ${
                          isActive 
                            ? 'bg-white/25 scale-110 shadow-lg' 
                            : `bg-gradient-to-br ${spec.color} bg-opacity-10 group-hover:scale-110 group-hover:bg-opacity-20 group-hover:shadow-md`
                        }`}>
                          <span className={`transition-all duration-500 ${isActive ? 'filter drop-shadow-lg scale-110' : 'group-hover:scale-110'}`}>
                            {spec.icon}
                          </span>
                          {isActive && (
                            <div className='absolute inset-0 bg-white/30 rounded-xl animate-pulse'></div>
                          )}
                        </div>
                        
                        {/* Text */}
                        <span className={`relative z-10 font-bold text-sm sm:text-base flex-1 text-left transition-all duration-300 ${
                          isActive ? 'text-white drop-shadow-sm' : 'group-hover:text-primary'
                        }`}>
                          {spec.name}
                        </span>
                        
                        {/* Active Indicator with Animation */}
                        {isActive && (
                          <div className='relative z-10 flex items-center gap-2'>
                            <div className='relative'>
                              <div className='w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-lg'></div>
                              <div className='absolute inset-0 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75'></div>
                            </div>
                            <svg className='w-5 h-5 text-white animate-bounce' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                            </svg>
                          </div>
                        )}
                        
                        {/* Hover Arrow with Animation */}
                        {!isActive && (
                          <div className='relative z-10'>
                            <svg className='w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-2 transition-all duration-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M9 5l7 7-7 7' />
                            </svg>
                            <div className='absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 blur-sm'></div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='flex-1 w-full'>
          {filterDoc.length === 0 ? (
            <div className='text-center py-16 animate-fade-in-up'>
              <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <p className='text-gray-600 text-lg font-medium'>No doctors found</p>
              <p className='text-gray-500 text-sm mt-2'>Try selecting a different speciality</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-auto gap-4 sm:gap-6 gap-y-6 sm:gap-y-8 px-2 sm:px-3 lg:px-0'>
          {
            filterDoc.map((item,index)=>(
                <div 
                    onClick={()=>navigate(`/appointment/${item._id}`)} 
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

            ))
          }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors