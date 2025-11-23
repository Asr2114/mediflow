import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-full p-4 sm:p-8 lg:p-12'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Dashboard</h1>
        <p className='text-gray-600'>Welcome back! Here's your healthcare platform overview</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
        {/* Total Doctors */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Total Doctors</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>24</p>
            </div>
            <div className='w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors'>
              <svg className='w-7 h-7 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
            </div>
          </div> 
          <p className='text-xs text-green-600 font-semibold mt-4'>↑ 2 this month</p>
        </div>

        {/* Total Appointments */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Appointments</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>156</p>
            </div>
            <div className='w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors'>
              <svg className='w-7 h-7 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
          </div>
          <p className='text-xs text-green-600 font-semibold mt-4'>↑ 12 this week</p>
        </div>

        {/* Completed */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Completed</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>142</p>
            </div>
            <div className='w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors'>
              <svg className='w-7 h-7 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
          <p className='text-xs text-green-600 font-semibold mt-4'>91% Success Rate</p>
        </div>

        {/* Revenue */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-medium mb-1'>Revenue</p>
              <p className='text-3xl sm:text-4xl font-bold text-gray-900'>₹4.2k</p>
            </div>
            <div className='w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition-colors'>
              <svg className='w-7 h-7 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
          <p className='text-xs text-green-600 font-semibold mt-4'>↑ 8% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Appointments Chart */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
          <h3 className='text-lg font-bold text-gray-900 mb-6'>Appointments Overview</h3>
          <div className='h-64 bg-linear-to-br from-blue-500/5 to-indigo-500/5 rounded-xl flex items-center justify-center'>
            <p className='text-gray-500 text-sm'>Chart placeholder - Ready for integration</p>
          </div>
        </div>

        {/* Doctors Performance */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
          <h3 className='text-lg font-bold text-gray-900 mb-6'>Top Doctors</h3>
          <div className='space-y-4'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center'>
                    <span className='text-sm font-bold text-primary'>{item}</span>
                  </div>
                  <div>
                    <p className='font-semibold text-gray-900 text-sm'>Dr. Doctor Name</p>
                    <p className='text-xs text-gray-500'>Speciality</p>
                  </div>
                </div>
                <span className='text-sm font-bold text-primary'>24 pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-6'>Recent Appointments</h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-200'>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Patient</th>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Doctor</th>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Date</th>
                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                  <td className='py-4 px-4 text-sm text-gray-900'>Patient Name {item}</td>
                  <td className='py-4 px-4 text-sm text-gray-700'>Dr. Doctor {item}</td>
                  <td className='py-4 px-4 text-sm text-gray-700'>Nov {15 + item}, 2024</td>
                  <td className='py-4 px-4'>
                    <span className='inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard