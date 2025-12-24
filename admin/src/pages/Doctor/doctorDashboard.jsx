import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, profileData, getProfileData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (dToken) {
      getDashData()
      getProfileData()
    }
  }, [dToken])

  const getStatusStyles = (apt) => {
    if (apt.cancelled) return { bg: 'bg-red-100', text: 'text-red-700', icon: '✕', status: 'Cancelled' }
    if (apt.isCompleted) return { bg: 'bg-green-100', text: 'text-green-700', icon: '✓', status: 'Completed' }
    return { bg: 'bg-amber-100', text: 'text-amber-700', icon: '◐', status: 'Pending' }
  }

  // Loading state
  if (!dashData) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-500'>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full p-4 sm:p-6 lg:p-8 xl:p-10'>
      {/* Header */}
      <div className='mb-6 sm:mb-8 animate-fade-in-up'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-1 sm:mb-2'>
              Dashboard
            </h1>
            <p className='text-gray-600 text-xs sm:text-sm lg:text-base'>Welcome back, {profileData?.name || 'Doctor'}! Here's your overview</p>
          </div>
          <div className='flex items-center gap-2 sm:gap-3'>
            <span className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold ${
              profileData?.available ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-red-100 text-red-700'
            }`}>
              {profileData?.available ? '🟢 Available' : '🔴 Unavailable'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8'>
        {/* Today's Appointments */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 card-hover animate-fade-in-up stagger-1 group relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-500'></div>
          <div className='relative flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <p className='text-gray-500 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1'>Today</p>
              <p className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>{dashData.todayAppointments}</p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>Appointments</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-blue-500 text-xs sm:text-sm font-semibold'>↑ Active</span>
              <span className='text-gray-400 text-[10px] sm:text-xs'>today</span>
            </div>
          </div>
        </div>

        {/* Total Appointments */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 card-hover animate-fade-in-up stagger-2 group relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-500'></div>
          <div className='relative flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <p className='text-gray-500 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1'>Total</p>
              <p className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>{dashData.totalAppointments}</p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>{dashData.pendingAppointments} pending</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-indigo-500 text-xs sm:text-sm font-semibold'>◐ {dashData.pendingAppointments}</span>
              <span className='text-gray-400 text-[10px] sm:text-xs'>awaiting</span>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 card-hover animate-fade-in-up stagger-3 group relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/20 transition-colors duration-500'></div>
          <div className='relative flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <p className='text-gray-500 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1'>Completed</p>
              <p className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>{dashData.completedAppointments}</p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>{dashData.cancelledAppointments} cancelled</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-green-500 text-xs sm:text-sm font-semibold'>✓ {dashData.totalAppointments > 0 ? Math.round((dashData.completedAppointments / dashData.totalAppointments) * 100) : 0}%</span>
              <span className='text-gray-400 text-[10px] sm:text-xs'>success</span>
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 card-hover animate-fade-in-up stagger-4 group relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-colors duration-500'></div>
          <div className='relative flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <p className='text-gray-500 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1'>Earnings</p>
              <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900'>
                ₹{Number(dashData.totalEarnings) > 1000 ? (Number(dashData.totalEarnings)/1000).toFixed(1) + 'k' : Number(dashData.totalEarnings) || 0}
              </p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>{dashData.patients || 0} patients</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-purple-500 text-xs sm:text-sm font-semibold'>₹{dashData.completedAppointments > 0 ? Math.round(Number(dashData.totalEarnings || 0) / dashData.completedAppointments) : 0}</span>
              <span className='text-gray-400 text-[10px] sm:text-xs'>per visit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>
        {/* Appointment Status */}
        <div className='lg:col-span-2 glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 animate-fade-in-up stagger-5'>
          <div className='flex items-center justify-between mb-4 sm:mb-6'>
            <h3 className='text-base sm:text-lg font-bold text-gray-900'>Appointment Overview</h3>
            <span className='text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full'>This Month</span>
          </div>
          
          {/* Status Bars */}
          <div className='space-y-4 sm:space-y-6'>
            <div>
              <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                <span className='text-xs sm:text-sm font-medium text-gray-700'>Completed</span>
                <span className='text-xs sm:text-sm font-bold text-green-600'>{dashData.completedAppointments}</span>
              </div>
              <div className='h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-linear-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out'
                  style={{ width: `${dashData.totalAppointments > 0 ? (dashData.completedAppointments / dashData.totalAppointments) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                <span className='text-xs sm:text-sm font-medium text-gray-700'>Pending</span>
                <span className='text-xs sm:text-sm font-bold text-amber-600'>{dashData.pendingAppointments}</span>
              </div>
              <div className='h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-out'
                  style={{ width: `${dashData.totalAppointments > 0 ? (dashData.pendingAppointments / dashData.totalAppointments) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                <span className='text-xs sm:text-sm font-medium text-gray-700'>Cancelled</span>
                <span className='text-xs sm:text-sm font-bold text-red-600'>{dashData.cancelledAppointments}</span>
              </div>
              <div className='h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-linear-to-r from-red-400 to-rose-500 rounded-full transition-all duration-1000 ease-out'
                  style={{ width: `${dashData.totalAppointments > 0 ? (dashData.cancelledAppointments / dashData.totalAppointments) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className='grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100'>
            <div className='text-center'>
              <p className='text-lg sm:text-2xl font-bold text-green-600'>{dashData.totalAppointments > 0 ? Math.round((dashData.completedAppointments / dashData.totalAppointments) * 100) : 0}%</p>
              <p className='text-[10px] sm:text-xs text-gray-500'>Success</p>
            </div>
            <div className='text-center border-x border-gray-100'>
              <p className='text-lg sm:text-2xl font-bold text-indigo-600'>{dashData.patients || 0}</p>
              <p className='text-[10px] sm:text-xs text-gray-500'>Patients</p>
            </div>
            <div className='text-center'>
              <p className='text-lg sm:text-2xl font-bold text-purple-600'>₹{Number(dashData.totalEarnings) > 0 ? (Number(dashData.totalEarnings)/1000).toFixed(0) + 'k' : 0}</p>
              <p className='text-[10px] sm:text-xs text-gray-500'>Earned</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 animate-fade-in-up stagger-6'>
          <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6'>Quick Actions</h3>
          
          <div className='space-y-3'>
            <button onClick={() => navigate('/doctor-appointments')} className='w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-md transition-all duration-300 group'>
              <div className='w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <div className='text-left'>
                <p className='font-semibold text-gray-900 text-sm'>View Appointments</p>
                <p className='text-xs text-gray-500'>Manage your schedule</p>
              </div>
            </button>

            <button onClick={() => navigate('/doctor-profile')} className='w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-linear-to-r from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md transition-all duration-300 group'>
              <div className='w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <div className='text-left'>
                <p className='font-semibold text-gray-900 text-sm'>Update Profile</p>
                <p className='text-xs text-gray-500'>Edit your details</p>
              </div>
            </button>

            <div className='w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-linear-to-r from-green-50 to-emerald-50 border border-green-100'>
              <div className='w-10 h-10 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div className='text-left'>
                <p className='font-semibold text-gray-900 text-sm'>Total Patients</p>
                <p className='text-xs text-gray-500'>{dashData.patients} unique patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 animate-fade-in-up'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6'>
          <h3 className='text-base sm:text-lg font-bold text-gray-900'>Recent Appointments</h3>
          <button onClick={() => navigate('/doctor-appointments')} className='text-sm text-primary font-semibold hover:text-indigo-700 transition-colors flex items-center gap-1'>
            View All
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>

        {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className='sm:hidden space-y-4'>
              {dashData.latestAppointments.map((appointment) => {
                const statusStyles = getStatusStyles(appointment)
                return (
                  <div key={appointment._id} className='bg-white/70 rounded-xl p-4 border border-gray-100 shadow-sm'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        <img 
                          src={appointment.userData?.image || '/default-avatar.png'} 
                          alt={appointment.userData?.name || 'Patient'}
                          className='w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm'
                        />
                        <div>
                          <p className='font-bold text-gray-900'>{appointment.userData?.name || 'Unknown'}</p>
                          <p className='text-xs text-gray-500'>Patient</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${statusStyles.bg} ${statusStyles.text}`}>
                        {statusStyles.icon} {statusStyles.status}
                      </span>
                    </div>
                    <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                      <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        <span className='text-sm font-semibold text-gray-900'>{appointment.slotDate}</span>
                      </div>
                      <span className='text-sm text-gray-600'>{appointment.slotTime}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop Table View */}
            <div className='hidden sm:block overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-gray-100'>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Patient</th>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Date</th>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Time</th>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Payment</th>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</th>
                    <th className='text-center py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashData.latestAppointments.map((appointment) => {
                    const statusStyles = getStatusStyles(appointment)
                    return (
                      <tr key={appointment._id} className='border-b border-gray-50 hover:bg-gray-50/50 transition-colors'>
                        <td className='py-4 px-4'>
                          <div className='flex items-center gap-3'>
                            <img 
                              src={appointment.userData?.image || '/default-avatar.png'} 
                              alt={appointment.userData?.name || 'Patient'}
                              className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm'
                            />
                            <div>
                              <p className='font-semibold text-gray-900 text-sm'>{appointment.userData?.name || 'Unknown'}</p>
                              <p className='text-xs text-gray-400'>Patient</p>
                            </div>
                          </div>
                        </td>
                        <td className='py-4 px-4'>
                          <p className='text-sm font-medium text-gray-900'>{appointment.slotDate}</p>
                        </td>
                        <td className='py-4 px-4'>
                          <p className='text-sm text-gray-600'>{appointment.slotTime}</p>
                        </td>
                        <td className='py-4 px-4'>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg ${
                            appointment.payment ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${appointment.payment ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                            {appointment.payment ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className='py-4 px-4'>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${statusStyles.bg} ${statusStyles.text}`}>
                            <span>{statusStyles.icon}</span>
                            {statusStyles.status}
                          </span>
                        </td>
                        <td className='py-4 px-4'>
                          <div className='flex items-center justify-center gap-2'>
                            {!appointment.cancelled && !appointment.isCompleted && (
                              <>
                                <button onClick={() => completeAppointment(appointment._id)} className='p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors' title='Complete'>
                                  <svg className='w-4 h-4 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                  </svg>
                                </button>
                                <button onClick={() => cancelAppointment(appointment._id)} className='p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors' title='Cancel'>
                                  <svg className='w-4 h-4 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                  </svg>
                                </button>
                              </>
                            )}
                            {(appointment.cancelled || appointment.isCompleted) && (
                              <span className='text-gray-300 text-sm'>—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='text-center py-8'>
            <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
            <p className='text-gray-500'>No appointments yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard