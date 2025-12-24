import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
    const [isOpen, setIsOpen] = useState(false)

    const adminMenuItems = [
        {
            to: '/dashboard',
            label: 'Dashboard',
            icon: (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                </svg>
            ),
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            to: '/all-appointments',
            label: 'Appointments',
            icon: (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
            ),
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            to: '/add-doctor',
            label: 'Add Doctor',
            icon: (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                </svg>
            ),
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            to: '/doctors',
            label: 'Doctors List',
            icon: (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
            ),
            gradient: 'from-pink-500 to-rose-500'
        },
    ]

    const doctorMenuItems = [
        {
            to: '/doctor-dashboard',
            label: 'Dashboard',
            icon: (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                </svg>
            ),
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            to: '/doctor-appointments',
            label: 'Appointments',
            icon: (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
            ),
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            to: '/doctor-profile',
            label: 'My Profile',
            icon: (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
            ),
            gradient: 'from-purple-500 to-pink-500'
        },
    ]

    const menuItems = aToken ? adminMenuItems : doctorMenuItems
    const panelType = aToken ? 'Admin' : 'Doctor'

  return (
    <>
        {(aToken || dToken) && (
            <>
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className='md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-linear-to-br from-primary via-indigo-600 to-blue-600 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center animate-bounce-in'
                >
                    {isOpen ? (
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    ) : (
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                        </svg>
                    )}
                </button>

                {/* Mobile Overlay */}
                {isOpen && (
                    <div 
                        className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-fade-in'
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Sidebar Container */}
                <aside className={`fixed md:sticky left-0 top-0 md:top-[73px] h-screen md:h-[calc(100vh-73px)] w-72 lg:w-80 glass border-r border-gray-200 transform transition-all duration-500 ease-out z-40 md:z-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    
                    {/* Mobile Header */}
                    <div className='md:hidden flex items-center justify-between p-6 border-b border-gray-100'>
                        <h2 className='text-xl font-bold bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Menu</h2>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className='p-2 hover:bg-gray-100 rounded-xl transition-colors'
                        >
                            <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar Header - Desktop */}
                    <div className='hidden md:block pt-6 pb-4 px-6'>
                        <div className='flex items-center gap-3 p-4 bg-linear-to-r from-primary/10 to-indigo-500/10 rounded-2xl border border-primary/20'>
                            <div className={`w-10 h-10 bg-linear-to-br ${aToken ? 'from-primary to-indigo-600' : 'from-green-500 to-emerald-600'} rounded-xl flex items-center justify-center shadow-lg ${aToken ? 'shadow-primary/30' : 'shadow-green-500/30'}`}>
                                {aToken ? (
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                    </svg>
                                ) : (
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <p className='text-sm font-bold text-gray-900'>{panelType} Panel</p>
                                <p className='text-xs text-gray-500'>MediFlow Healthcare</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className='flex-1 overflow-y-auto px-4 py-4'>
                        <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-4'>Navigation</p>
                        <ul className='space-y-2'>
                            {menuItems.map((item, index) => (
                                <li key={index} className='animate-fade-in-up' style={{animationDelay: `${index * 0.1}s`}}>
                                    <NavLink
                                        to={item.to}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `sidebar-item flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                                                isActive
                                                    ? 'bg-linear-to-r from-primary/10 to-indigo-500/10 text-gray-900 shadow-lg shadow-primary/10'
                                                    : 'text-gray-600 hover:bg-white/80 hover:text-gray-900 hover:shadow-md'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {/* Icon Container */}
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                    isActive 
                                                        ? `bg-linear-to-br ${item.gradient} text-white shadow-lg` 
                                                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                                }`}>
                                                    {item.icon}
                                                </div>
                                                
                                                {/* Label */}
                                                <span className='font-semibold text-sm flex-1'>{item.label}</span>
                                                
                                                {/* Arrow */}
                                                <svg className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-primary opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                                </svg>

                                                {/* Active Indicator */}
                                                {isActive && (
                                                    <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-primary to-indigo-600 rounded-r-full'></div>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className='p-4 border-t border-gray-100'>
                        <div className='p-4 bg-linear-to-br from-primary/5 to-indigo-500/5 rounded-2xl border border-primary/10'>
                            <div className='flex items-center gap-3 mb-3'>
                                <div className='w-8 h-8 bg-linear-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center'>
                                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-xs font-semibold text-gray-800'>System Status</p>
                                    <p className='text-[10px] text-green-600 font-medium'>All systems operational</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-xs text-gray-500'>
                                <span>Version 2.0</span>
                                <span className='flex items-center gap-1'>
                                    <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </>
        )}
    </>
  )
}

export default Sidebar