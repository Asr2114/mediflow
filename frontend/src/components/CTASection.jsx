import React from 'react'
import { useNavigate } from 'react-router-dom'

const CTASection = () => {
  const navigate = useNavigate()

  return (
    <div className='py-16 sm:py-24 px-4 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <div className='relative bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden'>
          {/* Animated Background Elements */}
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute inset-0' style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className='absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float'></div>
          <div className='absolute bottom-10 left-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-float' style={{animationDelay: '2s'}}></div>
          
          <div className='relative z-10 text-center'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6'>
              Ready to Get Started?
            </h2>
            <p className='text-lg sm:text-xl text-blue-50 mb-8 sm:mb-10 max-w-2xl mx-auto'>
              Join thousands of patients who trust MediFlow for their healthcare needs. Book your appointment today!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <button
                onClick={() => navigate('/doctors')}
                className='group relative bg-white text-primary px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold overflow-hidden liquid-button shadow-2xl hover:shadow-white/50 transition-all duration-500 w-full sm:w-auto'
              >
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  Browse Doctors
                  <svg className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => navigate('/contact')}
                className='group relative border-2 border-white text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-500 w-full sm:w-auto'
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTASection

