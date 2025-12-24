import React, { useState, useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointments = () => {
  const { dToken, doctorAppointments, getDoctorAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (dToken) {
      getDoctorAppointments()
    }
  }, [dToken])

  // Helper to get status from appointment
  const getAppointmentStatus = (apt) => {
    if (apt.cancelled) return 'Cancelled'
    if (apt.isCompleted) return 'Completed'
    return 'Pending'
  }

  const filteredAppointments = doctorAppointments.filter(apt => {
    const status = getAppointmentStatus(apt)
    const matchesStatus = filterStatus === 'all' || status.toLowerCase() === filterStatus.toLowerCase()
    const patientName = apt.userData?.name || ''
    const patientEmail = apt.userData?.email || ''
    const matchesSearch = searchTerm === '' || 
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientEmail.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusStyles = (status) => {
    switch(status) {
      case 'Completed':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: '✓', gradient: 'from-green-500 to-emerald-500' }
      case 'Pending':
        return { bg: 'bg-amber-100', text: 'text-amber-700', icon: '◐', gradient: 'from-amber-500 to-orange-500' }
      case 'Cancelled':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: '✕', gradient: 'from-red-500 to-rose-500' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: '—', gradient: 'from-gray-500 to-slate-500' }
    }
  }

  const stats = [
    { label: 'Total', value: doctorAppointments.length, gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
    { label: 'Completed', value: doctorAppointments.filter(a => a.isCompleted).length, gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
    { label: 'Pending', value: doctorAppointments.filter(a => !a.cancelled && !a.isCompleted).length, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
    { label: 'Cancelled', value: doctorAppointments.filter(a => a.cancelled).length, gradient: 'from-red-500 to-rose-500', bg: 'bg-red-50' },
  ]

  return (
    <div className='w-full min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Hero Header */}
      <div className='glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 mb-6 sm:mb-8 animate-fade-in'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0'>
              <svg className='w-6 h-6 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
            <div className='min-w-0 flex-1'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 truncate'>My Appointments</h1>
              <p className='text-gray-500 text-sm hidden sm:block'>Manage your patient appointments</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className='flex items-center justify-between sm:justify-start gap-3'>
            <div className='px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-primary/10 to-indigo-500/10 rounded-lg sm:rounded-xl border border-primary/20'>
              <p className='text-[10px] sm:text-xs font-medium text-gray-500'>Showing</p>
              <p className='text-base sm:text-lg font-bold text-primary'>{filteredAppointments.length} <span className='text-gray-400 text-xs'>of {doctorAppointments.length}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8'>
        {stats.map((stat, index) => (
          <div 
            key={stat.label} 
            className='glass card-hover rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-5 animate-fade-in-up group'
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-[10px] sm:text-xs font-medium mb-0.5'>{stat.label}</p>
                <p className='text-xl sm:text-2xl lg:text-3xl font-black text-gray-900'>{stat.value}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br ${stat.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <span className='text-lg sm:text-xl font-bold'>{stat.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className='glass rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-200 mb-6 sm:mb-8 animate-fade-in-up'>
        <div className='flex flex-col gap-3 sm:gap-4'>
          {/* Search Input */}
          <div className='relative group'>
            <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
              <svg className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <input 
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search patient name or email...'
              className='w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white/80 text-sm sm:text-base'
            />
          </div>
          
          {/* Status Filter */}
          <div className='flex bg-gray-100 rounded-lg sm:rounded-xl p-1 sm:p-1.5 gap-1 overflow-x-auto'>
            {['all', 'pending', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 sm:px-4 py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all duration-300 whitespace-nowrap ${
                  filterStatus === status 
                    ? 'bg-white shadow-md text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments */}
      {filteredAppointments.length > 0 ? (
        <>
          {/* Mobile Card View */}
          <div className='sm:hidden space-y-4 animate-fade-in-up'>
            {filteredAppointments.map((appointment, index) => {
              const status = getAppointmentStatus(appointment)
              const statusStyles = getStatusStyles(status)
              return (
                <div 
                  key={appointment._id} 
                  className='glass rounded-2xl border border-gray-200 p-4 animate-fade-in'
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {/* Header */}
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-xs font-bold text-gray-400'>#{index + 1}</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg ${statusStyles.bg} ${statusStyles.text}`}>
                      <span>{statusStyles.icon}</span>
                      {status}
                    </span>
                  </div>

                  {/* Patient Info */}
                  <div className='flex items-center gap-3 mb-4 pb-4 border-b border-gray-100'>
                    <img 
                      src={appointment.userData?.image || '/default-avatar.png'} 
                      alt={appointment.userData?.name || 'Patient'} 
                      className='w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='font-bold text-gray-900 truncate'>{appointment.userData?.name || 'Unknown'}</p>
                      <p className='text-xs text-gray-500 truncate'>{appointment.userData?.email || ''}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className='grid grid-cols-3 gap-3 mb-4'>
                    <div className='bg-gray-50 rounded-lg p-2.5 text-center'>
                      <p className='text-[10px] text-gray-500 font-medium'>Date</p>
                      <p className='text-xs font-bold text-gray-900'>{appointment.slotDate}</p>
                    </div>
                    <div className='bg-gray-50 rounded-lg p-2.5 text-center'>
                      <p className='text-[10px] text-gray-500 font-medium'>Time</p>
                      <p className='text-xs font-bold text-gray-900'>{appointment.slotTime}</p>
                    </div>
                    <div className='bg-gray-50 rounded-lg p-2.5 text-center'>
                      <p className='text-[10px] text-gray-500 font-medium'>Fee</p>
                      <p className='text-xs font-bold text-green-600'>₹{appointment.amount}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg ${
                      appointment.payment ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${appointment.payment ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                      {appointment.payment ? 'Paid' : 'Pending'}
                    </span>
                    
                    {status === 'Pending' && (
                      <div className='flex items-center gap-2'>
                        <button onClick={() => completeAppointment(appointment._id)} className='p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors'>
                          <svg className='w-4 h-4 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                          </svg>
                        </button>
                        <button onClick={() => cancelAppointment(appointment._id)} className='p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors'>
                          <svg className='w-4 h-4 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop Table View */}
          <div className='hidden sm:block glass rounded-2xl border border-gray-200 overflow-hidden animate-fade-in-up'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
                    <th className='text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>#</th>
                    <th className='text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>Patient</th>
                    <th className='text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>Date & Time</th>
                    <th className='text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>Fee</th>
                    <th className='text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>Payment</th>
                    <th className='text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>Status</th>
                    <th className='text-center py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {filteredAppointments.map((appointment, index) => {
                    const status = getAppointmentStatus(appointment)
                    const statusStyles = getStatusStyles(status)
                    return (
                      <tr 
                        key={appointment._id} 
                        className='hover:bg-gray-50/80 transition-all duration-200 animate-fade-in'
                        style={{animationDelay: `${index * 0.03}s`}}
                      >
                        <td className='py-4 px-6'>
                          <span className='text-sm font-bold text-gray-400'>#{index + 1}</span>
                        </td>
                        <td className='py-4 px-6'>
                          <div className='flex items-center gap-3'>
                            <img 
                              src={appointment.userData?.image || '/default-avatar.png'} 
                              alt={appointment.userData?.name || 'Patient'} 
                              className='w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm'
                            />
                            <div>
                              <p className='font-bold text-gray-900 text-sm'>{appointment.userData?.name || 'Unknown'}</p>
                              <p className='text-xs text-gray-500'>{appointment.userData?.email || ''}</p>
                            </div>
                          </div>
                        </td>
                        <td className='py-4 px-6'>
                          <div className='bg-gray-50 rounded-lg px-3 py-2 inline-block'>
                            <p className='font-bold text-gray-900 text-sm'>{appointment.slotDate}</p>
                            <p className='text-xs text-gray-500'>{appointment.slotTime}</p>
                          </div>
                        </td>
                        <td className='py-4 px-6'>
                          <p className='font-bold text-gray-900'>₹{appointment.amount}</p>
                        </td>
                        <td className='py-4 px-6'>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg ${
                            appointment.payment ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${appointment.payment ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                            {appointment.payment ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className='py-4 px-6'>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg ${statusStyles.bg} ${statusStyles.text}`}>
                            <span>{statusStyles.icon}</span>
                            {status}
                          </span>
                        </td>
                        <td className='py-4 px-6'>
                          <div className='flex items-center justify-center gap-2'>
                            {status === 'Pending' && (
                              <>
                                <button onClick={() => completeAppointment(appointment._id)} className='p-2.5 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-300 group/btn' title='Complete'>
                                  <svg className='w-4 h-4 text-green-600 group-hover/btn:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                  </svg>
                                </button>
                                <button onClick={() => cancelAppointment(appointment._id)} className='p-2.5 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300 group/btn' title='Cancel'>
                                  <svg className='w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                  </svg>
                                </button>
                              </>
                            )}
                            {status !== 'Pending' && (
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
          </div>
        </>
      ) : (
        <div className='glass rounded-2xl border border-gray-200 p-12 text-center animate-fade-in'>
          <div className='w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>No appointments found</h3>
          <p className='text-gray-500 mb-6'>Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {setSearchTerm(''); setFilterStatus('all');}}
            className='px-6 py-3 bg-linear-to-r from-primary to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300'
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default DoctorAppointments
