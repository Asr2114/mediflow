import React, { useState } from 'react'

const AllAppointments = () => {
  const [filterStatus, setFilterStatus] = useState('all')

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Smith', date: '2024-12-20', time: '10:30 AM', status: 'Completed', type: 'Check-up' },
    { id: 2, patient: 'Jane Wilson', doctor: 'Dr. Mike Johnson', date: '2024-12-20', time: '11:00 AM', status: 'Pending', type: 'Consultation' },
    { id: 3, patient: 'Robert Brown', doctor: 'Dr. Emily Davis', date: '2024-12-20', time: '02:00 PM', status: 'Completed', type: 'Follow-up' },
    { id: 4, patient: 'Lisa Anderson', doctor: 'Dr. John Wilson', date: '2024-12-21', time: '09:30 AM', status: 'Cancelled', type: 'Consultation' },
    { id: 5, patient: 'Michael Chen', doctor: 'Dr. Sarah Smith', date: '2024-12-21', time: '03:00 PM', status: 'Pending', type: 'Check-up' },
    { id: 6, patient: 'Sarah Martinez', doctor: 'Dr. Mike Johnson', date: '2024-12-22', time: '10:00 AM', status: 'Completed', type: 'Consultation' },
    { id: 7, patient: 'David Taylor', doctor: 'Dr. Emily Davis', date: '2024-12-22', time: '01:30 PM', status: 'Pending', type: 'Follow-up' },
    { id: 8, patient: 'Emma White', doctor: 'Dr. John Wilson', date: '2024-12-23', time: '11:00 AM', status: 'Completed', type: 'Check-up' },
  ]

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status.toLowerCase() === filterStatus.toLowerCase())

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed':
        return '✓'
      case 'Pending':
        return '◐'
      case 'Cancelled':
        return '✕'
      default:
        return '—'
    }
  }

  return (
    <div className='w-full p-4 sm:p-8 lg:p-12'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>All Appointments</h1>
        <p className='text-gray-600'>Manage and track all patient appointments</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Total</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>{appointments.length}</p>
            </div>
            <div className='w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center'>
              <svg className='w-7 h-7 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Completed</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>{appointments.filter(a => a.status === 'Completed').length}</p>
            </div>
            <div className='w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center'>
              <svg className='w-7 h-7 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Pending</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>{appointments.filter(a => a.status === 'Pending').length}</p>
            </div>
            <div className='w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center'>
              <svg className='w-7 h-7 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Cancelled</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>{appointments.filter(a => a.status === 'Cancelled').length}</p>
            </div>
            <div className='w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center'>
              <svg className='w-7 h-7 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l5.5-5.5M5.5 5.5L11 11m0 0l5.5 5.5M11 11l-5.5 5.5M11 11l5.5-5.5M5.5 16.5L11 11' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-8'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <input 
              type='text'
              placeholder='Search by patient name or doctor name...'
              className='w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors'
            />
          </div>
          <input 
            type='date'
            className='px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors'
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className='px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors'
          >
            <option value='all'>All Status</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Patient</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Doctor</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Date & Time</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Type</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-gray-700'>Status</th>
                <th className='text-center py-4 px-6 text-sm font-semibold text-gray-700'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                  <td className='py-4 px-6'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-linear-to-br from-indigo-500/20 to-blue-500/20 rounded-full flex items-center justify-center'>
                        <svg className='w-5 h-5 text-indigo-600' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                        </svg>
                      </div>
                      <p className='font-semibold text-gray-900'>{appointment.patient}</p>
                    </div>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-700'>{appointment.doctor}</td>
                  <td className='py-4 px-6 text-sm text-gray-700'>
                    <div>
                      <p className='font-medium text-gray-900'>{appointment.date}</p>
                      <p className='text-gray-500'>{appointment.time}</p>
                    </div>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-700'>{appointment.type}</td>
                  <td className='py-4 px-6'>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)} {appointment.status}
                    </span>
                  </td>
                  <td className='py-4 px-6'>
                    <div className='flex items-center justify-center gap-2'>
                      <button className='p-2 hover:bg-blue-50 rounded-lg transition-colors' title='View Details'>
                        <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                        </svg>
                      </button>
                      {appointment.status === 'Pending' && (
                        <>
                          <button className='p-2 hover:bg-green-50 rounded-lg transition-colors' title='Complete'>
                            <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                          </button>
                          <button className='p-2 hover:bg-red-50 rounded-lg transition-colors' title='Cancel'>
                            <svg className='w-5 h-5 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center'>
          <svg className='w-16 h-16 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          <p className='text-gray-500 text-lg'>No appointments found</p>
          <p className='text-gray-400 text-sm'>Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}

export default AllAppointments