import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='relative flex flex-col md:flex-row rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 overflow-hidden shadow-2xl mb-4 sm:mb-6 md:mb-8 group'>
        {/* Optimized Liquid Animated Gradient Background */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700'>
          {/* Single Optimized Liquid Gradient Layer */}
          <div className='absolute inset-0 opacity-70' style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)
            `,
            animation: 'liquid-gradient 20s ease-in-out infinite',
            backgroundSize: '200% 200%',
            willChange: 'background-position'
          }}></div>
        </div>

        {/* Static Grid Overlay (No Animation) */}
        <div className='absolute inset-0 opacity-8 hidden sm:block' style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px sm:60px sm:60px'
        }}></div>

        {/* Reduced Medical Grid Elements - Hidden on mobile for performance */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none hidden sm:block'>
          {/* Reduced Heartbeat Graphs */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className='absolute' style={{
              left: `${25 + i * 25}%`,
              top: `${30 + (i % 2) * 35}%`,
              width: '60px',
              height: '30px',
              opacity: 0.12,
              animation: `pulse 4s ease-in-out infinite`,
              animationDelay: `${i * 1}s`,
              willChange: 'opacity'
            }}>
              <svg viewBox="0 0 100 50" className='w-full h-full'>
                <path d="M0,25 L15,20 L30,25 L45,10 L60,25 L75,20 L100,25" 
                      stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
              </svg>
            </div>
          ))}
        </div>
        
        {/* Floating Orbs - Smaller on mobile */}
        <div className='absolute top-5 sm:top-10 right-5 sm:right-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-white/10 rounded-full blur-2xl sm:blur-3xl animate-float' style={{willChange: 'transform'}}></div>
        <div className='absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-blue-300/15 rounded-full blur-2xl sm:blur-3xl animate-float' style={{animationDelay: '2s', willChange: 'transform'}}></div>
        
        {/* ----- left side ------*/}
        <div className='relative z-10 md:w-1/2 flex flex-col items-center md:items-start justify-center gap-3 sm:gap-4 md:gap-6 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 text-center md:text-left animate-fade-in-up'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight'>
                Book Appointment <br className='hidden sm:block'/> 
                <span className='bg-linear-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent'>
                    With Trusted Doctors
                </span>
            </h1>
        
            <div className='flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-4 text-white/90 text-xs sm:text-sm md:text-base'>
                <div className='relative group shrink-0'>
                    <div className='absolute inset-0 bg-white/20 rounded-full blur-lg sm:blur-xl group-hover:blur-2xl transition-all duration-500'></div>
                    <img className='relative w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 transform group-hover:scale-110 transition-transform duration-500' src={assets.group_profiles} alt='Trusted doctors' />
                </div>
                <p className='leading-relaxed max-w-xs sm:max-w-sm'>
                    Simply browse through our extensive list of trusted doctors. 
                    <span className='hidden sm:inline'><br/>Schedule your appointment hassle-free.</span>
                    <span className='sm:hidden'> Schedule hassle-free.</span>
                </p>
            </div>
            
            <a 
                href='#speciality'
                className='group relative flex items-center gap-2 bg-white text-primary px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base font-semibold w-auto overflow-hidden liquid-button shadow-xl sm:shadow-2xl hover:shadow-white/50 transition-all duration-500 mt-2' 
            >
                <span className='relative z-10 flex items-center gap-2'>
                    Book Appointment 
                    <img className='w-3 sm:w-4 transform group-hover:translate-x-1 transition-transform duration-300' src={assets.arrow_icon} alt='Arrow icon' />
                </span>
            </a>
        </div>

        {/* -----right side-----*/}
        <div className='relative z-10 md:w-1/2 mt-2 sm:mt-4 md:mt-0 animate-slide-in-right md:flex md:items-end'>
            <div className='relative group w-full overflow-visible'>
                <div className='absolute inset-0 bg-linear-to-r from-blue-400/20 to-purple-500/20 blur-2xl sm:blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 -z-10'></div>
                <img 
                    className='relative w-full max-w-[280px] sm:max-w-sm md:max-w-none mx-auto md:mx-0 h-auto object-contain object-bottom transform group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-700' 
                    src={assets.header_img} 
                    alt='Medical professionals'
                    style={{
                        mixBlendMode: 'screen',
                        opacity: 0.85,
                        filter: 'brightness(1.1) contrast(1.05)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
                    }}
                />
            </div>
        </div>
    </div>
  )
}

export default Header