import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuyCredit = () => {
  const { backendUrl, loadCreditsData,darkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken, userId } = useAuth();

  const initPay = async (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const token = await getToken();
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            loadCreditsData();
            navigate('/');
            toast.success("Credit Added");
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      },
      theme: {
        color: "#6a11cb"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { clerkId: userId, planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={`min-h-[80vh] text-center pt-14 bg-gradient-to-b  px-4 ${darkMode ? ' dark:bg-gray-800 dark:text-gray-100' : ' from-gray-100 to-white'}`}>
      <button className="text-purple-600 border border-purple-600 px-6 py-2 rounded-full mb-4 hover:bg-purple-100 transition">
        Our Plans
      </button>
      <h1 className={`text-3xl md:text-4xl font-semibold ${darkMode ? ' dark:text-gray-400' : ' text-gray-800'} text-gray-800`}>
        Choose the plan that’s right for you
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md hover:scale-105 transition duration-300 border border-gray-200 ${darkMode ? ' dark:bg-gray-700' : 'bg-white'}`}
          >
            <img width={40} src={assets.logo_icon} alt="Plan Icon" className="mx-auto mb-4" />
            <p className={`text-lg font-medium ${darkMode ? ' dark:text-gray-100' : 'text-gray-700'}`}>{plan.id}</p>
            <p className={`text-sm ${darkMode ? ' dark:text-gray-300' : 'text-gray-500'} mt-2`}>{plan.desc}</p>
            <p className={`mt-4 text-xl font-semibold ${darkMode ? ' dark:text-gray-300' : 'text-gray-800'}`}>
              <span className={`${darkMode ? ' dark:text-blue-600' : 'text-purple-700'}`}>₹{plan.price}</span> / {plan.credits} Credits
            </p>
            <button
              onClick={() => paymentRazorpay(plan.id)}
              className="mt-5 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-full hover:opacity-90 transition cursor-pointer"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
