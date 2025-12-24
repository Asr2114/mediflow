import React, { useRef, useEffect, useState } from 'react'
import { specialityData } from '../assets/assets'
import {Link} from 'react-router-dom'

const SpecialityMenu = () => {
  const scrollContainerRef = useRef(null)
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10
      setShowSwipeIndicator(!isAtEnd && scrollLeft < 50)
    }

    const handleScroll = () => {
      setIsScrolling(true)
      checkScroll()
      setTimeout(() => setIsScrolling(false), 150)
    }

    container.addEventListener('scroll', handleScroll)
    checkScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div id='speciality' className='flex flex-col items-center gap-4 sm:gap-6 py-12 sm:py-20 text-gray-800 px-4'>
        <div className='text-center mb-4 animate-fade-in-up'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3'>
            Find by <span className='bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Speciality</span>
          </h1>
          <p className='text-sm sm:text-base w-full sm:w-2/3 lg:w-1/2 text-center text-gray-600 mx-auto'>
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>

        <div className='relative w-full'>
          {/* Swipe Indicator - Only visible on mobile when there's more content */}
          {showSwipeIndicator && (
            <div className='absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none sm:hidden'>
              <div className='flex flex-col items-center gap-2 bg-gradient-to-l from-primary/90 via-primary/70 to-transparent px-6 py-4 rounded-l-full backdrop-blur-sm'>
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

          {/* Gradient Fade on Right */}
          <div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none sm:hidden'></div>

          <div 
            ref={scrollContainerRef}
            className='flex sm:justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 w-full overflow-x-auto pb-4 scrollbar-hide relative'
            style={{scrollBehavior: 'smooth'}}
          >
              {specialityData.map((item, index)=>(
                  <Link 
                      onClick={()=> scrollTo(0,0)} 
                      className='group flex flex-col items-center text-xs cursor-pointer shrink-0 min-w-[100px] sm:min-w-[120px] animate-scale-in' 
                      key={index} 
                      to={`/doctors/${item.speciality}`}
                      style={{animationDelay: `${index * 0.1}s`}}
                  >
                      <div className='relative mb-3'>
                          <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500'></div>
                          <div className='relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg group-hover:shadow-2xl transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 border border-gray-100'>
                              <img className='w-12 sm:w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500' src={item.image} alt={item.speciality} />
                          </div>
                      </div>
                      <p className='text-center font-medium text-gray-700 group-hover:text-primary transition-colors duration-300'>{item.speciality}</p>
                  </Link>
              ))}
          </div>
        </div>

    </div>
  )
}

export default SpecialityMenu