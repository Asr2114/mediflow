import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import StatsSection from '../components/StatsSection'
import TopDoctors from '../components/TopDoctors'
import FeaturesSection from '../components/FeaturesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='overflow-hidden'>
        <Header/>
        <SpecialityMenu/>
        <StatsSection/>
        <TopDoctors/>
        <FeaturesSection/>
        <TestimonialsSection/>
        <CTASection/>
        
    </div>
  )
}

export default Home