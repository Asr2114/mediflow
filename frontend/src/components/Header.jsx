import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='relative flex flex-col md:flex-row rounded-3xl sm:rounded-[2.5rem] px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden shadow-2xl mb-6 sm:mb-8 group'>
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
        <div className='absolute inset-0 opacity-8' style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Reduced Medical Grid Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          {/* Reduced Heartbeat Graphs */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className='absolute' style={{
              left: `${20 + i * 20}%`,
              top: `${25 + (i % 2) * 40}%`,
              width: '80px',
              height: '40px',
              opacity: 0.15,
              animation: `pulse 4s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              willChange: 'opacity'
            }}>
              <svg viewBox="0 0 100 50" className='w-full h-full'>
                <path d="M0,25 L10,20 L20,25 L30,15 L40,25 L50,20 L60,25 L70,18 L80,25 L90,22 L100,25" 
                      stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
                <circle cx="50" cy="25" r="3" fill="white" opacity="0.8"/>
              </svg>
            </div>
          ))}
          
          {/* Reduced Medical Monitor Grid */}
          {[...Array(6)].map((_, i) => (
            <div key={`monitor-${i}`} className='absolute border border-white/10 rounded' style={{
              left: `${15 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 40}%`,
              width: '60px',
              height: '45px',
              opacity: 0.1,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
            }}>
              <div className='absolute inset-2 bg-white/5 rounded'></div>
              <div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white/15 rounded'></div>
            </div>
          ))}
        </div>
        
        {/* Reduced Floating Orbs */}
        <div className='absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float' style={{willChange: 'transform'}}></div>
        <div className='absolute bottom-10 left-10 w-40 h-40 bg-blue-300/15 rounded-full blur-3xl animate-float' style={{animationDelay: '2s', willChange: 'transform'}}></div>
        
        {/* ----- left side ------*/}
        <div className='relative z-10 md:w-1/2 flex flex-col items-start justify-center gap-4 sm:gap-6 py-8 sm:py-10 md:py-16 lg:py-20 animate-fade-in-up'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight'>
                Book Appointment <br/> 
                <span className='bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent'>
                    With Trusted Doctors
                </span>
            </h1>
        
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-white/90 text-xs sm:text-sm md:text-base'>
                <div className='relative group'>
                    <div className='absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500'></div>
                    <img className='relative w-24 sm:w-32 md:w-36 shrink-0 transform group-hover:scale-110 transition-transform duration-500' src={assets.group_profiles} alt='Trusted doctors' />
                </div>
                <p className='leading-relaxed'>
                    Simply browse through our extensive list of trusted doctors. <br className='hidden sm:block'/>
                    Schedule your appointment hassle-free.
                </p>
            </div>
            
            <a 
                href='#speciality'
                className='group relative flex items-center gap-2 bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold w-auto overflow-hidden liquid-button shadow-2xl hover:shadow-white/50 transition-all duration-500' 
            >
                <span className='relative z-10 flex items-center gap-2'>
                    Book Appointment 
                    <img className='w-4 transform group-hover:translate-x-1 transition-transform duration-300' src={assets.arrow_icon} alt='Arrow icon' />
                </span>
            </a>
        </div>

        {/* -----right side-----*/}
        <div className='relative z-10 md:w-1/2 mt-4 sm:mt-6 md:mt-0 animate-slide-in-right md:flex md:items-end'>
            <div className='relative group w-full overflow-visible'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 -z-10'></div>
                <img 
                    className='relative w-full h-auto object-contain object-bottom transform group-hover:scale-110 transition-transform duration-700' 
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