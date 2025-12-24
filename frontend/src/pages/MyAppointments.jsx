import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {


  const {backendUrl, token} = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async()=>{
    try{
      const {data} = await axios.get(backendUrl + '/api/user/list-appointments', {headers:{token}});

      if(data.success){
        setAppointments(data.appointments);
      }

    }catch(error){
      console.log("Error fetching appointments:", error);
      toast.error("Error fetching appointments: " + error.message);
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments();
    }
    
  },[token])

  const cancelAppointment = async(appointmentId) =>{
    try{
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}} );

      if(data.success){
        toast.success("Appointment cancelled successfully");
        getUserAppointments();
      } else{
        toast.error(data.message);
      }

    }catch(error){
      toast.error("Error cancelling appointment: " + error.message);
    }
  }

  const initPay = (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:"MediFlow",
      description:"Appointment Payment",
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response) =>{
        console.log("Payment Success:", Response);
        toast.success('Payment successful');

        
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();

  }

  const appointmentRazorpay = async(appointmentId) =>{
    try{
      const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId}, {headers:{token}});
      if(data.success){
        toast.success("Payment initiated successfully");
        
        initPay(data.order);
      } else{
        toast.error(data.message);
      }

    }catch(error){
      toast.error("Error in payment: " + error.message);
    }


  }
  

  return (
    <div className='px-4 sm:px-0 animate-fade-in'>
      <div className='mb-8 animate-fade-in-up'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
          My <span className='bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent'>Appointments</span>
        </h1>
        <p className='text-gray-600 text-sm sm:text-base'>Manage and view your upcoming appointments</p>
      </div>

      {appointments.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 animate-fade-in-up'>
          <div className='w-24 h-24 bg-linear-to-br from-primary/10 to-indigo-500/10 rounded-full flex items-center justify-center mb-6'>
            <svg className='w-12 h-12 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Appointments Yet</h3>
          <p className='text-gray-500 text-sm text-center max-w-md mb-6'>You haven't booked any appointments yet. Start by finding a doctor that suits your needs.</p>
          <button onClick={() => window.location.href = '/doctors'} className='bg-linear-to-r from-primary to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300'>
            Find Doctors
          </button>
        </div>
      ) : (
        <div className='mt-6 space-y-6'>
          {appointments.map((item,index)=>(
            <div className='group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-4 sm:p-6 transition-all duration-500 card-hover animate-scale-in' key={index} style={{animationDelay: `${index * 0.1}s`}}>
              <div className='shrink-0 relative'>
                <div className='absolute inset-0 bg-linear-to-br from-primary/20 to-indigo-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <img className='relative w-full sm:w-36 h-36 object-cover bg-indigo-50 rounded-xl shadow-md' src={item.docData.image} alt={item.docData.name} />
              </div>
              <div className='flex-1 text-sm text-gray-600'>
                <p className='text-gray-900 font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300'>{item.docData.name}</p>
                <p className='text-primary font-medium text-sm mb-3'>{item.docData.speciality}</p>
                
                <div className='space-y-2'>
                  <div className='flex items-start gap-2'>
                    <svg className='w-4 h-4 text-gray-400 mt-0.5 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    <div className='text-xs text-gray-500'>
                      <p>{item.docData.address?.line1}</p>
                      <p>{item.docData.address?.line2}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-2'>
                    <svg className='w-4 h-4 text-gray-400 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    <p className='text-sm'>
                      <span className='font-semibold text-gray-700'>{item.slotDate}</span>
                      <span className='mx-2 text-gray-300'>|</span>
                      <span className='text-primary font-semibold'>{item.slotTime}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-row sm:flex-col gap-3 justify-start sm:justify-center mt-2 sm:mt-0'>
                {!item.cancelled && !item.isCompleted && (
                  <>
                    <button onClick={()=>appointmentRazorpay(item._id)} className='group/btn relative bg-linear-to-r from-primary to-indigo-600 text-white text-sm font-semibold text-center w-full sm:min-w-48 py-3 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-500'>
                      <span className='relative z-10 flex items-center justify-center gap-2'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                        </svg>
                        Pay Online
                      </span>
                    </button>
                    <button onClick={()=>cancelAppointment(item._id)} className='text-sm font-semibold text-center w-full sm:min-w-48 py-3 border-2 border-red-200 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 cursor-pointer text-red-600 flex items-center justify-center gap-2'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                      Cancel
                    </button>
                  </>
                )}
                {item.cancelled && (
                  <div className='flex items-center justify-center gap-2 w-full sm:min-w-48 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    Cancelled
                  </div>
                )}
                {item.isCompleted && (
                  <div className='flex items-center justify-center gap-2 w-full sm:min-w-48 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-semibold'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    Completed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments