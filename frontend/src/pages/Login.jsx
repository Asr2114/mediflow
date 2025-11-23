import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  
  const {backendUrl,token, setToken} = useContext(AppContext);

  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (state === 'Sign Up' && !name.trim()) {
      newErrors.name = 'Full name is required'
    }
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

      //regiatration

      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if(data.success){
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else{
          toast.error(data.message);
        }
      }

      //login api
      else
        {
          const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})
          if(data.success){
            setToken(data.token);
            localStorage.setItem('token', data.token);
          } else{
            toast.error(data.message);
          }

        }
      
      
    } catch (error) {
      toast.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleState = () => {
    setState(state === 'Sign Up' ? 'Login' : 'Sign Up')
    setErrors({})
    setEmail('')
    setPassword('')
    setName('')
  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }


  },[token])

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
              {/* Medical Illustration */}
              <div className='relative mx-auto w-48 h-48 md:w-56 md:h-56'>
                <div className='absolute inset-0 bg-linear-to-br from-primary/40 to-indigo-500/40 rounded-3xl blur-2xl opacity-75'></div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <svg viewBox='0 0 200 200' className='w-full h-full'>
                    <defs>
                      <linearGradient id='medicalGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#5f6fff' />
                        <stop offset='50%' stopColor='#8b5cf6' />
                        <stop offset='100%' stopColor='#6366f1' />
                      </linearGradient>
                    </defs>
                    
                    {/* Stethoscope */}
                    <g transform='translate(100, 100)'>
                      {/* Earpieces */}
                      <circle cx='-25' cy='-35' r='8' fill='url(#medicalGradient)' opacity='0.9'/>
                      <circle cx='25' cy='-35' r='8' fill='url(#medicalGradient)' opacity='0.9'/>
                      
                      {/* Tubes connecting earpieces to main tube */}
                      <path d='M -25 -27 Q -35 0 -40 30' stroke='url(#medicalGradient)' strokeWidth='6' fill='none' strokeLinecap='round'/>
                      <path d='M 25 -27 Q 35 0 40 30' stroke='url(#medicalGradient)' strokeWidth='6' fill='none' strokeLinecap='round'/>
                      
                      {/* Main tube */}
                      <path d='M -40 30 Q 0 50 40 30' stroke='url(#medicalGradient)' strokeWidth='8' fill='none' strokeLinecap='round'/>
                        
                      {/* Diaphragm */}
                      <circle cx='0' cy='60' r='20' fill='none' stroke='url(#medicalGradient)' strokeWidth='4'/>
                      <circle cx='0' cy='60' r='15' fill='url(#medicalGradient)' opacity='0.3'/>
                      
                      {/* Animated pulse */}
                      <circle cx='0' cy='60' r='10' fill='url(#medicalGradient)' opacity='0.6'>
                        <animate attributeName='r' values='10;15;10' dur='2s' repeatCount='indefinite'/>
                        <animate attributeName='opacity' values='0.6;0.2;0.6' dur='2s' repeatCount='indefinite'/>
                      </circle>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className='space-y-4'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                  Welcome to <span className='bg-linear-to-r from-primary via-indigo-600 to-blue-600 bg-clip-text text-transparent'>MediFlow</span>
                </h2>
                <p className='text-gray-600 text-sm md:text-base leading-relaxed max-w-sm'>
                  {state === 'Sign Up' 
                    ? 'Join thousands of patients who have simplified their healthcare journey with our modern appointment platform.'
                    : 'Access your healthcare profile and manage your medical appointments seamlessly.'
                  }
                </p>

                {/* Features */}
                <div className='space-y-3 pt-4'>
                  {[
                    { icon: '✓', text: 'Easy appointment booking' },
                    { icon: '✓', text: 'Connect with top specialists' },
                    { icon: '✓', text: 'Secure health records' }
                  ].map((feature, idx) => (
                    <div key={idx} className='flex items-center gap-3 text-sm text-gray-700 justify-center'>
                      <span className='text-primary font-bold'>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
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
                  {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h1>
                <p className='text-gray-600 text-sm'>
                  {state === 'Sign Up' 
                    ? 'Join us to book your first appointment'
                    : 'Welcome back to your healthcare journey'
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmitHandler} className='space-y-5'>
                {/* Full Name Field (Sign Up Only) */}
                {state === 'Sign Up' && (
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 block'>Full Name</label>
                    <div className='relative'>
                      <input
                        type='text'
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (errors.name) setErrors({...errors, name: ''})
                        }}
                        placeholder='John Doe'
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none ${
                          errors.name 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-gray-300 focus:border-primary/50 focus:bg-white'
                        }`}
                      />
                      {errors.name && <p className='text-red-400 text-xs mt-1'>{errors.name}</p>}
                    </div>
                  </div>
                )}

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

                {/* Forgot Password (Login Only) */}
                {state === 'Login' && (
                  <div className='flex justify-end'>
                    <button type='button' className='text-xs text-primary hover:text-indigo-400 transition-colors'>
                      Forgot password?
                    </button>
                  </div>
                )}

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
                      state === 'Sign Up' ? 'Create Account' : 'Login'
                    )}
                  </span>
                </button>

                {/* Toggle between Sign Up and Login */}
                <div className='pt-4 text-center text-sm'>
                  <span className='text-gray-700'>
                    {state === 'Sign Up' 
                      ? 'Already have an account? '
                      : 'Don\'t have an account? '
                    }
                  </span>
                  <button
                    type='button'
                    onClick={toggleState}
                    className='text-primary hover:text-indigo-600 font-semibold transition-colors'
                  >
                    {state === 'Sign Up' ? 'Login' : 'Sign Up'}
                  </button>
                </div>

                {/* Divider */}
                <div className='flex items-center gap-3 py-4'>
                  <div className='flex-1 h-px bg-linear-to-r from-transparent via-gray-700 to-transparent'></div>
                  <span className='text-xs text-gray-500'>or</span>
                  <div className='flex-1 h-px bg-linear-to-r from-transparent via-gray-700 to-transparent'></div>
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
                By {state === 'Sign Up' ? 'creating an account' : 'logging in'}, you agree to our <button className='text-primary hover:text-indigo-600 transition-colors'>Terms</button> and <button className='text-primary hover:text-indigo-600 transition-colors'>Privacy Policy</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Info (shown on small screens) */}
      <div className='md:hidden fixed top-0 left-0 right-0 p-4 z-20'>
        <button 
          onClick={() => navigate('/')}
          className='text-gray-800 text-2xl'
        >
          ← 
        </button>
      </div>
    </div>
  )
}

export default Login