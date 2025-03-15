import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5">
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* Quote Icon */}
            <p className="text-4xl text-blue-500 font-bold mb-3">“</p>
            
            {/* Testimonial Text */}
            <p className="text-gray-700 text-lg italic mb-4">"{item.text}"</p>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-4">
              <img
                src={item.image}
                alt={item.author}
                className="w-12 h-12 rounded-full border-2 border-blue-500"
              />
              <div>
                <p className="text-gray-900 font-semibold">{item.author}</p>
                <p className="text-gray-500 text-sm">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
