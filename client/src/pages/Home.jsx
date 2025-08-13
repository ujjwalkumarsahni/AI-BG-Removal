import React, { useContext } from 'react'
import Header from '../components/Header.jsx'
import Steps from '../components/Steps.jsx'
import BgSlider from '../components/BgSlider.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'
import { AppContext } from '../context/AppContext.jsx'

const Home = () => {
  const { darkMode } = useContext(AppContext)
  return (
    <div className={`${darkMode ? ' dark:bg-gray-800 dark:text-gray-100' : ' bg-white text-gray-900'}`}>
      <Header />
      <FeaturesSection />
      <Steps />
      <BgSlider />
      <Testimonials />
    </div>
  )
}

export default Home
