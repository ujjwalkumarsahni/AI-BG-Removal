import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);


  const inputRef = React.useRef([]);

  const handleInput = (e, i) => {
    if (e.target.value.length > 0 && i < inputRef.current.length - 1) {
      inputRef.current[i + 1].focus();
    }
  }

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && e.target.value === '' && i > 0) {
      inputRef.current[i - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = char;
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        setIsEmailSent(true);
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map(input => input.value);
    const otpValue = otpArray.join('');
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setOtp(otpValue);
    setIsOtpSubmitted(true);
  }


  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className="flex justify-center items-center h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" />

      {/* Add the form for password reset here */}
      {!isEmailSent &&
        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96  text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter your register email address</p>
          <div className="flex items-center gap-3 w-full rounded-full mb-4 px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input className="bg-transparent outline-none text-white" onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter Email id" required />
          </div>

          <button className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            Submit
          </button>
        </form>
      }

      {/* Add the form for OTP verification here */}
      {!isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96  text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id</p>
          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, i) => <input key={i} type="text" maxLength='1' ref={e => inputRef.current[i] = e} onInput={(e) => handleInput(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} className='w-12 h-12 text-center bg-[#333A5C] text-white text-xl rounded-md' required />)}
          </div>

          <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Submit</button>
        </form>

      }

      {/* enter new password */}
      {isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96  text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter the new password</p>
          <div className="flex items-center gap-3 w-full rounded-full mb-4 px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input className="bg-transparent outline-none text-white" onChange={e => setNewPassword(e.target.value)} value={newPassword} type="password" placeholder="Enter new password" required />
          </div>

          <button className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            Submit
          </button>
        </form>
      }

    </div>
  )
}

export default ResetPassword
