import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {

  const {docId} = useParams();

  const {doctors} = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const dateScrollRef = useRef(null);
  const timeScrollRef = useRef(null);
  const [showDateSwipe, setShowDateSwipe] = useState(true);
  const [showTimeSwipe, setShowTimeSwipe] = useState(true);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc=> doc._id === docId);
    setDocInfo(docInfo);
    
  }

  useEffect(()=>{
    getAvailableSlots();

  }, [docInfo]);

  const getAvailableSlots = async () => {
    setDocSlots([])

    //getting current date
    let today = new Date();

    for(let i = 0; i < 7; i++){
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate()+i);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      //setting hours

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30: 0);
      } else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = []

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        //add slots to array
        timeSlots.push({
          datetime : new Date(currentDate),
          time : formattedTime
        })

        // Increment curr time by 30 minutes;
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }

  }

  useEffect(()=> {
    fetchDocInfo();

  },[doctors, docId])

  useEffect(()=>{
    console.log(docSlots);

  },[docSlots])

  useEffect(() => {
    const checkDateScroll = () => {
      const container = dateScrollRef.current
      if (!container) return
      const { scrollLeft, scrollWidth, clientWidth } = container
      setShowDateSwipe(scrollLeft + clientWidth < scrollWidth - 10 && scrollLeft < 50)
    }

    const checkTimeScroll = () => {
      const container = timeScrollRef.current
      if (!container) return
      const { scrollLeft, scrollWidth, clientWidth } = container
      setShowTimeSwipe(scrollLeft + clientWidth < scrollWidth - 10 && scrollLeft < 50)
    }

    const dateContainer = dateScrollRef.current
    const timeContainer = timeScrollRef.current

    if (dateContainer) {
      dateContainer.addEventListener('scroll', checkDateScroll)
      checkDateScroll()
    }
    if (timeContainer) {
      timeContainer.addEventListener('scroll', checkTimeScroll)
      checkTimeScroll()
    }

    return () => {
      if (dateContainer) dateContainer.removeEventListener('scroll', checkDateScroll)
      if (timeContainer) timeContainer.removeEventListener('scroll', checkTimeScroll)
    }
  }, [docSlots, slotIndex])
  return docInfo && (
    <div className='px-4 sm:px-0 animate-fade-in'>
         {/* ----Doctor Details------ */}
         <div className='flex flex-col sm:flex-row gap-6 animate-fade-in-up'>
          <div className='w-full sm:w-auto relative group'>
            <div className='absolute inset-0 bg-gradient-to-br from-primary/30 to-indigo-500/30 rounded-2xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500'></div>
            <img className='relative bg-gradient-to-br from-primary to-indigo-600 w-full sm:max-w-72 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700' src={docInfo.image} alt={docInfo.name} />
          </div>

          <div className='flex-1 border border-gray-200 rounded-2xl p-6 sm:p-8 sm:py-7 bg-white sm:mx-0 -mt-16 sm:mt-0 relative z-10 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-right'>
            <div className='flex items-center gap-2 mb-3'>
              <p className='flex items-center gap-2 text-2xl sm:text-3xl text-gray-900 font-bold flex-wrap'>{docInfo.name}</p>
              <div className='relative'>
                <div className='absolute inset-0 bg-green-400 rounded-full blur-sm opacity-50 animate-pulse'></div>
                <img className='relative w-5 sm:w-6' src={assets.verified_icon} alt="Verified" />
              </div>
            </div>

            <div className='flex flex-wrap items-center gap-3 text-sm sm:text-base mt-2 mb-4'>
              <p className='text-gray-600'>{docInfo.degree} - {docInfo.speciality}</p>
              <span className='py-1 px-3 bg-gradient-to-r from-primary/10 to-indigo-500/10 text-primary border border-primary/20 rounded-full text-xs font-semibold'>{docInfo.experience} Years</span>
            </div>

            <div className='mb-4'>
              <p className='flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-2'>
                <img className='w-4 sm:w-5' src={assets.info_icon} alt="Info" />
                About
              </p>
              <p className='text-sm sm:text-base text-gray-600 max-w-[700px] leading-relaxed'>{docInfo.about}</p>
            </div>
            <div className='mt-6 p-4 bg-gradient-to-r from-primary/5 to-indigo-500/5 rounded-xl border border-primary/10'>
              <p className='text-base sm:text-lg font-semibold text-gray-900'>
                Appointment fee: <span className='text-primary text-xl sm:text-2xl'>${docInfo.fees}</span>
              </p>
            </div>
            
          </div>
         </div>

         {/* Booking slots */}

         <div className='sm:ml-72 sm:pl-4 mt-8 sm:mt-6 font-medium text-gray-700 px-2 sm:px-0 animate-fade-in-up'>
          <p className='text-xl sm:text-2xl font-bold mb-4'>Booking Slots</p>
          
          {/* Date Slots with Swipe Indicator */}
          <div className='relative'>
            {showDateSwipe && (
              <div className='absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none sm:hidden'>
                <div className='flex flex-col items-center gap-2 bg-gradient-to-l from-primary/90 via-primary/70 to-transparent px-4 py-3 rounded-l-full backdrop-blur-sm'>
                  <div className='flex items-center gap-1 text-white text-xs font-semibold animate-pulse'>
                    <span>More</span>
                    <svg className='w-4 h-4 animate-bounce-x' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M9 5l7 7-7 7' />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none sm:hidden'></div>
            <div 
              ref={dateScrollRef}
              className='flex gap-3 sm:gap-4 items-center w-full overflow-x-auto mt-4 sm:mt-5 pb-3 scrollbar-hide relative'
              style={{scrollBehavior: 'smooth'}}
            >
              {
                docSlots.length && docSlots.map((item,index)=>(
                  <div 
                    onClick={()=> setSlotIndex(index)} 
                    className={`group text-center py-5 sm:py-6 min-w-[70px] sm:min-w-20 rounded-2xl cursor-pointer shrink-0 transition-all duration-300 ${
                      slotIndex === index 
                        ? 'bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg scale-105' 
                        : 'border-2 border-gray-200 hover:border-primary hover:bg-primary/5'
                    }`} 
                    key={index}
                  >
                    <p className='text-xs sm:text-sm font-medium'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p className='text-lg sm:text-xl font-bold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                  </div>

                ))
              }
            </div>
          </div>

          {/* Time Slots with Swipe Indicator */}
          <div className='relative mt-5 sm:mt-6'>
            {showTimeSwipe && (
              <div className='absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none sm:hidden'>
                <div className='flex flex-col items-center gap-2 bg-gradient-to-l from-primary/90 via-primary/70 to-transparent px-4 py-3 rounded-l-full backdrop-blur-sm'>
                  <div className='flex items-center gap-1 text-white text-xs font-semibold animate-pulse'>
                    <span>More</span>
                    <svg className='w-4 h-4 animate-bounce-x' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M9 5l7 7-7 7' />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none sm:hidden'></div>
            <div 
              ref={timeScrollRef}
              className='flex items-center gap-2 sm:gap-3 w-full overflow-x-auto pb-3 scrollbar-hide relative'
              style={{scrollBehavior: 'smooth'}}
            >
              {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                <p 
                  onClick={()=>setSlotTime(item.time)} 
                  className={`text-sm sm:text-base font-medium shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full cursor-pointer transition-all duration-300 ${
                    item.time === slotTime
                      ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg scale-105' 
                      : 'text-gray-600 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 hover:scale-105'
                  }`} 
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>

              ))}
            </div>
          </div>
          <button className='group relative bg-gradient-to-r from-primary to-indigo-600 text-white text-sm sm:text-base font-semibold px-10 sm:px-16 py-4 sm:py-5 mt-8 sm:mt-10 rounded-full w-full sm:w-auto overflow-hidden liquid-button shadow-2xl hover:shadow-primary/50 transition-all duration-500'>
            <span className='relative z-10 flex items-center justify-center gap-2'>
              Book an Appointment
              <svg className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </span>
          </button>

         </div>

         {/* Listing related doctors */}

         <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment