import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
  const navigate = useNavigate()

  const footerLinks = [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy', path: '/' },
    { label: 'Terms', path: '/' },
  ]

  const socialLinks = [
    { icon: '𝕏', url: '#', label: 'Twitter' },
    { icon: 'f', url: '#', label: 'Facebook' },
    { icon: 'in', url: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className='relative overflow-hidden border-t border-gray-200 bg-linear-to-br from-gray-50 via-white to-blue-50 mt-12 sm:mt-16 py-8 sm:py-12'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
      <div className='absolute bottom-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2'></div>
      
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Content */}
        <div className='flex flex-col gap-6 sm:gap-8'>
          {/* Top Row - Logo and Social */}
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <Logo className="scale-75 sm:scale-100 origin-center sm:origin-left" />
            
            {/* Social Links */}
            <div className='flex justify-center gap-2 sm:gap-3'>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-linear-to-br hover:from-primary hover:to-indigo-600 flex items-center justify-center transition-all duration-300 text-gray-600 hover:text-white font-medium text-sm hover:scale-110'
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8'>
            {footerLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => navigate(link.path)}
                className='text-xs sm:text-sm text-gray-600 hover:text-primary transition-all duration-300 font-medium hover:scale-105'
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className='h-px bg-linear-to-r from-transparent via-gray-300 to-transparent'></div>

          {/* Bottom - Copyright and Contact Info */}
          <div className='flex flex-col items-center gap-3 sm:gap-4 text-xs text-gray-600'>
            <p>© 2025 <span className='font-semibold bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>MediFlow</span>. All rights reserved.</p>
            <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3'>
              <span className='flex items-center gap-1'>📧 hello@mediflow.com</span>
              <span className='hidden sm:inline text-gray-300'>•</span>
              <span className='flex items-center gap-1'>📞 +1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer