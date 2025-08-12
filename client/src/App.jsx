import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Result from './pages/Result.jsx'
import BuyCredit from './pages/BuyCredit.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactUs from './pages/ContactUs.jsx'
import HelpCenter from './pages/HelpCenter.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfUse from './pages/TermsOfUse.jsx'
import NotFound from './pages/NotFound.jsx'

const App = () => {
  const location = useLocation();

  // All valid paths
  const validPaths = ["/", "/result", "/buy", "/contact", "/help", "/privacy", "/terms"];

  const isWrongRoute = !validPaths.includes(location.pathname);
  return (
    <div className='min-h-screen bg-slate-50'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Only show footer if not a wrong route */}
      {!isWrongRoute && <Footer />}
    </div>
  )
}

export default App
