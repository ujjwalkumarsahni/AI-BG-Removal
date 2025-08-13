import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const {darkMode} = useContext(AppContext);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return ( 
    <div className='pb-10 md:py-10 mx-2'>
      <h1 className={`mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-medium bg-gradient-to-r ${darkMode ? ' dark:from-gray-500 dark:to-gray-100' : 'from-gray-900 to-gray-400'} bg-clip-text text-transparent `}>
        Remove Background With High <br />Quality and Accuracy
      </h1>
      <div className='relative w-full max-w-3xl overflow-hidden mx-auto rounded-xl border-2 border-blue-600 shadow-lg'>
        
        <img 
          src={assets.image_w_bg} 
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }} 
          alt="" 
        />
        <img 
          src={assets.image_wo_bg} 
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} 
          alt=""
          className='absolute top-0 left-0 w-full h-full' 
        />

        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPosition} 
          onChange={handleSliderChange} 
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-full z-10 slider"
        />
      </div>
    </div>
  );
};

export default BgSlider;
