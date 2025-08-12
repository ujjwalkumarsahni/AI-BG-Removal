import React from 'react';

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
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Help Center</h1>
      <p className="text-gray-700 mb-6">
        Find answers to common questions about TrimBackground. If you need further assistance,
        please contact our support team.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
          {faqs.map((faq, idx) => (
            <li key={idx} className="p-4 hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">{faq.question}</p>
              <p className="text-gray-600 mt-1">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Need more help?</h3>
        <p className="text-gray-700">
          Email us at{" "}
          <a
            href="mailto:support@reimage.com"
            className="text-blue-600 hover:underline"
          >
            support@reimage.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
