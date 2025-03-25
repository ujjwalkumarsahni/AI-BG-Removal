import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const {backendUrl,userData,getUserData,isLoggedin} = useContext(AppContext)

  const inputRef = React.useRef([]);

  const handleInput = (e,i) =>{
    if(e.target.value.length > 0 && i < inputRef.current.length - 1){
      inputRef.current[i+1].focus();
    }
  }

  const handleKeyDown = (e,i) => {
    if(e.key === 'Backspace' && e.target.value === '' && i > 0){
      inputRef.current[i-1].focus();
    }
  }

  const handlePaste = (e) =>{
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char,i) => {
      if(inputRef.current[i]){
        inputRef.current[i].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) =>{
    try {
      e.preventDefault();
      const otpArray = inputRef.current.map(input => input.value);
      const otp = otpArray.join('');
      const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`, {otp});
      if(data.success){
        toast.success(data.message);
        getUserData()
        navigate('/');
      }
      else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/');
  },[isLoggedin,userData])

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={()=> navigate('/')} src={assets.logo} alt="" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"/>
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96  text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_,i) => <input key={i} type="text" maxLength='1' ref={e => inputRef.current[i] = e} onInput={(e) => handleInput(e,i)} onKeyDown={(e) => handleKeyDown(e,i)} className='w-12 h-12 text-center bg-[#333A5C] text-white text-xl rounded-md' required/>)}
        </div>

        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify email</button>
      </form>
    </div>
  )
}

export default EmailVerify
