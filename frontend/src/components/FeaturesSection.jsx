import React from 'react'

const FeaturesSection = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Book appointments in seconds with our streamlined booking system',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your medical data is protected with enterprise-grade security',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access your appointments anytime, anywhere on any device',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: '✅',
      title: 'Verified Doctors',
      description: 'All doctors are verified and certified medical professionals',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your healthcare needs',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: '📊',
      title: 'Health Records',
      description: 'Keep track of your medical history and appointments in one place',
      gradient: 'from-red-400 to-rose-500'
    }
  ]

  return (
    <div className='py-16 sm:py-24 px-4 bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            Why Choose <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>MediFlow</span>
          </h2>
          <p className='text-gray-600 text-sm sm:text-base max-w-2xl mx-auto'>
            Experience healthcare reimagined with cutting-edge features
          </p>
        </div>
        
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {features.map((feature, index) => (
            <div 
              key={index}
              className='group relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 card-hover animate-scale-in'
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
              <div className='relative z-10'>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection

