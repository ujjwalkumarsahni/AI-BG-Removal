import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const faqs = [
  {
    question: 'What is TrimBackground?',
    answer: 'TrimBackground is a tool that helps you remove backgrounds from images quickly and easily.'
  },
  {
    question: 'How do I upload an image?',
    answer: 'Click on the "Upload" button on the homepage and select your image file.'
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support JPG, PNG, and BMP formats.'
  },
  {
    question: 'Is there a limit to image size?',
    answer: 'Yes, images must be less than 10MB in size.'
  },
  {
    question: 'Who can I contact for support?',
    answer: 'You can email support@trimbackground.com or use the contact form on our website.'
  }
];

const HelpCenter = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={`${darkMode ? "bg-gray-800 text-gray-100" : " text-gray-900"}`}>
    <div
      className={`max-w-4xl mx-auto py-8 px-4 min-h-screen transition-colors duration-300 
        ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-700'}`}
    >
      <h1 className="text-3xl font-bold mb-4">Help Center</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Find answers to common questions about TrimBackground. If you need further assistance,
        please contact our support team.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <ul
          className={`divide-y rounded-lg border 
            ${darkMode ? 'divide-gray-700 border-gray-700' : 'divide-gray-100 border-gray-400'}`}
        >
          {faqs.map((faq, idx) => (
            <li
              key={idx}
              className={`p-4 transition-colors 
                ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
            >
              <p className="font-medium">{faq.question}</p>
              <p className="mt-1">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Need more help?</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Email us at{" "}
          <a
            href="mailto:support@reimage.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@reimage.com
          </a>
        </p>
      </div>
    </div></div>
  );
};

export default HelpCenter;
