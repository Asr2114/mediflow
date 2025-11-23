import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = ({ className = '' }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  

  return (
    <div 
      className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer group relative ${className}`}
      onClick={() => navigate('/dashboard')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Medical Icon */}
      <div className='relative shrink-0'>
        {/* Pulsing Background Glow */}
        <div className={`absolute inset-0 bg-primary rounded-2xl blur-xl opacity-50 ${isHovered ? 'animate-ping scale-150' : 'animate-pulse'}`}></div>
        
        {/* Rotating Ring */}
        <div className={`absolute inset-0 border-2 border-primary rounded-2xl ${isHovered ? 'animate-spin-slow' : ''}`} style={{animationDuration: '3s'}}></div>
        
        {/* Main Icon Container */}
        <svg 
          width="44" 
          height="44" 
          viewBox="0 0 48 48" 
          className="relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5f6fff" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="logoGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#5f6fff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Medical Cross with Heartbeat */}
          <g transform="translate(24, 24)" style={{filter: isHovered ? "url(#glow)" : "none"}}>
            {/* Cross Base - Vertical */}
            <rect x="-2.5" y="-14" width="5" height="28" rx="2.5" fill="url(#logoGradient)" className="transition-all duration-500" style={{fill: isHovered ? 'url(#logoGradientHover)' : 'url(#logoGradient)'}}>
              <animate attributeName="height" values="28;32;28" dur="2s" repeatCount="indefinite" />
            </rect>
            {/* Cross Base - Horizontal */}
            <rect x="-14" y="-2.5" width="28" height="5" rx="2.5" fill="url(#logoGradient)" className="transition-all duration-500" style={{fill: isHovered ? 'url(#logoGradientHover)' : 'url(#logoGradient)'}}>
              <animate attributeName="width" values="28;32;28" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </rect>
            
            {/* Flowing Wave Lines (representing "Flow") - Top */}
            <path 
              d="M -10 -10 Q -5 -14 0 -10 T 10 -10" 
              stroke="url(#logoGradient)" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{stroke: isHovered ? 'url(#logoGradientHover)' : 'url(#logoGradient)'}}
            >
              <animate attributeName="d" 
                values="M -10 -10 Q -5 -14 0 -10 T 10 -10;M -10 -8 Q -5 -12 0 -8 T 10 -8;M -10 -10 Q -5 -14 0 -10 T 10 -10" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </path>
            {/* Flowing Wave Lines - Bottom */}
            <path 
              d="M -10 10 Q -5 14 0 10 T 10 10" 
              stroke="url(#logoGradient)" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{stroke: isHovered ? 'url(#logoGradientHover)' : 'url(#logoGradient)'}}
            >
              <animate attributeName="d" 
                values="M -10 10 Q -5 14 0 10 T 10 10;M -10 8 Q -5 12 0 8 T 10 8;M -10 10 Q -5 14 0 10 T 10 10" 
                dur="2s" 
                repeatCount="indefinite" 
                begin="1s"
              />
            </path>
            
            {/* Heartbeat Pulse Dots */}
            <circle cx="-7" cy="0" r="2" fill="url(#logoGradient)">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="2;2.5;2" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="7" cy="0" r="2" fill="url(#logoGradient)">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" begin="0.75s" />
              <animate attributeName="r" values="2;2.5;2" dur="1.5s" repeatCount="indefinite" begin="0.75s" />
            </circle>
          </g>
        </svg>
      </div>

      {/* Text Logo */}
      <div className="flex flex-col relative">
        <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
          <span className="bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Medi
          </span>
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-500 bg-clip-text text-transparent transition-all duration-500">
              Flow
            </span>
            {/* Animated Underline */}
            <span className={`absolute bottom-0 left-0 h-1 bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-600 transition-all duration-500 rounded-full ${isHovered ? 'w-full' : 'w-0'}`}></span>
          </span>
        </span>
        <span className="text-[8px] sm:text-[9px] font-semibold text-gray-700 tracking-[0.15em] uppercase mt-0.5 transition-colors duration-300">
          Admin Panel
        </span>
      </div>

      {/* Animated Sparkle Effects on Hover */}
      {isHovered && (
        <>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-1/2 -right-2 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
        </>
      )}
    </div>
  )
}

export default Logo
