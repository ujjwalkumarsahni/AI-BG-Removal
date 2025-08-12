import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  const { credit, loadCreditsData } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData()
    }
  }, [isSignedIn])

  return (
    <div className='w-full flex justify-between items-center p-4  sm:px-24 sticky top-0 left-0 z-100 bg-white shadow-md'>
      <Link to='/'><img className='w-12 sm:w-15' src={assets.logo} alt="" /></Link>
      {isSignedIn ?
        <div className='flex items-center gap-2 sm:gap-3'>
          <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-blue-100 py-2 px-6 sm:px-3 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer'>
            <img className='w-5' src={assets.credit_icon} alt="" />
            <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits: {credit}</p>
          </button>
          <p className='max-sm:hidden text-gray-600'>Hi, {user.fullName}</p>
          <UserButton />
        </div>
        : <button onClick={() => openSignIn()} className='flex item-center gap-2 border text-white border-gray-500 rounded-full px-6 py-2 bg-gray-900 transition-all'>Get Started <img src={assets.arrow_icon} alt="" /></button>
      }
    </div>
  )
}

export default Navbar

