import React, { forwardRef } from 'react'

const Receipt = forwardRef(({ receiptData, onClose }, ref) => {
  if (!receiptData) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto'>
        {/* Header with close button */}
        <div className='sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10'>
          <h2 className='text-xl font-bold text-gray-800'>Payment Receipt</h2>
          <button 
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <svg className='w-6 h-6 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Receipt Content */}
        <div ref={ref} className='p-8 bg-white' id='receipt-content'>
          {/* Logo and Title */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center gap-2 mb-2'>
              <div className='w-10 h-10 bg-linear-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center'>
                <span className='text-white text-xl'>🏥</span>
              </div>
              <h1 className='text-2xl font-bold bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>
                MediFlow
              </h1>
            </div>
            <p className='text-gray-500 text-sm'>Healthcare Appointment Platform</p>
            <div className='mt-4 inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold'>
              ✓ Payment Successful
            </div>
          </div>

          {/* Receipt Number */}
          <div className='bg-linear-to-r from-primary/10 to-indigo-500/10 rounded-xl p-4 mb-6 text-center'>
            <p className='text-sm text-gray-600 mb-1'>Receipt Number</p>
            <p className='text-xl font-bold text-gray-900 tracking-wider'>{receiptData.receiptNumber}</p>
          </div>

          {/* Patient & Doctor Info */}
          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            {/* Patient Details */}
            <div className='bg-gray-50 rounded-xl p-4'>
              <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>Patient Details</h3>
              <div className='space-y-2'>
                <p className='font-semibold text-gray-900'>{receiptData.patientName}</p>
                <p className='text-sm text-gray-600'>{receiptData.patientEmail}</p>
              </div>
            </div>

            {/* Doctor Details */}
            <div className='bg-gray-50 rounded-xl p-4'>
              <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>Doctor Details</h3>
              <div className='space-y-2'>
                <p className='font-semibold text-gray-900'>{receiptData.doctorName}</p>
                <p className='text-sm text-primary font-medium'>{receiptData.doctorSpeciality}</p>
                <p className='text-xs text-gray-500'>
                  {receiptData.doctorAddress?.line1}
                  {receiptData.doctorAddress?.line2 && `, ${receiptData.doctorAddress.line2}`}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className='bg-blue-50 rounded-xl p-4 mb-6'>
            <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>Appointment Details</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-xs text-gray-500'>Date</p>
                <p className='font-semibold text-gray-900'>{receiptData.appointmentDate}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Time</p>
                <p className='font-semibold text-gray-900'>{receiptData.appointmentTime}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className='border-2 border-dashed border-gray-200 rounded-xl p-4 mb-6'>
            <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4'>Payment Details</h3>
            
            <div className='space-y-3'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Consultation Fee</span>
                <span className='font-medium'>₹{receiptData.amount}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Platform Fee</span>
                <span className='font-medium'>₹0</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Tax</span>
                <span className='font-medium'>₹0</span>
              </div>
              <div className='border-t pt-3 flex justify-between'>
                <span className='font-bold text-gray-900'>Total Amount</span>
                <span className='font-bold text-xl text-primary'>₹{receiptData.amount}</span>
              </div>
            </div>
          </div>

          {/* Transaction Info */}
          <div className='bg-gray-50 rounded-xl p-4 mb-6'>
            <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>Transaction Information</h3>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Payment ID</span>
                <span className='font-mono text-gray-700 text-xs'>{receiptData.paymentId}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Order ID</span>
                <span className='font-mono text-gray-700 text-xs'>{receiptData.orderId}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Paid On</span>
                <span className='text-gray-700'>{formatDate(receiptData.paidAt)} at {formatTime(receiptData.paidAt)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Payment Method</span>
                <span className='text-gray-700'>Razorpay</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='text-center text-xs text-gray-400 mt-8 pt-4 border-t'>
            <p>This is a computer-generated receipt and does not require a signature.</p>
            <p className='mt-1'>Thank you for choosing MediFlow!</p>
            <p className='mt-2'>For any queries, contact: support@mediflow.com</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='sticky bottom-0 bg-white p-4 border-t flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors'
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className='flex-1 py-3 px-4 bg-linear-to-r from-primary to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
            </svg>
            Download / Print
          </button>
        </div>
      </div>
    </div>
  )
})

Receipt.displayName = 'Receipt'

export default Receipt
