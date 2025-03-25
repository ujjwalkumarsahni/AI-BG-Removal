import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import AppContext from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
    const navigate = useNavigate()

    const {userData, backendUrl,setUserData,setIsLoggedin} = useContext(AppContext)

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);

            if(data.success){
                navigate('/email-verify');
                toast.success(data.message);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

            data.success && setIsLoggedin(false);
            data.success && setUserData(false);
            navigate('/');  
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 left-0'>
      <Link to='/'><img className='w-32 sm:w-44' src={assets.logo} alt="" /></Link>
      {userData 
      ? 
      <div className='w-8 h-8 flex justify-center items-center bg-black text-white rounded-full cursor-pointer relative group' >
        {userData.name[0].toUpperCase()}
        <div className='absolute top-0 right-0 text-black pt-10 z-10 rounded hidden group-hover:block'>
          <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
          </ul>
        </div>
      </div> 
      : <button onClick={() => navigate('/login')} className='flex item-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Get Started <img src={assets.arrow_icon} alt="" /></button>
      }
    </div>
  )
}

export default Navbar

