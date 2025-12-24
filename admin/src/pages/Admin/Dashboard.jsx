import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Dashboard = () => {
  const { aToken, doctors, appointments, getAllDoctors, getAllAppointments } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getAllAppointments();
    }
  }, [aToken]);

  // Calculate stats
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(a => a.isCompleted).length;
  const pendingAppointments = appointments.filter(a => !a.cancelled && !a.isCompleted).length;
  const cancelledAppointments = appointments.filter(a => a.cancelled).length;
  const totalRevenue = appointments.filter(a => a.payment).reduce((sum, a) => sum + a.amount, 0);
  const latestAppointments = appointments.slice(0, 5);

  // Get unique specialities count
  const specialities = [...new Set(doctors.map(d => d.speciality))];

  return (
    <div className='w-full p-4 sm:p-6 lg:p-8 xl:p-10'>
      {/* Header */}
      <div className='mb-6 sm:mb-8 animate-fade-in-up'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-1 sm:mb-2'>
              Dashboard
            </h1>
            <p className='text-gray-600 text-xs sm:text-sm lg:text-base'>Welcome back! Here's your overview</p>
          </div>
          <div className='flex items-center gap-2 sm:gap-3'>
            <span className='px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 text-green-700 rounded-full text-[10px] sm:text-xs font-semibold animate-pulse'>
              🟢 Online
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8'>
        {/* Total Doctors */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 card-hover animate-fade-in-up stagger-1 group relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-500'></div>
          <div className='relative flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <p className='text-gray-500 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1'>Total Doctors</p>
              <p className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>{totalDoctors}</p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>{specialities.length} Specialities</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-green-500 text-xs sm:text-sm font-semibold'>↑ Active</span>
              <span className='text-gray-400 text-[10px] sm:text-xs'>available</span>
            </div>
          </div>
        </div>

        {/* Total Appointments */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 card-hover animate-fade-in-up stagger-2 group relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-500'></div>
          <div className='relative flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <p className='text-gray-500 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1'>Appointments</p>
              <p className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>{totalAppointments}</p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>{pendingAppointments} pending</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-indigo-500 text-xs sm:text-sm font-semibold'>◐ {pendingAppointments}</span>
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
              <p className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>{completedAppointments}</p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>{cancelledAppointments} cancelled</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-green-500 text-xs sm:text-sm font-semibold'>✓ {totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0}%</span>
              <span className='text-gray-400 text-[10px] sm:text-xs'>success</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 card-hover animate-fade-in-up stagger-4 group relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-colors duration-500'></div>
          <div className='relative flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <p className='text-gray-500 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1'>Revenue</p>
              <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900'>₹{totalRevenue > 1000 ? (totalRevenue/1000).toFixed(1) + 'k' : totalRevenue}</p>
              <p className='text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block'>Paid bookings</p>
            </div>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-purple-500 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0'>
              <svg className='w-5 h-5 sm:w-7 sm:h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
          <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block'>
            <div className='flex items-center gap-2'>
              <span className='text-purple-500 text-xs sm:text-sm font-semibold'>₹{appointments.filter(a => a.payment).length > 0 ? Math.round(totalRevenue / appointments.filter(a => a.payment).length) : 0}</span>
              <span className='text-gray-400 text-[10px] sm:text-xs'>avg/booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>
        {/* Appointment Status Chart */}
        <div className='lg:col-span-2 glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 animate-fade-in-up stagger-5'>
          <div className='flex items-center justify-between mb-4 sm:mb-6'>
            <h3 className='text-base sm:text-lg font-bold text-gray-900'>Appointment Overview</h3>
            <span className='text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full'>All Time</span>
          </div>
          
          {/* Status Bars */}
          <div className='space-y-4 sm:space-y-6'>
            <div>
              <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                <span className='text-xs sm:text-sm font-medium text-gray-700'>Completed</span>
                <span className='text-xs sm:text-sm font-bold text-green-600'>{completedAppointments}</span>
              </div>
              <div className='h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-linear-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out'
                  style={{ width: `${totalAppointments > 0 ? (completedAppointments / totalAppointments) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                <span className='text-xs sm:text-sm font-medium text-gray-700'>Pending</span>
                <span className='text-xs sm:text-sm font-bold text-yellow-600'>{pendingAppointments}</span>
              </div>
              <div className='h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-linear-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 ease-out'
                  style={{ width: `${totalAppointments > 0 ? (pendingAppointments / totalAppointments) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                <span className='text-xs sm:text-sm font-medium text-gray-700'>Cancelled</span>
                <span className='text-xs sm:text-sm font-bold text-red-600'>{cancelledAppointments}</span>
              </div>
              <div className='h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-linear-to-r from-red-400 to-rose-500 rounded-full transition-all duration-1000 ease-out'
                  style={{ width: `${totalAppointments > 0 ? (cancelledAppointments / totalAppointments) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className='grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100'>
            <div className='text-center'>
              <p className='text-lg sm:text-2xl font-bold text-green-600'>{totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0}%</p>
              <p className='text-[10px] sm:text-xs text-gray-500'>Success</p>
            </div>
            <div className='text-center border-x border-gray-100'>
              <p className='text-lg sm:text-2xl font-bold text-indigo-600'>{totalDoctors}</p>
              <p className='text-[10px] sm:text-xs text-gray-500'>Doctors</p>
            </div>
            <div className='text-center'>
              <p className='text-lg sm:text-2xl font-bold text-purple-600'>{appointments.filter(a => a.payment).length}</p>
              <p className='text-[10px] sm:text-xs text-gray-500'>Paid</p>
            </div>
          </div>
        </div>

        {/* Top Doctors */}
        <div className='glass rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 animate-fade-in-up stagger-6'>
          <div className='flex items-center justify-between mb-4 sm:mb-6'>
            <h3 className='text-base sm:text-lg font-bold text-gray-900'>Top Doctors</h3>
            <span className='text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full'>By Bookings</span>
          </div>
          
          <div className='space-y-2 sm:space-y-4'>
            {doctors.slice(0, 5).map((doctor, index) => {
              const doctorAppointments = appointments.filter(a => a.docId === doctor._id).length;
              return (
                <div key={doctor._id} className='flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-white/50 transition-all duration-300 group cursor-pointer'>
                  <div className='relative shrink-0'>
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className='w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300'
                    />
                    <span className='absolute -top-1 -left-1 w-4 h-4 sm:w-5 sm:h-5 bg-linear-to-br from-primary to-indigo-600 rounded-full flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-white shadow-md'>
                      {index + 1}
                    </span>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='font-semibold text-gray-900 text-xs sm:text-sm truncate'>{doctor.name}</p>
                    <p className='text-[10px] sm:text-xs text-gray-500 truncate'>{doctor.speciality}</p>
                  </div>
                  <div className='text-right shrink-0'>
                    <p className='text-xs sm:text-sm font-bold text-primary'>{doctorAppointments}</p>
                    <p className='text-[8px] sm:text-[10px] text-gray-400'>bookings</p>
                  </div>
                </div>
              );
            })}
          </div>

          {doctors.length === 0 && (
            <div className='text-center py-6 sm:py-8'>
              <p className='text-gray-400 text-xs sm:text-sm'>No doctors yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Appointments */}
      <div className='glass rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 animate-fade-in-up'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
          <h3 className='text-lg font-bold text-gray-900'>Latest Appointments</h3>
          <a href='/all-appointments' className='text-sm text-primary font-semibold hover:text-indigo-700 transition-colors flex items-center gap-1'>
            View All
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </a>
        </div>

        {latestAppointments.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className='sm:hidden space-y-4'>
              {latestAppointments.map((appointment) => {
                const status = appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Pending';
                return (
                  <div key={appointment._id} className='bg-white/70 rounded-xl p-4 border border-gray-100 shadow-sm'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        <img 
                          src={appointment.userData?.image || 'https://via.placeholder.com/40'} 
                          alt={appointment.userData?.name}
                          className='w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm'
                        />
                        <div>
                          <p className='font-bold text-gray-900'>{appointment.userData?.name || 'N/A'}</p>
                          <p className='text-xs text-gray-500'>{appointment.userData?.email || ''}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                        status === 'Completed' ? 'bg-green-100 text-green-700' :
                        status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {status}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 mb-2'>
                      <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                      </svg>
                      <span className='text-sm text-gray-700'>{appointment.docData?.name || 'N/A'}</span>
                      <span className='text-xs text-gray-400'>• {appointment.docData?.speciality}</span>
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
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className='hidden sm:block overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-gray-100'>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Patient</th>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Doctor</th>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Date</th>
                    <th className='text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestAppointments.map((appointment) => {
                    const status = appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Pending';
                    return (
                      <tr key={appointment._id} className='border-b border-gray-50 table-row-hover'>
                        <td className='py-4 px-4'>
                          <div className='flex items-center gap-3'>
                            <img 
                              src={appointment.userData?.image || 'https://via.placeholder.com/40'} 
                              alt={appointment.userData?.name}
                              className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm'
                            />
                            <div>
                              <p className='font-semibold text-gray-900 text-sm'>{appointment.userData?.name || 'N/A'}</p>
                              <p className='text-xs text-gray-400'>{appointment.userData?.email || ''}</p>
                            </div>
                          </div>
                        </td>
                        <td className='py-4 px-4'>
                          <p className='text-sm text-gray-700'>{appointment.docData?.name || 'N/A'}</p>
                          <p className='text-xs text-gray-400'>{appointment.docData?.speciality || ''}</p>
                        </td>
                        <td className='py-4 px-4'>
                          <p className='text-sm font-medium text-gray-900'>{appointment.slotDate}</p>
                          <p className='text-xs text-gray-400'>{appointment.slotTime}</p>
                        </td>
                        <td className='py-4 px-4'>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                            status === 'Completed' ? 'bg-green-100 text-green-700' :
                            status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            <span className='w-1.5 h-1.5 rounded-full bg-current'></span>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
            <p className='text-gray-500'>No appointments yet</p>
            <p className='text-gray-400 text-sm'>Appointments will appear here when booked</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard