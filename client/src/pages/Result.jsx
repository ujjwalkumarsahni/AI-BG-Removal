import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { resultImage, image, processType, darkMode } = useContext(AppContext);
  const navigate = useNavigate();

  const getTitle = () => {
    if (processType === "remove-bg") return "Background Removed";
    if (processType === "remove-text") return "Text Removed";
    if (processType === "reimagine") return "Reimagined Image";
    if (processType === "TextToImage") return "Text To Image";
    return "Processed Image";
  };

  return (
    <div
      className={`px-4 sm:px-8 lg:px-16 xl:px-24 py-10 min-h-screen ${
        darkMode ? "dark:bg-gray-900 dark:text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`rounded-2xl p-6 sm:p-8 shadow-md ${
          darkMode ? "dark:bg-gray-800" : "bg-white"
        }`}
      >
        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Original Image */}
          {processType !== "TextToImage" && (
            <div className="flex flex-col">
              <p
                className={`font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Original
              </p>
              <div className="rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center aspect-[4/3] overflow-hidden">
                {image ? (
                  <img
                    className="w-full h-full object-contain"
                    src={URL.createObjectURL(image)}
                    alt="Original"
                  />
                ) : (
                  <p className="text-gray-400 text-sm">No image uploaded</p>
                )}
              </div>
            </div>
          )}

          {/* Processed Image */}
          <div className="flex flex-col">
            <p
              className={`font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              {getTitle()}
            </p>
            <div className="rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center aspect-[4/3] overflow-hidden relative">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="Processed"
                  className="w-full h-full object-contain"
                />
              ) : image ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Processing...</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {resultImage && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/")}
              className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700 transition"
            >
              Try Another
            </button>
            <a
              href={resultImage}
              download
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
