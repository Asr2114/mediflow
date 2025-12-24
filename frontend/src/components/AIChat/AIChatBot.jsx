import React, { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { getAIResponse, QUICK_ACTIONS } from '../../services/aiServiceAdvanced'

// Notification Sound Generator (Web Audio API)
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Create a pleasant notification sound
    const oscillator1 = audioContext.createOscillator()
    const oscillator2 = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Pleasant frequencies for notification
    oscillator1.frequency.setValueAtTime(880, audioContext.currentTime) // A5
    oscillator1.frequency.setValueAtTime(1100, audioContext.currentTime + 0.1) // C#6
    oscillator2.frequency.setValueAtTime(1320, audioContext.currentTime + 0.1) // E6
    
    oscillator1.type = 'sine'
    oscillator2.type = 'sine'
    
    // Fade in and out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4)
    
    oscillator1.start(audioContext.currentTime)
    oscillator2.start(audioContext.currentTime + 0.1)
    oscillator1.stop(audioContext.currentTime + 0.4)
    oscillator2.stop(audioContext.currentTime + 0.4)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Popup Notification Component
const PopupNotification = ({ message, userName, onClose, onOpenChat, icon }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  
  useEffect(() => {
    // Animate in after a short delay
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    
    // Auto dismiss after 8 seconds
    const dismissTimer = setTimeout(() => {
      handleClose()
    }, 8000)
    
    return () => {
      clearTimeout(showTimer)
      clearTimeout(dismissTimer)
    }
  }, [])
  
  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(onClose, 300)
  }
  
  const handleOpenChat = () => {
    handleClose()
    setTimeout(onOpenChat, 100)
  }
  
  return (
    <div className={`fixed bottom-24 right-6 z-[60] transition-all duration-500 transform ${
      isVisible && !isLeaving 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className='bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-[320px] sm:w-[360px] overflow-hidden'>
        {/* Animated gradient border */}
        <div className='absolute inset-0 bg-linear-to-r from-primary via-indigo-500 to-purple-500 rounded-2xl opacity-10 animate-pulse'></div>
        
        <div className='relative'>
          {/* Close button */}
          <button 
            onClick={handleClose}
            className='absolute -top-1 -right-1 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors'
          >
            <svg className='w-3 h-3 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          
          {/* Header with avatar */}
          <div className='flex items-start gap-3'>
            <div className='relative shrink-0'>
              <div className='w-12 h-12 bg-linear-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30'>
                <span className='text-2xl'>{icon || '🤖'}</span>
              </div>
              <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
                <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
              </div>
            </div>
            
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <h4 className='font-bold text-gray-800'>MediFlow AI</h4>
                <span className='text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium'>Online</span>
              </div>
              
              {/* Personalized greeting */}
              {userName && (
                <p className='text-sm text-primary font-semibold mt-0.5'>
                  Hi {userName}! 👋
                </p>
              )}
              
              {/* Message */}
              <p className='text-sm text-gray-600 mt-1 leading-relaxed'>
                {message}
              </p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className='flex gap-2 mt-4'>
            <button
              onClick={handleOpenChat}
              className='flex-1 bg-linear-to-r from-primary to-indigo-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
              </svg>
              Chat Now
            </button>
            <button
              onClick={handleClose}
              className='px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-xl transition-colors'
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ML Analysis Visualization Component
const MLAnalysisCard = ({ analysis }) => {
  if (!analysis) return null
  
  const getUrgencyColor = (level) => {
    const colors = {
      'low': 'bg-green-500',
      'medium': 'bg-yellow-500',
      'high': 'bg-orange-500',
      'critical': 'bg-red-500'
    }
    return colors[level] || 'bg-gray-500'
  }
  
  const getSentimentIcon = (sentiment) => {
    const icons = {
      'positive': '😊',
      'negative': '😟',
      'neutral': '😐',
      'urgent': '🚨'
    }
    return icons[sentiment] || '❓'
  }
  
  return (
    <div className='mt-3 bg-linear-to-br from-slate-50 to-blue-50 rounded-xl p-3 border border-blue-100'>
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-6 h-6 bg-linear-to-r from-primary to-indigo-600 rounded-lg flex items-center justify-center'>
          <svg className='w-3.5 h-3.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
          </svg>
        </div>
        <span className='text-xs font-bold text-gray-700'>ML Analysis Results</span>
      </div>
      
      {/* Confidence Score */}
      {analysis.confidence !== undefined && (
        <div className='mb-3'>
          <div className='flex justify-between items-center mb-1'>
            <span className='text-xs text-gray-600'>AI Confidence</span>
            <span className='text-xs font-bold text-primary'>{Math.round(analysis.confidence * 100)}%</span>
          </div>
          <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
            <div 
              className='h-full bg-linear-to-r from-primary to-indigo-600 rounded-full transition-all duration-500'
              style={{ width: `${analysis.confidence * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Urgency Level */}
      {analysis.urgencyLevel && (
        <div className='flex items-center justify-between mb-2'>
          <span className='text-xs text-gray-600'>Urgency Level</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${getUrgencyColor(analysis.urgencyLevel)}`}>
            {analysis.urgencyLevel.toUpperCase()}
          </span>
        </div>
      )}
      
      {/* Sentiment */}
      {analysis.sentiment && (
        <div className='flex items-center justify-between mb-2'>
          <span className='text-xs text-gray-600'>Patient Sentiment</span>
          <span className='text-xs font-medium flex items-center gap-1'>
            {getSentimentIcon(analysis.sentiment.label)}
            {analysis.sentiment.label}
          </span>
        </div>
      )}
      
      {/* Detected Entities */}
      {analysis.entities && Object.keys(analysis.entities).length > 0 && (
        <div className='mt-2 pt-2 border-t border-blue-100'>
          <span className='text-xs font-semibold text-gray-600'>Detected Medical Entities:</span>
          <div className='flex flex-wrap gap-1 mt-1'>
            {analysis.entities.bodyParts?.map((part, i) => (
              <span key={`bp-${i}`} className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full'>🦴 {part}</span>
            ))}
            {analysis.entities.symptoms?.map((sym, i) => (
              <span key={`sym-${i}`} className='text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full'>🤒 {sym}</span>
            ))}
            {analysis.entities.conditions?.map((cond, i) => (
              <span key={`cond-${i}`} className='text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full'>📋 {cond}</span>
            ))}
            {analysis.entities.duration?.map((dur, i) => (
              <span key={`dur-${i}`} className='text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>⏱️ {dur}</span>
            ))}
            {analysis.entities.severity?.map((sev, i) => (
              <span key={`sev-${i}`} className='text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full'>⚠️ {sev}</span>
            ))}
          </div>
        </div>
      )}
      
      {/* Matched Symptoms */}
      {analysis.matchedSymptoms && analysis.matchedSymptoms.length > 0 && (
        <div className='mt-2 pt-2 border-t border-blue-100'>
          <span className='text-xs font-semibold text-gray-600'>Pattern-Matched Symptoms:</span>
          <div className='flex flex-wrap gap-1 mt-1'>
            {analysis.matchedSymptoms.slice(0, 5).map((sym, i) => (
              <span key={i} className='text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full'>
                ✓ {sym}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Possible Diagnoses */}
      {analysis.possibleDiagnoses && analysis.possibleDiagnoses.length > 0 && (
        <div className='mt-2 pt-2 border-t border-blue-100'>
          <span className='text-xs font-semibold text-gray-600'>AI Suggested Conditions:</span>
          <div className='space-y-1 mt-1'>
            {analysis.possibleDiagnoses.map((diag, i) => (
              <div key={i} className='flex items-center justify-between bg-white rounded-lg p-2'>
                <span className='text-xs font-medium text-gray-700'>{diag.condition}</span>
                <div className='flex items-center gap-2'>
                  <div className='w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                    <div 
                      className='h-full bg-linear-to-r from-primary to-indigo-600 rounded-full'
                      style={{ width: `${diag.matchScore * 100}%` }}
                    />
                  </div>
                  <span className='text-xs text-primary font-bold'>{Math.round(diag.matchScore * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Health Scan Report Component
const HealthScanReport = ({ report }) => {
  if (!report) return null
  
  return (
    <div className='mt-3 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200'>
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-8 h-8 bg-linear-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center'>
          <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        </div>
        <div>
          <span className='text-sm font-bold text-gray-800'>Health Scan Report</span>
          <p className='text-xs text-gray-500'>AI-Powered Analysis</p>
        </div>
      </div>
      
      {/* Overall Health Score */}
      <div className='bg-white rounded-lg p-3 mb-3'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm font-semibold text-gray-700'>Overall Health Score</span>
          <span className='text-2xl font-bold text-emerald-600'>{report.overallScore || 'N/A'}</span>
        </div>
        <div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
          <div 
            className='h-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000'
            style={{ width: `${report.overallScore || 0}%` }}
          />
        </div>
      </div>
      
      {/* Risk Factors */}
      {report.riskFactors && report.riskFactors.length > 0 && (
        <div className='mb-3'>
          <span className='text-xs font-semibold text-gray-600'>⚠️ Risk Factors Identified:</span>
          <div className='flex flex-wrap gap-1 mt-1'>
            {report.riskFactors.map((risk, i) => (
              <span key={i} className='text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-lg'>
                {risk}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Recommendations */}
      {report.recommendations && report.recommendations.length > 0 && (
        <div>
          <span className='text-xs font-semibold text-gray-600'>💡 Personalized Recommendations:</span>
          <ul className='mt-1 space-y-1'>
            {report.recommendations.map((rec, i) => (
              <li key={i} className='text-xs text-gray-600 flex items-start gap-1'>
                <span className='text-emerald-500'>✓</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const AIChatBot = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, doctors, userData } = useContext(AppContext)
  
  const [isOpen, setIsOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationData, setNotificationData] = useState(null)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const [lastPage, setLastPage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm **MediFlow AI** 🤖, your intelligent health assistant powered by advanced machine learning.\n\nI can:\n• 🔬 Analyze your symptoms with AI\n• 📊 Assess urgency levels\n• 👨‍⚕️ Recommend specialists\n• 💊 Provide self-care tips\n\nHow can I help you today?",
      timestamp: new Date(),
      actions: QUICK_ACTIONS
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState({
    symptoms: [],
    duration: null,
    severity: null,
    additionalInfo: []
  })
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Get user's first name
  const getUserFirstName = () => {
    if (userData?.name) {
      return userData.name.split(' ')[0]
    }
    return null
  }

  // Contextual notification messages
  const getContextualNotification = (path) => {
    const firstName = getUserFirstName()
    
    const notifications = {
      '/doctors': {
        message: "Looking for the right doctor? I can help you find the perfect specialist based on your symptoms! 🔍",
        icon: '👨‍⚕️'
      },
      '/appointment': {
        message: "Need help booking your appointment? I can guide you through the process and answer any questions! 📅",
        icon: '📋'
      },
      '/my-appointments': {
        message: "Have questions about your appointments? I can help you prepare for your visit or reschedule if needed! 📆",
        icon: '🗓️'
      },
      '/my-profile': {
        message: "Need to update your health information? I'm here if you have any questions about your profile! 👤",
        icon: '⚙️'
      },
      'welcome': {
        message: "I'm your AI health assistant, ready to help you analyze symptoms, find doctors, and book appointments!",
        icon: '🤖'
      }
    }
    
    // Check for dynamic routes
    if (path.startsWith('/doctors/')) {
      return {
        message: "Looking at specialists? Tell me your symptoms and I'll help you choose the right doctor! 🩺",
        icon: '👨‍⚕️'
      }
    }
    
    if (path.startsWith('/appointment/')) {
      return {
        message: "About to book an appointment? I can help you prepare questions for your doctor! 💬",
        icon: '📝'
      }
    }
    
    return notifications[path] || null
  }

  // Show welcome notification when user logs in
  useEffect(() => {
    if (token && userData && !hasShownWelcome) {
      const welcomeShownKey = `mediflow_welcome_shown_${userData._id || userData.email}`
      const alreadyShown = sessionStorage.getItem(welcomeShownKey)
      
      if (!alreadyShown) {
        // Delay to let the page load first
        const timer = setTimeout(() => {
          const firstName = getUserFirstName()
          setNotificationData({
            message: getContextualNotification('welcome').message,
            userName: firstName,
            icon: '👋'
          })
          setShowNotification(true)
          playNotificationSound()
          sessionStorage.setItem(welcomeShownKey, 'true')
          setHasShownWelcome(true)
        }, 1500)
        
        return () => clearTimeout(timer)
      } else {
        setHasShownWelcome(true)
      }
    }
  }, [token, userData])

  // Show contextual notifications on page change
  useEffect(() => {
    const currentPath = location.pathname
    
    // Don't show notifications on auth pages or if chat is open
    if (currentPath === '/login' || isOpen || !token || !hasShownWelcome) {
      setLastPage(currentPath)
      return
    }
    
    // Only show if navigating to a new page
    if (currentPath !== lastPage) {
      setLastPage(currentPath)
      
      const contextNotification = getContextualNotification(currentPath)
      
      if (contextNotification) {
        // Check if we've shown this notification recently (per session)
        const notifKey = `mediflow_notif_${currentPath}`
        const alreadyShown = sessionStorage.getItem(notifKey)
        
        if (!alreadyShown) {
          const timer = setTimeout(() => {
            setNotificationData({
              message: contextNotification.message,
              userName: getUserFirstName(),
              icon: contextNotification.icon
            })
            setShowNotification(true)
            playNotificationSound()
            sessionStorage.setItem(notifKey, 'true')
          }, 2000)
          
          return () => clearTimeout(timer)
        }
      }
    }
  }, [location.pathname, isOpen, token, hasShownWelcome])

  // Handle notification close
  const handleNotificationClose = () => {
    setShowNotification(false)
    setNotificationData(null)
  }

  // Handle notification open chat
  const handleNotificationOpenChat = () => {
    setShowNotification(false)
    setNotificationData(null)
    setIsOpen(true)
    
    // Add contextual message based on current page
    const currentPath = location.pathname
    let contextMessage = null
    
    if (currentPath.startsWith('/doctors')) {
      contextMessage = "I see you're looking for doctors! Would you like me to help you find the right specialist based on your symptoms?"
    } else if (currentPath.startsWith('/appointment/')) {
      contextMessage = "Ready to book an appointment! Do you have any questions about the doctor or need help preparing for your visit?"
    } else if (currentPath === '/my-appointments') {
      contextMessage = "I see you're checking your appointments. Need help preparing for an upcoming visit or have questions about your appointments?"
    }
    
    if (contextMessage) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        content: contextMessage,
        timestamp: new Date(),
        actions: [
          { label: '🩺 Check Symptoms', type: 'message', message: 'I want to check my symptoms', variant: 'primary' },
          { label: '💬 Ask a Question', type: 'message', message: 'I have a health question' },
          { label: '📅 Help Booking', type: 'message', message: 'Help me book an appointment' }
        ]
      }])
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Get AI response
      const response = await getAIResponse(messageText, conversationContext, doctors)
      
      // Update conversation context
      if (response.updatedContext) {
        setConversationContext(prev => ({
          ...prev,
          ...response.updatedContext
        }))
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.message,
        timestamp: new Date(),
        actions: response.actions || null,
        recommendations: response.recommendations || null,
        warning: response.warning || null,
        mlAnalysis: response.mlAnalysis || null,
        healthReport: response.healthReport || null
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('AI Response Error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleActionClick = (action) => {
    switch (action.type) {
      case 'navigate':
        navigate(action.path)
        setIsOpen(false)
        break
      case 'message':
        handleSendMessage(action.message)
        break
      case 'book':
        if (action.speciality) {
          navigate(`/doctors/${action.speciality}`)
        } else {
          navigate('/doctors')
        }
        setIsOpen(false)
        break
      case 'emergency':
        window.open('tel:911', '_self')
        break
      default:
        handleSendMessage(action.label)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date(),
        actions: QUICK_ACTIONS
      }
    ])
    setConversationContext({
      symptoms: [],
      duration: null,
      severity: null,
      additionalInfo: []
    })
  }

  return (
    <>
      {/* Popup Notification */}
      {showNotification && notificationData && (
        <PopupNotification
          message={notificationData.message}
          userName={notificationData.userName}
          icon={notificationData.icon}
          onClose={handleNotificationClose}
          onOpenChat={handleNotificationOpenChat}
        />
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen 
            ? 'bg-gray-700 rotate-0' 
            : 'bg-linear-to-br from-primary to-indigo-600 hover:scale-110 animate-pulse-glow'
        }`}
      >
        {isOpen ? (
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        ) : (
          <div className='relative'>
            <svg className='w-7 h-7 sm:w-8 sm:h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
            </svg>
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse'></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[70vh] sm:h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-500 transform ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
      }`}>
        
        {/* Header */}
        <div className='bg-linear-to-r from-primary via-indigo-600 to-purple-600 p-4 sm:p-5 flex items-center justify-between shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </div>
              <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></div>
            </div>
            <div>
              <h3 className='text-white font-bold text-base sm:text-lg'>MediFlow AI</h3>
              <p className='text-blue-100 text-xs sm:text-sm'>Your Health Assistant</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button 
              onClick={clearChat}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors'
              title='Clear chat'
            >
              <svg className='w-5 h-5 text-white/80' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
              </svg>
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors sm:hidden'
            >
              <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-linear-to-b from-gray-50 to-white'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Avatar for bot */}
                {message.type === 'bot' && (
                  <div className='flex items-center gap-2 mb-1'>
                    <div className='w-6 h-6 bg-linear-to-br from-primary to-indigo-600 rounded-lg flex items-center justify-center'>
                      <svg className='w-3.5 h-3.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <span className='text-xs text-gray-500'>MediFlow AI</span>
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-linear-to-r from-primary to-indigo-600 text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                }`}>
                  {/* Warning Banner */}
                  {message.warning && (
                    <div className='bg-red-50 border border-red-200 rounded-lg p-3 mb-3 flex items-start gap-2'>
                      <svg className='w-5 h-5 text-red-500 shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                      </svg>
                      <p className='text-sm text-red-700'>{message.warning}</p>
                    </div>
                  )}

                  {/* Message Content */}
                  <p className='text-sm whitespace-pre-wrap leading-relaxed'>{message.content}</p>

                  {/* ML Analysis Visualization */}
                  {message.mlAnalysis && <MLAnalysisCard analysis={message.mlAnalysis} />}
                  
                  {/* Health Scan Report */}
                  {message.healthReport && <HealthScanReport report={message.healthReport} />}

                  {/* Recommendations */}
                  {message.recommendations && message.recommendations.length > 0 && (
                    <div className='mt-3 pt-3 border-t border-gray-100'>
                      <p className='text-xs font-semibold text-gray-600 mb-2'>Recommended Specialists:</p>
                      <div className='space-y-2'>
                        {message.recommendations.map((doc, idx) => (
                          <div 
                            key={idx}
                            onClick={() => navigate(`/appointment/${doc._id}`)}
                            className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors'
                          >
                            <img src={doc.image} alt={doc.name} className='w-8 h-8 rounded-lg object-cover' />
                            <div className='flex-1 min-w-0'>
                              <p className='text-xs font-semibold text-gray-800 truncate'>{doc.name}</p>
                              <p className='text-xs text-gray-500'>{doc.speciality}</p>
                            </div>
                            <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {message.actions && message.actions.length > 0 && (
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {message.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(action)}
                        className={`text-xs font-medium px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
                          action.variant === 'primary'
                            ? 'bg-linear-to-r from-primary to-indigo-600 text-white hover:shadow-lg hover:shadow-primary/30'
                            : action.variant === 'danger'
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {action.icon && <span>{action.icon}</span>}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-right text-gray-400' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className='flex justify-start animate-fade-in'>
              <div className='bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm'>
                <div className='flex items-center gap-1'>
                  <div className='w-2 h-2 bg-primary rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
                  <div className='w-2 h-2 bg-primary rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
                  <div className='w-2 h-2 bg-primary rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className='p-4 bg-white border-t border-gray-100 shrink-0'>
          <div className='flex items-end gap-2'>
            <div className='flex-1 relative'>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Describe your symptoms or ask a question...'
                rows={1}
                className='w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all duration-300'
                style={{ maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className='w-11 h-11 bg-linear-to-r from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
              </svg>
            </button>
          </div>
          <p className='text-xs text-gray-400 mt-2 text-center'>
            ⚠️ This AI provides general guidance only. Always consult a real doctor for medical advice.
          </p>
        </div>
      </div>
    </>
  )
}

export default AIChatBot
