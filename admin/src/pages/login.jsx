import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const {setAToken, backendUrl} = useContext(AdminContext);
  const {setDToken} = useContext(DoctorContext);

  
  

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!validateForm()) return
    
    setIsLoading(true)
    try {

        if(state === 'Admin'){
            //admin api call
            const {data} = await axios.post(backendUrl + '/api/admin/login',{email, password})
            if(data.success){
                localStorage.setItem('aToken', data.token)
                
                setAToken(data.token);
            } else {
                // setErrors({general: data.message || 'Login failed'})
                toast.error(data.message)
            }

        } else{
            const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password});
            if(data.success){
                localStorage.setItem('dToken', data.token)
                setDToken(data.token);
                
            } else{
                toast.error(data.message)
            }
        }
      



    } catch (error) {
      console.error('Error:', error)
      setErrors({general: error.response?.data?.message || 'An error occurred. Please try again.'})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden py-20'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-30'></div>
        <div className='absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl opacity-20' style={{animation: 'float 8s ease-in-out infinite'}}></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20'></div>
      </div>

      {/* Main Container */}
      <div className='relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          
          {/* Left Side - Image Section */}
          <div className='hidden md:flex md:flex-col items-center justify-center bg-linear-to-br from-primary/5 via-indigo-500/5 to-blue-500/5 backdrop-blur-xl border-r border-gray-200 relative overflow-hidden p-8 md:p-12'>
            {/* Decorative Elements */}
            <div className='absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute bottom-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2'></div>

            {/* Content */}
            <div className='relative z-10 text-center space-y-8'>
              {/* Admin/Doctor Icon */}
              <div className='relative mx-auto w-48 h-48 md:w-56 md:h-56'>
                <div className='absolute inset-0 bg-linear-to-br from-primary/40 to-indigo-500/40 rounded-3xl blur-2xl opacity-75'></div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <svg viewBox='0 0 200 200' className='w-full h-full'>
                    <defs>
                      <linearGradient id='adminGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#5f6fff' />
                        <stop offset='50%' stopColor='#8b5cf6' />
                        <stop offset='100%' stopColor='#6366f1' />
                      </linearGradient>
                    </defs>
                    
                    {state === 'Admin' ? (
                      // Admin Icon - Settings/Gear
                      <g transform='translate(100, 100)'>
                        {/* Outer circle */}
                        <circle cx='0' cy='0' r='60' fill='none' stroke='url(#adminGradient)' strokeWidth='3' opacity='0.3'/>
                        {/* Gear */}
                        <circle cx='0' cy='0' r='40' fill='none' stroke='url(#adminGradient)' strokeWidth='4'/>
                        <circle cx='0' cy='0' r='25' fill='none' stroke='url(#adminGradient)' strokeWidth='3'/>
                        {/* Teeth */}
                        {[0, 60, 120, 180, 240, 300].map((angle) => {
                          const rad = (angle * Math.PI) / 180
                          const x1 = Math.cos(rad) * 45
                          const y1 = Math.sin(rad) * 45
                          const x2 = Math.cos(rad) * 55
                          const y2 = Math.sin(rad) * 55
                          return (
                            <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke='url(#adminGradient)' strokeWidth='4' strokeLinecap='round'/>
                          )
                        })}
                        {/* Center dot */}
                        <circle cx='0' cy='0' r='8' fill='url(#adminGradient)'/>
                      </g>
                    ) : (
                      // Doctor Icon - Medical Cross
                      <g transform='translate(100, 100)'>
                        {/* Background circle */}
                        <circle cx='0' cy='0' r='60' fill='none' stroke='url(#adminGradient)' strokeWidth='2' opacity='0.2'/>
                        {/* Vertical line */}
                        <rect x='-8' y='-40' width='16' height='80' rx='4' fill='url(#adminGradient)'/>
                        {/* Horizontal line */}
                        <rect x='-40' y='-8' width='80' height='16' rx='4' fill='url(#adminGradient)'/>
                        {/* Animated pulse */}
                        <circle cx='0' cy='0' r='70' fill='none' stroke='url(#adminGradient)' strokeWidth='2' opacity='0.3'>
                          <animate attributeName='r' values='70;80;70' dur='2s' repeatCount='indefinite'/>
                          <animate attributeName='opacity' values='0.3;0;0.3' dur='2s' repeatCount='indefinite'/>
                        </circle>
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className='space-y-4'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                  {state === 'Admin' ? (
                    <>Welcome <span className='bg-linear-to-r from-primary via-indigo-600 to-blue-600 bg-clip-text text-transparent'>Admin</span></>
                  ) : (
                    <>Welcome <span className='bg-linear-to-r from-primary via-indigo-600 to-blue-600 bg-clip-text text-transparent'>Doctor</span></>
                  )}
                </h2>
                <p className='text-gray-600 text-sm md:text-base leading-relaxed max-w-sm'>
                  {state === 'Admin' 
                    ? 'Access the admin dashboard to manage doctors, appointments, and healthcare services.'
                    : 'Login to your doctor portal to manage appointments and patient records.'
                  }
                </p>

                {/* Features */}
                <div className='space-y-3 pt-4'>
                  {state === 'Admin' ? (
                    <>
                      <div className='flex items-center gap-3 text-sm text-gray-700 justify-center'>
                        <span className='text-primary font-bold'>✓</span>
                        <span>Manage doctors & specialists</span>
                      </div>
                      <div className='flex items-center gap-3 text-sm text-gray-700 justify-center'>
                        <span className='text-primary font-bold'>✓</span>
                        <span>Monitor appointments</span>
                      </div>
                      <div className='flex items-center gap-3 text-sm text-gray-700 justify-center'>
                        <span className='text-primary font-bold'>✓</span>
                        <span>View analytics & reports</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex items-center gap-3 text-sm text-gray-700 justify-center'>
                        <span className='text-primary font-bold'>✓</span>
                        <span>Manage your appointments</span>
                      </div>
                      <div className='flex items-center gap-3 text-sm text-gray-700 justify-center'>
                        <span className='text-primary font-bold'>✓</span>
                        <span>Update availability</span>
                      </div>
                      <div className='flex items-center gap-3 text-sm text-gray-700 justify-center'>
                        <span className='text-primary font-bold'>✓</span>
                        <span>View patient details</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom decoration */}
              <div className='flex justify-center gap-2 pt-4'>
                {[0, 1, 2].map((dot) => (
                  <div 
                    key={dot}
                    className='w-2 h-2 rounded-full bg-primary/50'
                    style={{
                      animation: `pulse 2s ease-in-out infinite`,
                      animationDelay: `${dot * 0.3}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className='flex flex-col items-center justify-center bg-white backdrop-blur-2xl p-8 md:p-12 relative'>
            {/* Decorative blur */}
            <div className='absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>

            <div className='relative z-10 w-full max-w-md'>
              {/* Header */}
              <div className='text-center mb-10'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
                  {state === 'Admin' ? 'Admin Login' : 'Doctor Login'}
                </h1>
                <p className='text-gray-600 text-sm'>
                  {state === 'Admin' 
                    ? 'Secure access to your admin dashboard'
                    : 'Secure access to your doctor portal'
                  }
                </p>
              </div>

              {/* Role Toggle */}
              <div className='flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg'>
                <button
                  type='button'
                  onClick={() => {
                    setState('Admin')
                    setErrors({})
                    setEmail('')
                    setPassword('')
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    state === 'Admin'
                      ? 'bg-white text-primary shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Admin
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setState('Doctor')
                    setErrors({})
                    setEmail('')
                    setPassword('')
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    state === 'Doctor'
                      ? 'bg-white text-primary shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Doctor
                </button>
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4'>
                  {errors.general}
                </div>
              )}

              {/* Form */}
              <form onSubmit={onSubmitHandler} className='space-y-5'>
                {/* Email Field */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700 block'>Email Address</label>
                  <div className='relative'>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors({...errors, email: ''})
                      }}
                      placeholder='you@example.com'
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none ${
                        errors.email 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-gray-300 focus:border-primary/50 focus:bg-white'
                      }`}
                    />
                    {errors.email && <p className='text-red-400 text-xs mt-1'>{errors.email}</p>}
                  </div>
                </div>

                {/* Password Field */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700 block'>Password</label>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) setErrors({...errors, password: ''})
                      }}
                      placeholder='••••••••'
                      className={`w-full px-4 py-3 pr-12 rounded-lg bg-gray-50 border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none ${
                        errors.password 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-gray-300 focus:border-primary/50 focus:bg-white'
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors'
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                    {errors.password && <p className='text-red-400 text-xs mt-1'>{errors.password}</p>}
                  </div>
                </div>

                {/* Forgot Password */}
                <div className='flex justify-end'>
                  <button type='button' className='text-xs text-primary hover:text-indigo-600 transition-colors'>
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-linear-to-r from-primary via-indigo-600 to-blue-600 hover:from-indigo-600 hover:via-blue-600 hover:to-primary text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8 relative overflow-hidden group'
                >
                  <span className='relative z-10 flex items-center justify-center'>
                    {isLoading ? (
                      <>
                        <svg className='animate-spin -ml-1 mr-2 h-4 w-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `${state} Login`
                    )}
                  </span>
                </button>

                {/* Divider */}
                <div className='flex items-center gap-3 py-4'>
                  <div className='flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent'></div>
                  <span className='text-xs text-gray-500'>or</span>
                  <div className='flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent'></div>
                </div>

                {/* Social Login */}
                <div className='grid grid-cols-2 gap-3'>
                  <button
                    type='button'
                    className='flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 hover:border-primary/50 transition-all duration-300 text-gray-700 hover:text-primary text-sm font-medium'
                  >
                    <span>🔵</span>
                    Google
                  </button>
                  <button
                    type='button'
                    className='flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 hover:border-primary/50 transition-all duration-300 text-gray-700 hover:text-primary text-sm font-medium'
                  >
                    <span>🍎</span>
                    Apple
                  </button>
                </div>
              </form>

              {/* Bottom text */}
              <p className='text-xs text-gray-600 text-center mt-8'>
                By logging in, you agree to our <button className='text-primary hover:text-indigo-600 transition-colors'>Terms</button> and <button className='text-primary hover:text-indigo-600 transition-colors'>Privacy Policy</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login