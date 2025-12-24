import React, { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {

    const {aToken, setAToken, doctors, appointments} = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        // Clear admin token
        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
        // Clear doctor token
        if (dToken) {
            setDToken('');
            localStorage.removeItem('dToken');
        }
        // Navigate to login
        navigate('/');
    }

    const pendingCount = appointments?.filter(a => !a.cancelled && !a.isCompleted).length || 0;

    return (
        <nav className={`sticky top-0 z-40 w-full transition-all duration-500 ${scrolled ? 'bg-white/95 shadow-lg shadow-gray-200/50 backdrop-blur-xl' : 'bg-white shadow-sm border-b border-gray-100'}`}>
            {/* Animated top accent */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-indigo-500 to-purple-500 animate-gradient-shift'></div>
            
            {/* Main Navbar Container */}
            <div className='flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-4'>
                
                {/* Logo Section - Left */}
                <div className='flex items-center animate-fade-in'>
                    <Logo className="scale-75 sm:scale-90" />
                </div>

                {/* Panel Label - Center (Hidden on mobile) */}
                <div className='hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2'>
                    <div className={`flex items-center gap-3 px-5 py-2 rounded-2xl border ${aToken ? 'bg-linear-to-r from-primary/10 via-indigo-500/10 to-purple-500/10 border-primary/20' : 'bg-linear-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border-green-500/20'}`}>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                        <span className={`text-xs font-bold tracking-widest ${aToken ? 'text-primary' : 'text-green-600'}`}>{aToken ? 'ADMIN CONTROL CENTER' : 'DOCTOR PORTAL'}</span>
                    </div>
                </div>

                {/* Right Section - Stats, Notifications & Profile */}
                <div className='flex items-center gap-2 sm:gap-4'>
                    
                    {/* Quick Stats (Hidden on mobile) */}
                    <div className='hidden lg:flex items-center gap-3'>
                        <div className='flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl border border-blue-100'>
                            <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                            </svg>
                            <span className='text-xs font-bold text-blue-700'>{doctors?.length || 0}</span>
                        </div>
                        <div className='flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-xl border border-purple-100'>
                            <svg className='w-4 h-4 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                            <span className='text-xs font-bold text-purple-700'>{appointments?.length || 0}</span>
                        </div>
                    </div>

                    {/* Notification Bell */}
                    <button className='relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 group'>
                        <svg className='w-5 h-5 text-gray-600 group-hover:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                        </svg>
                        {pendingCount > 0 && (
                            <span className='absolute -top-0.5 -right-0.5 w-5 h-5 bg-linear-to-br from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in'>
                                {pendingCount > 9 ? '9+' : pendingCount}
                            </span>
                        )}
                    </button>

                    {/* Divider */}
                    <div className='hidden sm:block h-8 w-px bg-gray-200'></div>

                    {/* Profile Dropdown */}
                    <div className='relative'>
                        <button 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className='flex items-center gap-2.5 px-2 sm:px-3 py-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300 group relative'
                        >
                            {/* Profile Avatar */}
                            <div className='relative'>
                                <div className='absolute inset-0 bg-linear-to-br from-primary to-indigo-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300'></div>
                                <div className={`relative w-9 h-9 bg-linear-to-br ${aToken ? 'from-primary via-indigo-600 to-purple-600' : 'from-green-500 to-emerald-600'} rounded-xl flex items-center justify-center shadow-lg shadow-primary/20`}>
                                    <span className='text-white font-bold text-sm'>{aToken ? 'A' : 'D'}</span>
                                </div>
                                <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                            </div>

                            {/* User Label */}
                            <div className='hidden sm:flex flex-col items-start'>
                                <span className='text-sm font-bold text-gray-800'>{aToken ? 'Admin' : 'Doctor'}</span>
                                <span className='text-[10px] text-gray-500'>{aToken ? 'Super Admin' : 'Healthcare'}</span>
                            </div>

                            {/* Dropdown Arrow */}
                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                        </button>

                        {/* Profile Menu Dropdown */}
                        {showProfileMenu && (
                            <>
                                {/* Overlay to close menu */}
                                <div 
                                    className='fixed inset-0 z-40'
                                    onClick={() => setShowProfileMenu(false)}
                                ></div>
                                
                                <div className='absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-gray-300/50 border border-gray-100 overflow-hidden z-50 animate-scale-in'>
                                    
                                    {/* Menu Header */}
                                    <div className='p-4 bg-linear-to-br from-primary/10 via-indigo-500/10 to-purple-500/10 border-b border-gray-100'>
                                        <div className='flex items-center gap-3'>
                                            <div className={`w-12 h-12 bg-linear-to-br ${aToken ? 'from-primary via-indigo-600 to-purple-600' : 'from-green-500 to-emerald-600'} rounded-xl flex items-center justify-center shadow-lg`}>
                                                <span className='text-white font-bold text-lg'>{aToken ? 'A' : 'D'}</span>
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold text-gray-900'>{aToken ? 'Admin Account' : 'Doctor Account'}</p>
                                                <p className='text-xs text-gray-500'>admin@mediflow.com</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className='p-2'>
                                        <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 group/item'>
                                            <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover/item:bg-primary/10 transition-colors'>
                                                <svg className='w-4 h-4 text-gray-500 group-hover/item:text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                </svg>
                                            </div>
                                            <span className='font-medium'>Settings</span>
                                        </button>
                                        
                                        <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 group/item'>
                                            <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover/item:bg-primary/10 transition-colors'>
                                                <svg className='w-4 h-4 text-gray-500 group-hover/item:text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                </svg>
                                            </div>
                                            <span className='font-medium'>Help Center</span>
                                        </button>
                                    </div>

                                    {/* Logout Button */}
                                    <div className='p-2 border-t border-gray-100'>
                                        <button 
                                            onClick={() => {
                                                logout();
                                                setShowProfileMenu(false);
                                            }}
                                            className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 group/item'
                                        >
                                            <div className='w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover/item:bg-red-100 transition-colors'>
                                                <svg className='w-4 h-4 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                                </svg>
                                            </div>
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar