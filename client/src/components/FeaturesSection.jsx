import React, { useContext } from "react";
import { videoAssets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

const features = [
  {
    key: "removeBg",
    title: "Remove Background",
    videoSrc: videoAssets.removeBg,
    description: `Quickly remove the background of any image with incredible accuracy using our advanced API. 
    No extra work required! The most precise background removal solution available.`,
  },
  {
    key: "removeText",
    title: "Remove Text",
    videoSrc: videoAssets.removeText,
    description: `Effortlessly erase unwanted text from images while preserving the rest of your picture intact. 
    Ideal for cleaning up photos or creating clean visuals.`,
  },
  {
    key: "reimagine",
    title: "Reimagine",
    videoSrc: videoAssets.reimagine,
    description: `Give your images a creative transformation by applying AI-powered reimagination. 
    Enhance or completely alter visuals to fit your style or vision.`,
  },
  {
    key: "textToImage",
    title: "Text to Image",
    videoSrc: videoAssets.textToImage, 
    description: `Turn your imagination into reality! Enter a simple text prompt and generate stunning AI-powered images in seconds. 
    Perfect for creative projects, design ideas, or fun experimentation.`,
  },
];

const FeatureCard = ({ darkMode, title, videoSrc, description }) => (
  <div
    className={`${
      darkMode ? "dark:bg-gray-700" : "bg-white"
    } rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-blue-600`}
  >
    <div className="relative w-full aspect-video">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
      />
    </div>
    <div className="p-4 sm:p-6">
      <h3
        className={`${
          darkMode ? "dark:text-white" : "text-blue-600"
        } font-semibold text-base sm:text-lg mb-2`}
      >
        {title}
      </h3>
      <p
        className={`${
          darkMode ? "dark:text-gray-300" : "text-gray-700"
        } text-xs sm:text-sm leading-relaxed`}
      >
        {description}
      </p>
    </div>
  </div>
);

const FeaturesSection = () => {
  const { darkMode } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-8 pt-16 sm:pt-20">
      {/* Section Title */}
      <h2
        className={`text-center text-xl sm:text-3xl lg:text-4xl font-medium bg-gradient-to-r bg-clip-text text-transparent mb-10 sm:mb-16 ${
          darkMode
            ? "dark:from-gray-500 dark:to-gray-100"
            : "from-gray-900 to-gray-400"
        }`}
      >
        Powerful AI Tools to Transform Your Images
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {features.map(({ key, title, videoSrc, description }) => (
          <FeatureCard
            darkMode={darkMode}
            key={key}
            title={title}
            videoSrc={videoSrc}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
