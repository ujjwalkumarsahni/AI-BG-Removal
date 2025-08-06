import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import AppContext from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  // const navigate = useNavigate()

  // const {userData, backendUrl,setUserData,setIsLoggedin} = useContext(AppContext)

  // const sendVerificationOtp = async () => {
  //     try {
  //         axios.defaults.withCredentials = true;
  //         const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);

  //         if(data.success){
  //             navigate('/email-verify');
  //             toast.success(data.message);
  //         }else{
  //             toast.error(data.message)
  //         }
  //     } catch (error) {
  //         toast.error(error.message);
  //     }
  // }

  // const logout = async () => {
  //     try {
  //         axios.defaults.withCredentials = true;
  //         const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

  //         data.success && setIsLoggedin(false);
  //         data.success && setUserData(false);
  //         navigate('/');  
  //     } catch (error) {
  //         toast.error(error.message);
  //     }
  // }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 left-0'>
      <Link to='/'><img className='w-32 sm:w-44' src={assets.logo} alt="" /></Link>
      {isSignedIn ?
        <div>
          <UserButton />
        </div>
        : <button onClick={() => openSignIn()} className='flex item-center gap-2 border text-white border-gray-500 rounded-full px-6 py-2 bg-gray-900 transition-all'>Get Started <img src={assets.arrow_icon} alt="" /></button>
      }
    </div>
  )
}

export default Navbar

