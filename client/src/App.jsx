import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Result from './pages/Result.jsx'
import BuyCredit from './pages/BuyCredit.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
