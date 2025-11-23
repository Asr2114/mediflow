import React from 'react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      image: '👩',
      text: 'MediFlow made booking my appointment so easy! The interface is beautiful and the doctors are amazing.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      image: '👨',
      text: 'Best healthcare platform I\'ve used. Quick, reliable, and the support team is always helpful.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Patient',
      image: '👩‍🦰',
      text: 'The transparency and ease of use is incredible. Found my perfect doctor in minutes!',
      rating: 5
    }
  ]

  return (
    <div className='py-16 sm:py-24 px-4 bg-gradient-to-br from-primary/5 via-indigo-50 to-purple-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            What Our <span className='bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Patients</span> Say
          </h2>
          <p className='text-gray-600 text-sm sm:text-base max-w-2xl mx-auto'>
            Real experiences from real patients
          </p>
        </div>
        
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className='group relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 card-hover animate-scale-in'
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className='absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-300'>"</div>
              <div className='relative z-10'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-lg'>
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900'>{testimonial.name}</h4>
                    <p className='text-sm text-gray-500'>{testimonial.role}</p>
                  </div>
                </div>
                <div className='flex gap-1 mb-3'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className='text-yellow-400 text-lg'>⭐</span>
                  ))}
                </div>
                <p className='text-gray-600 text-sm sm:text-base leading-relaxed italic'>
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection

