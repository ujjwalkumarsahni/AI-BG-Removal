import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext.jsx'
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  const { credit, loadCreditsData, darkMode, setDarkMode } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData()
    }
  }, [isSignedIn])

  return (
    <div
      className={`w-full flex justify-between items-center p-4 sm:px-24 sticky top-0 left-0 z-50 shadow-md transition-colors duration-300 
        ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      {/* Logo */}
      <Link to='/'>
        <img className='w-12 sm:w-15' src={assets.logo} alt="Logo" />
      </Link>

      {/* Right side */}
      <div className='flex items-center gap-3 sm:gap-4'>
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-500 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {isSignedIn ? (
          <>
            <button
              onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-blue-100 py-2 px-4 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img className="w-5" src={assets.credit_icon} alt="Credits" />
              <p className="text-xs sm:text-sm font-medium text-gray-800">
                Credits: {credit}
              </p>
            </button>
            <p className="max-sm:hidden">Hi, {user.fullName}</p>
            <UserButton />
          </>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 border text-white border-gray-500 rounded-full px-6 py-2 bg-gray-900 hover:bg-gray-800 transition-all"
          >
            Get Started
            <img src={assets.arrow_icon} alt="Arrow" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
