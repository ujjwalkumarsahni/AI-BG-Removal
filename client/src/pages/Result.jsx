import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { resultImage, image, credit, processType, darkMode } = useContext(AppContext);
  const navigate = useNavigate();

  const getTitle = () => {
    if (processType === "remove-bg") return "Background Removed";
    if (processType === "remove-text") return "Text Removed";
    if (processType === "reimagine") return "Reimagine";
    return "Processed Image";
  };

  return (
    <div className={`px-4 py-3 lg:px-44 pt-20 min-h-[100vh] ${darkMode ? ' dark:bg-gray-800 dark:text-gray-100' : ' from-gray-100 to-white'}`}>
      <div className={`${darkMode ? ' dark:bg-gray-700' : 'bg-white'} rounded-lg px-8 py-6 drop-shadow-sm h-[100%]`}>
        
        {/* Image Sections */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          
          {/* Original Image */}
          <div>
            <p className={`font-semibold ${darkMode ? ' dark:text-white' : 'text-gray-600'} pb-2`}>Original</p>
            <img
              className="rounded-md border border-gray-300 w-full object-cover"
              src={image ? URL.createObjectURL(image) : ''}
              alt="Original"
            />
          </div>

          {/* Processed Image */}
          <div className="flex flex-col">
            <p className={`font-semibold pb-2 ${darkMode ? ' dark:text-white' : 'text-gray-600'}`}>{getTitle()}</p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer flex items-center justify-center">
              <img src={resultImage ? resultImage : ""} alt="Processed" className="w-full object-cover" />
              {!resultImage && image && (
                <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        {resultImage && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => navigate('/')}
              className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-100 transition"
            >
              Try another image
            </button>
            <a
              href={resultImage}
              download
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
