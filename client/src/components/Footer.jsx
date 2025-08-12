import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-600 to-blue-500 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo & Intro */}
          <div>
            <Link to='/'><img className='w-16 sm:w-20' src={assets.logo} alt="" /></Link>
            <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
              High-quality ReImage service with precision and speed.
            </p>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="help" className="hover:underline">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="terms" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h4 className="font-semibold mb-3">Social</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-4 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} ReImage. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
