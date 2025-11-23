import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const [isOpen, setIsOpen] = useState(false)

    const menuItems = [
        {
            to: '/dashboard',
            icon: assets.home_icon,
            label: 'Dashboard',
            bgColor: 'bg-blue-500/10'
        },
        {
            to: '/all-appointments',
            icon: assets.appointment_icon,
            label: 'Appointments',
            bgColor: 'bg-indigo-500/10'
        },
        {
            to: '/add-doctor',
            icon: assets.add_icon,
            label: 'Add Doctor',
            bgColor: 'bg-purple-500/10'
        },
        {
            to: '/doctors',
            icon: assets.people_icon,
            label: 'Doctors List',
            bgColor: 'bg-pink-500/10'
        },
    ]

  return (
    <>
        {aToken && (
            <>
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className='md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-primary via-indigo-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center'
                >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                    </svg>
                </button>

                {/* Mobile Overlay */}
                {isOpen && (
                    <div 
                        className='fixed inset-0 bg-black/30 z-40 md:hidden'
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Sidebar Container */}
                <aside className={`fixed md:static left-0 top-0 h-screen md:h-auto w-64 md:w-72 lg:w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 z-40 md:z-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    
                    {/* Close Button (Mobile) */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className='md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors'
                    >
                        <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>

                    {/* Sidebar Header */}
                    <div className='hidden md:flex items-center justify-center pt-8 pb-6 px-4 border-b border-gray-100'>
                        <h3 className='text-lg font-bold bg-linear-to-r from-primary via-indigo-600 to-blue-600 bg-clip-text text-transparent'>Admin Menu</h3>
                    </div>

                    {/* Navigation Items */}
                    <nav className='flex-1 overflow-y-auto px-3 py-6 md:py-4'>
                        <ul className='space-y-2'>
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.to}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                                                isActive
                                                    ? `${item.bgColor} border-l-4 border-primary text-gray-900`
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                            'group-hover:scale-110'
                                        }`}>
                                            <img src={item.icon} alt={item.label} className='w-5 h-5' />
                                        </div>
                                        <span className='font-semibold text-sm md:text-base'>{item.label}</span>
                                        <svg className='w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                        </svg>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className='hidden md:block px-4 py-6 border-t border-gray-100'>
                        <div className='bg-linear-to-br from-primary/5 to-blue-500/5 rounded-xl p-4 text-center'>
                            <p className='text-xs text-gray-600 font-semibold'>Admin Panel v1.0</p>
                            <p className='text-xs text-gray-500 mt-1'>MediFlow Healthcare</p>
                        </div>
                    </div>
                </aside>
            </>
        )}
    </>
  )
}

export default Sidebar