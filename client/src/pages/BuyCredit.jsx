import React from 'react';
import { assets, plans } from '../assets/assets';

const BuyCredit = () => {
  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10 bg-gradient-to-b from-gray-100 to-white px-4'>

      {/* Section Title */}
      <button className="text-purple-600 border border-purple-600 px-6 py-2 rounded-full mb-4 hover:bg-purple-100 transition">
        Our Plans
      </button>
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Choose the plan that’s right for you
      </h1>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:scale-105 transition duration-300 border border-gray-200">

            {/* Plan Icon */}
            <img width={40} src={assets.logo_icon} alt="Plan Icon" className="mx-auto mb-4" />

            {/* Plan Details */}
            <p className="text-lg font-medium text-gray-700">{plan.id}</p>
            <p className="text-sm text-gray-500 mt-2">{plan.desc}</p>
            <p className="mt-4 text-xl font-semibold text-gray-800">
              <span className="text-purple-600">₹{plan.price}</span> / {plan.credits} Credits
            </p>

            {/* Get Started Button */}
            <button className="mt-5 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-full hover:opacity-90 transition">
              Purchase
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BuyCredit;
