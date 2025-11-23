import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
  const navigate = useNavigate()

  const footerLinks = [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
  ]

  const socialLinks = [
    { icon: '𝕏', url: '#', label: 'Twitter' },
    { icon: 'f', url: '#', label: 'Facebook' },
    { icon: 'in', url: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className='border-t border-gray-200 bg-white mt-16 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8'>
          {/* Left - Logo */}
          <div className='flex items-center'>
            <Logo className="scale-75 origin-left" />
          </div>

          {/* Center - Quick Links */}
          <div className='flex justify-center gap-6 md:gap-8'>
            {footerLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => navigate(link.path)}
                className='text-sm text-gray-600 hover:text-primary transition-colors duration-300 font-medium'
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right - Social Links */}
          <div className='flex justify-end gap-4'>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className='w-9 h-9 rounded-full bg-gray-100 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 text-gray-700 hover:text-primary font-medium text-xs'
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-200 pt-6'>
          {/* Bottom - Copyright and Info */}
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600'>
            <p>© 2025 <span className='font-semibold text-gray-900'>MediFlow</span>. All rights reserved.</p>
            <p>📧 hello@mediflow.com • 📞 +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer