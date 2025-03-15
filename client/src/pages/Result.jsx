import React from "react";
import { assets } from "../assets/assets";

const Result = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm max-w-4xl w-full">
        
        {/* Image Sections */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          
          {/* Original Image */}
          <div>
            <p className="font-semibold text-gray-600 pb-2">Original</p>
            <img
              className="rounded-md border border-gray-300 w-full object-cover"
              src={assets.image_w_bg}
              alt="Original"
            />
          </div>

          {/* Background Removed Image */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 pb-2">Background Removed</p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer flex items-center justify-center">
              {/* Uncomment when image is ready */}
              {/* <img src={assets.image_wo_bg} alt="Processed" className="w-full object-cover" /> */}

              {/* Loader (Centered) */}
              <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-100 transition">
            Try another image
          </button>
          <a
            href="#"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Download image
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
