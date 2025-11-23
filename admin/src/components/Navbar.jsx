import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const logout = () =>{
        navigate('/')
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
    }

    return (
        <nav className='sticky top-0 z-40 w-full bg-white/95 border-b border-gray-200/50 backdrop-blur-xl'>
            {/* Main Navbar Container */}
            <div className='flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-4'>
                
                {/* Logo Section - Left */}
                <div className='flex items-center'>
                    <Logo className="scale-75 sm:scale-90" />
                </div>

                {/* Admin Label - Center (Hidden on mobile) */}
                <div className='hidden sm:flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2'>
                    <div className='h-8 w-px bg-gray-200'></div>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0'></div>
                        <div className='relative px-4 py-1 rounded-full bg-primary/5 border border-primary/20'>
                            <span className='text-xs font-semibold text-primary tracking-wide'>ADMIN PANEL</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Profile & Actions */}
                <div className='flex items-center gap-3 sm:gap-6'>
                    
                    

                  

                    {/* Profile Dropdown */}
                    <div className='relative'>
                        <button 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className='flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300 group relative'
                        >
                            {/* Profile Avatar */}
                            <div className='relative'>
                                <div className='absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                <div className='relative w-8 h-8 bg-linear-to-br from-primary/30 to-indigo-500/30 rounded-full border border-primary/40 flex items-center justify-center'>
                                    <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                    </svg>
                                </div>
                            </div>

                            {/* Admin Label */}
                            <div className='hidden sm:flex flex-col items-start'>
                                <span className='text-xs font-semibold text-gray-700'>Admin</span>
                                <span className='text-[10px] text-gray-500'>mediflow</span>
                            </div>

                            {/* Dropdown Arrow */}
                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                            </svg>
                        </button>

                        {/* Profile Menu Dropdown */}
                        {showProfileMenu && (
                            <div className='absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                                
                                {/* Menu Header */}
                                <div className='px-4 py-3 border-b border-gray-100'>
                                    <p className='text-sm font-semibold text-gray-900'>Admin Account</p>
                                    <p className='text-xs text-gray-500 mt-1'>admin@mediflow.com</p>
                                </div>

                                

                              

                                {/* Logout Button */}
                                <button 
                                    onClick={() => {
                                        logout();
                                        setShowProfileMenu(false);
                                    }}
                                    className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group/item'
                                >
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}

                        {/* Overlay to close menu */}
                        {showProfileMenu && (
                            <div 
                                className='fixed inset-0 z-40'
                                onClick={() => setShowProfileMenu(false)}
                            ></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Border Gradient */}
            <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent'></div>
        </nav>
    )
}

export default Navbar