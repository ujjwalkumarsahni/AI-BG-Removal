import { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify'; // 🔥 Toastify import
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const { removeBg, removeText, reimagine, textToimage, processType, setProcessType, darkMode } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');

  // ❌ Restricted words list
  const restrictedWords = [
  "nude", "naked", "porn", "sex", "sexy", "hot", "nsfw", 
  "erotic", "adult", "lingerie", "bikini", "underwear", "fetish"
];

  const handleFileChange = (file) => {
    if (!file) return;
    if (processType === "remove-bg") {
      removeBg(file);
    } else if (processType === "remove-text") {
      removeText(file);
    }
    else if (processType === "reimagine") {
      reimagine(file);
    }
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();

    // ✅ Restriction check
    const lowerPrompt = prompt.toLowerCase();
    const foundWord = restrictedWords.find(word => lowerPrompt.includes(word));

    if (foundWord) {
      toast.warning(`⚠️ "${foundWord}" word is not allowed! Please use safe words.`);
      return; // ❌ Stop API call
    }

    if (processType === 'TextToImage' && prompt.trim()) {
      textToimage(prompt);
    }
  };

  return (
    <div className='flex flex-col-reverse sm:flex-row justify-between items-center gap-y-10 px-4 lg:px-35'>
      {/* left side */}
      <div>
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight'>
          Remove the <br />
          <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>
            background
          </span> or text from<br />images for free.
        </h1>
        <p className='my-6 text-[16px] text-gray-400'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          Lorem Ipsum has been the industry's standard dummy text ever.
        </p>

        {/* Select Action */}
        <div className='mb-4'>
          <label className="block font-medium mb-1">Choose Action</label>
          <select
            value={processType}
            onChange={(e) => setProcessType(e.target.value)}
            className={`${darkMode ? ' dark:bg-gray-700' : 'bg-white'} border border-gray-300 rounded-lg px-3 py-2`}
          >
            <option value="remove-bg">Remove Background</option>
            <option value="remove-text">Remove Text</option>
            <option value="reimagine">Reimagine</option>
            <option value="TextToImage">Text To Image</option>
          </select>
        </div>

        {/* Prompt input for Text-to-Image */}
        {processType === 'TextToImage' && (
          <form onSubmit={handlePromptSubmit} className="mb-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full border rounded-lg px-3 py-2 mb-2"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:scale-105 transition-all duration-500"
            >
              Generate
            </button>
          </form>
        )}

        {processType !== 'TextToImage' && (
          <>
            <input
              onChange={e => handleFileChange(e.target.files[0])}
              type='file'
              accept='image/*'
              id='upload'
              hidden
            />
            <label
              className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'
              htmlFor="upload"
            >
              <img width={20} src={assets.upload_btn_icon} alt="" />
              <p className='text-white text-sm'>Upload your image</p>
            </label>
          </>
        )}
      </div>

      {/* right side */}
      <div className='w-full max-w-md'>
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
