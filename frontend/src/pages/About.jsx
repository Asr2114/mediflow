import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-3xl sm:rounded-[2.5rem] px-6 sm:px-12 lg:px-20 py-16 sm:py-24 mb-12 sm:mb-16 shadow-2xl'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
        <div className='relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up'>
              About <span className='bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent'>MediFlow</span>
            </h1>
            <p className='text-lg sm:text-xl text-blue-50 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0'>
              Revolutionizing healthcare accessibility with cutting-edge technology and compassionate care. 
              We connect patients with trusted medical professionals seamlessly.
            </p>
            <div className='flex flex-wrap justify-center lg:justify-start gap-6'>
              <div className='bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20'>
                <p className='text-3xl sm:text-4xl font-bold text-white'>10K+</p>
                <p className='text-blue-100 text-sm'>Happy Patients</p>
              </div>
              <div className='bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20'>
                <p className='text-3xl sm:text-4xl font-bold text-white'>500+</p>
                <p className='text-blue-100 text-sm'>Expert Doctors</p>
              </div>
              <div className='bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20'>
                <p className='text-3xl sm:text-4xl font-bold text-white'>50+</p>
                <p className='text-blue-100 text-sm'>Specialities</p>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-30 animate-pulse'></div>
              <img 
                src={assets.about_image} 
                alt='About MediFlow' 
                className='relative rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className='mb-16 sm:mb-24'>
        <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
          <div className='bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 group'>
            <div className='w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>Our Mission</h2>
            <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
              To make quality healthcare accessible to everyone, everywhere. We believe that finding the right doctor 
              should be simple, fast, and stress-free. Our platform bridges the gap between patients and healthcare providers.
            </p>
          </div>

          <div className='bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100 group'>
            <div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>Our Vision</h2>
            <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
              To become the world's most trusted healthcare platform, where technology meets compassion. 
              We envision a future where healthcare is personalized, preventive, and accessible to all.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className='mb-16 sm:mb-24'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4'>
          Our Core <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Values</span>
        </h2>
        <p className='text-center text-gray-600 mb-12 text-sm sm:text-base max-w-2xl mx-auto'>
          The principles that guide everything we do
        </p>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {[
            { icon: '💚', title: 'Compassion', desc: 'We care deeply about every patient and their journey to better health.' },
            { icon: '🔒', title: 'Trust', desc: 'Building trust through transparency, security, and reliability in every interaction.' },
            { icon: '⚡', title: 'Innovation', desc: 'Continuously improving our platform with cutting-edge technology and features.' },
            { icon: '🤝', title: 'Accessibility', desc: 'Making healthcare available to everyone, regardless of location or background.' },
            { icon: '⭐', title: 'Excellence', desc: 'Striving for the highest standards in everything we do.' },
            { icon: '🌍', title: 'Community', desc: 'Building a supportive community of patients and healthcare professionals.' }
          ].map((value, index) => (
            <div 
              key={index}
              className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2'
            >
              <div className='text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300'>{value.icon}</div>
              <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-3'>{value.title}</h3>
              <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 sm:p-12 lg:p-16 mb-16 sm:mb-24'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4'>
          Why Choose <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>MediFlow</span>
        </h2>
        <p className='text-center text-gray-600 mb-12 text-sm sm:text-base max-w-2xl mx-auto'>
          Experience healthcare reimagined
        </p>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[
            { title: 'Easy Booking', desc: 'Book appointments in seconds with our intuitive platform', icon: '📅' },
            { title: 'Verified Doctors', desc: 'All doctors are verified and certified professionals', icon: '✅' },
            { title: '24/7 Support', desc: 'Round-the-clock customer support for all your needs', icon: '🔄' },
            { title: 'Secure Platform', desc: 'Your data is protected with enterprise-grade security', icon: '🛡️' }
          ].map((feature, index) => (
            <div 
              key={index}
              className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center'
            >
              <div className='text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300'>{feature.icon}</div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>{feature.title}</h3>
              <p className='text-sm text-gray-600'>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
