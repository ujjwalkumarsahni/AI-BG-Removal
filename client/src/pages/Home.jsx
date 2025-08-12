import React from 'react'
import Header from '../components/Header.jsx'
import Steps from '../components/Steps.jsx'
import BgSlider from '../components/BgSlider.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'

const Home = () => {
  return (
    <div>
      <Header />
      <FeaturesSection />
      <Steps />
      <BgSlider />
      <Testimonials />
    </div>
  )
}

export default Home
