import React, { useContext } from "react";
import { testimonialsData } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

const Testimonials = () => {
  const { darkMode } = useContext(AppContext);
  return (
    <div className="pb-10">
      <h1 className={`text-center text-2xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-r ${darkMode ? ' dark:from-gray-500 dark:to-gray-100' : 'from-gray-900 to-gray-400'} bg-clip-text text-transparent py-5`}>
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className={`${darkMode ? ' dark:bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-md border-l-4 border-blue-500 
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
          >
            {/* Quote Icon */}
            <p className="text-4xl text-blue-500 font-bold mb-3">“</p>
            
            {/* Testimonial Text */}
            <p className={`${darkMode ? ' dark:text-gray-200' : 'text-gray-700'} text-lg italic mb-4`}>"{item.text}"</p>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-4">
              <img
                src={item.image}
                alt={item.author}
                className="w-12 h-12 rounded-full border-2 border-blue-500"
              />
              <div>
                <p className={`${darkMode ? ' dark:text-gray-300' : 'text-gray-900'} font-semibold`}>{item.author}</p>
                <p className={`${darkMode ? ' dark:text-gray-400' : 'text-gray-500'} text-sm`}>{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
