import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='min-h-screen px-2 sm:px-0'>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] px-4 sm:px-8 lg:px-16 xl:px-20 py-10 sm:py-16 lg:py-24 mb-8 sm:mb-12 lg:mb-16 shadow-2xl'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
        <div className='relative z-10 text-center'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight'>
            Get in <span className='bg-linear-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent'>Touch</span>
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed px-4'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16'>
        {/* Contact Form */}
        <div className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-10 xl:p-12 shadow-2xl border border-gray-100'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>Send us a Message</h2>
          <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>Full Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base'
                placeholder='John Doe'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>Email Address</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base'
                placeholder='john@example.com'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>Phone Number</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base'
                placeholder='+1 234 567 8900'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>Subject</label>
              <input
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                required
                className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base'
                placeholder='How can we help?'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>Message</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none text-sm sm:text-base'
                placeholder='Tell us more about your inquiry...'
              ></textarea>
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-linear-to-r from-primary to-indigo-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className='space-y-4 sm:space-y-6'>
          <div className='bg-linear-to-br from-primary to-indigo-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 xl:p-12 text-white shadow-2xl'>
            <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6'>Contact Information</h2>
            <div className='space-y-4 sm:space-y-6'>
              <div className='flex items-start gap-3 sm:gap-4'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl flex items-center justify-center shrink-0'>
                  <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base'>Email</h3>
                  <p className='text-blue-100 text-xs sm:text-sm'>support@mediflow.com</p>
                  <p className='text-blue-100 text-xs sm:text-sm'>info@mediflow.com</p>
                </div>
              </div>
              <div className='flex items-start gap-3 sm:gap-4'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl flex items-center justify-center shrink-0'>
                  <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base'>Phone</h3>
                  <p className='text-blue-100 text-xs sm:text-sm'>+1 (555) 123-4567</p>
                  <p className='text-blue-100 text-xs sm:text-sm'>+1 (555) 987-6543</p>
                </div>
              </div>
              <div className='flex items-start gap-3 sm:gap-4'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl flex items-center justify-center shrink-0'>
                  <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base'>Address</h3>
                  <p className='text-blue-100 text-xs sm:text-sm'>123 Healthcare Avenue</p>
                  <p className='text-blue-100 text-xs sm:text-sm'>Medical District, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl border border-gray-100'>
            <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4'>Business Hours</h3>
            <div className='space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base'>
              <div className='flex justify-between'>
                <span className='font-medium'>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div className='bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-blue-100'>
            <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4'>Follow Us</h3>
            <div className='flex gap-3 sm:gap-4'>
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <div
                  key={social}
                  className='w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer'
                >
                  <span className='text-base sm:text-lg'>📱</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
