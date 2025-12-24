import React from 'react'

const StatsSection = () => {
  const stats = [
    { number: '10K+', label: 'Happy Patients', icon: '❤️', color: 'from-red-400 to-pink-500' },
    { number: '500+', label: 'Expert Doctors', icon: '👨‍⚕️', color: 'from-blue-400 to-cyan-500' },
    { number: '50+', label: 'Specialities', icon: '🏥', color: 'from-green-400 to-emerald-500' },
    { number: '24/7', label: 'Support', icon: '💬', color: 'from-purple-400 to-indigo-500' }
  ]

  return (
    <div className='py-16 sm:py-24 px-4 bg-gradient-to-b from-white to-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            Trusted by <span className='bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Thousands</span>
          </h2>
          <p className='text-gray-600 text-sm sm:text-base max-w-2xl mx-auto'>
            Join thousands of satisfied patients who trust MediFlow for their healthcare needs
          </p>
        </div>
        
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className='group relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 card-hover animate-scale-in'
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
              <div className='relative z-10 text-center'>
                <div className='text-4xl sm:text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300'>{stat.icon}</div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <p className='text-gray-600 font-medium text-sm sm:text-base'>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsSection

