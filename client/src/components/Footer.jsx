import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-6 px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <img src={assets.logo} alt="Logo" className="w-28" />

        {/* Description */}
        <p className="text-gray-200 text-sm text-center sm:text-left max-w-md">
          High-quality background removal service with precision and speed.
        </p>

        {/* Social Media Icons */}
        <div className="flex gap-6">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            width={30}
            className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            width={30}
            className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
          <img
            src={assets.google_plus_icon}
            alt="Google Plus"
            width={30}
            className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </div>

      </div>

      {/* Copyright */}
      <p className="text-gray-300 text-xs text-center mt-4">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
