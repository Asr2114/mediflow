import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const { token, setToken , userData} = useContext(AppContext);

    const navigate = useNavigate();


    const [showMenu, setShowMenu] = useState(false);


    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/');
    }


    return (
        <nav className='sticky top-0 z-50 flex items-center justify-between text-sm py-3 sm:py-5 mb-4 sm:mb-6 border-b border-gray-200 bg-white/95 backdrop-blur-xl'>
            <Logo className="relative" />

            <ul className='hidden md:flex items-center gap-8 font-medium'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `relative group ${isActive ? 'text-primary active-link' : 'text-gray-700'}`
                    }
                >
                    <li className='py-1 transition-colors duration-200 group-hover:text-primary'>Home</li>
                    <hr className='nav-indicator border-none outline-none h-0.5 bg-primary w-3/5 m-auto transition-all duration-300 hidden group-hover:block' />
                </NavLink>
                <NavLink
                    to='/doctors'
                    className={({ isActive }) =>
                        `relative group ${isActive ? 'text-primary active-link' : 'text-gray-700'}`
                    }
                >
                    <li className='py-1 transition-colors duration-200 group-hover:text-primary'>All Doctors</li>
                    <hr className='nav-indicator border-none outline-none h-0.5 bg-primary w-3/5 m-auto transition-all duration-300 hidden group-hover:block' />
                </NavLink>
                <NavLink
                    to='/about'
                    className={({ isActive }) =>
                        `relative group ${isActive ? 'text-primary active-link' : 'text-gray-700'}`
                    }
                >
                    <li className='py-1 transition-colors duration-200 group-hover:text-primary'>About</li>
                    <hr className='nav-indicator border-none outline-none h-0.5 bg-primary w-3/5 m-auto transition-all duration-300 hidden group-hover:block' />
                </NavLink>
                <NavLink
                    to='/contact'
                    className={({ isActive }) =>
                        `relative group ${isActive ? 'text-primary active-link' : 'text-gray-700'}`
                    }
                >
                    <li className='py-1 transition-colors duration-200 group-hover:text-primary'>Contact</li>
                    <hr className='nav-indicator border-none outline-none h-0.5 bg-primary w-3/5 m-auto transition-all duration-300 hidden group-hover:block' />
                </NavLink>

               

                    <NavLink
                    
                    onClick={() => {
                                    window.open("https://mediflow-admin-tau.vercel.app/", "_blank");
                                    
                                }}

                    
                >
                    <li className='py-1.5 px-4 transition-all duration-300 text-white bg-linear-to-r from-primary to-indigo-600 border border-primary rounded-full text-xs font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-105'>Admin Panel</li>
                    <hr className='nav-indicator border-none outline-none h-0.5 bg-primary w-3/5 m-auto transition-all duration-300 hidden group-hover:block' />
                </NavLink>            
            </ul>

            <div className='flex items-center gap-2 sm:gap-4'>
                {
                    token && userData
                        ? <div className='hidden sm:flex gap-2 items-center cursor-pointer group relative'>
                            <div className='flex items-center gap-2 hover:opacity-90 transition-opacity relative'>
                                <div className='absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                <img className='relative w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-primary group-hover:ring-4 transition-all duration-300 shadow-lg group-hover:shadow-primary/50' src={userData.image} alt="Profile" />
                                <div className='relative'>
                                    <img className='w-3 transition-transform duration-300 group-hover:rotate-180' src={assets.dropdown_icon} alt="" />
                                </div>
                            </div>
                            <div className='absolute top-0 right-0 pt-16 text-base font-medium z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2'>
                                <div className='relative min-w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col gap-1 p-2 overflow-hidden'>
                                    {/* Animated Background Gradient */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                                    {/* Floating Orbs */}
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                    <div className='absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

                                    {/* Menu Items */}
                                    <div className='relative z-10'>
                                        <button
                                            onClick={() => { navigate('/my-profile'); setShowMenu(false) }}
                                            className='group/item w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-indigo-500/10 hover:shadow-lg hover:scale-[1.02]'
                                        >
                                            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-indigo-500/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-indigo-500/30 transition-all duration-300'>
                                                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                                </svg>
                                            </div>
                                            <span className='font-semibold text-gray-700 group-hover:text-primary transition-colors duration-300'>My Profile</span>
                                            <svg className='w-4 h-4 text-gray-400 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => { navigate('/my-appointments'); setShowMenu(false) }}
                                            className='group/item w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-indigo-500/10 hover:shadow-lg hover:scale-[1.02]'
                                        >
                                            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300'>
                                                <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                </svg>
                                            </div>
                                            <span className='font-semibold text-gray-700 group-hover:text-primary transition-colors duration-300'>My Appointments</span>
                                            <svg className='w-4 h-4 text-gray-400 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                            </svg>
                                        </button>

                                        <div className='my-2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>

                                        <button
                                            onClick={logout}
                                            className='group/item w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:shadow-lg hover:scale-[1.02]'
                                        >
                                            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-rose-500/30 transition-all duration-300'>
                                                <svg className='w-4 h-4 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                                </svg>
                                            </div>
                                            <span className='font-semibold text-gray-700 group-hover:text-red-600 transition-colors duration-300'>Logout</span>
                                            <svg className='w-4 h-4 text-gray-400 ml-auto group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <button
                            onClick={() => navigate('/login')}
                            className='cursor-pointer bg-linear-to-r from-primary to-indigo-600 text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hidden md:block hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95 btn-premium'
                        >
                            Create Account
                        </button>
                }

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu" />

                {/* Mobile Menu Overlay */}
                {showMenu && (
                    <div
                        className='fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-40 md:hidden'
                        onClick={() => setShowMenu(false)}
                    ></div>
                )}

                {/* Mobile Menu Sidebar */}
                <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className='flex items-center justify-between px-5 py-6 border-b border-gray-200 flex-shrink-0'>
                        <Logo className="scale-90" />
                        <img
                            onClick={() => setShowMenu(false)}
                            className='w-6 cursor-pointer hover:scale-110 transition-transform duration-200'
                            src={assets.cross_icon}
                            alt="Close"
                        />
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        <ul className='flex flex-col mt-4'>
                            <NavLink
                                to='/'
                                onClick={() => setShowMenu(false)}
                                className={({ isActive }) =>
                                    `px-5 py-4 text-base font-medium transition-colors duration-200 ${isActive ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-gray-700 hover:bg-gray-50'}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to='/doctors'
                                onClick={() => setShowMenu(false)}
                                className={({ isActive }) =>
                                    `px-5 py-4 text-base font-medium transition-colors duration-200 ${isActive ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-gray-700 hover:bg-gray-50'}`
                                }
                            >
                                All Doctors
                            </NavLink>
                            <NavLink
                                to='/about'
                                onClick={() => setShowMenu(false)}
                                className={({ isActive }) =>
                                    `px-5 py-4 text-base font-medium transition-colors duration-200 ${isActive ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-gray-700 hover:bg-gray-50'}`
                                }
                            >
                                About
                            </NavLink>
                            <NavLink
                                to='/contact'
                                onClick={() => setShowMenu(false)}
                                className={({ isActive }) =>
                                    `px-5 py-4 text-base font-medium transition-colors duration-200 ${isActive ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-gray-700 hover:bg-gray-50'}`
                                }
                            >
                                Contact
                            </NavLink>
                             <NavLink
                                
                                onClick={() => {
                                    window.open("https://mediflow-admin-tau.vercel.app/", "_blank");
                                    setShowMenu(false);
                                }}
                                className=
                                    'px-5 py-4 text-base font-medium transition-colors duration-200 text-primary'
                                
                            >
                                Admin Panel
                            </NavLink>
                        </ul>
                    </div>

                    {/* Mobile Profile Section */}
                    {token ? (
                        <div className='border-t border-gray-200 p-5 flex-shrink-0 bg-white'>
                            <div className='flex items-center gap-3 mb-4'>
                                <img className='w-10 h-10 rounded-full object-cover ring-2 ring-gray-200' src={assets.profile_pic} alt="Profile" />
                                <div>
                                    <p className='text-sm font-medium text-gray-900'>Profile</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { navigate('/my-profile'); setShowMenu(false) }}
                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150'
                            >
                                My Profile
                            </button>
                            <button
                                onClick={() => { navigate('/my-appointments'); setShowMenu(false) }}
                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150'
                            >
                                My Appointments
                            </button>
                            <button
                                onClick={() => { setToken(false); setShowMenu(false) }}
                                className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150 mt-2'
                            >
                                Logout
                            </button>
                            

                        </div>
                    ) : (
                        <div className='border-t border-gray-200 p-5 flex-shrink-0 bg-white'>
                            <button
                                onClick={() => { navigate('/login'); setShowMenu(false) }}
                                className='w-full bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-200'
                            >
                                Create Account
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;