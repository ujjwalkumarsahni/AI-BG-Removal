import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'

const Steps = () => {
  const { darkMode } = useContext(AppContext)
  return (
    <div className='mx-4 lg:mx-35 py-20 xl:py-30'>
      <h1 className={`text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-medium bg-gradient-to-r ${darkMode ? ' dark:from-gray-500 dark:to-gray-100' : 'from-gray-900 to-gray-400'} bg-clip-text text-transparent`}>Steps to remove background<br /> image in seconds</h1>
      <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>

        <div className={`flex items-start gap-4 ${darkMode ? ' dark:bg-gray-700' : 'bg-white'} border-1 border-blue-600 p-7 pb-10 drop-shadow-md rounded hover:scale-105 transition-all duration-500`}>
            <img className='max-w-9' src={assets.upload_icon} alt="" />
            <div>
                <p className='text-xl font-medium'>Upload image</p>
                <p className={`text-sm ${darkMode ? ' dark:text-neutral-300' : 'text-neutral-500'} mt-1`}>This is a demo text, will replace it later.<br /> This is a demo..</p>
            </div>
        </div>
        <div className={`flex items-start gap-4 ${darkMode ? ' dark:bg-gray-700' : 'bg-white'} border-1 border-blue-600 p-7 pb-10 drop-shadow-md rounded hover:scale-105 transition-all duration-500`}>
            <img className='max-w-9' src={assets.remove_bg_icon} alt="" />
            <div>
                <p className='text-xl font-medium'>Remove background</p>
                <p className={`text-sm ${darkMode ? ' dark:text-neutral-300' : 'text-neutral-500'} mt-1`}>This is a demo text, will replace it later.<br /> This is a demo..</p>
            </div>
        </div>
        <div className={`flex items-start gap-4 ${darkMode ? ' dark:bg-gray-700' : 'bg-white'} border-1 border-blue-600 p-7 pb-10 drop-shadow-md rounded hover:scale-105 transition-all duration-500`}>
            <img className='max-w-9' src={assets.upload_icon} alt="" />
            <div>
                <p className='text-xl font-medium'>Download image</p>
                <p className={`text-sm ${darkMode ? ' dark:text-neutral-300' : 'text-neutral-500'} mt-1`}>This is a demo text, will replace it later.<br /> This is a demo..</p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Steps
