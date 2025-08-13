import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const PrivacyPolicy = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div
        className={`max-w-4xl mx-auto py-8 px-4 transition-colors duration-300 rounded-lg shadow-sm 
          ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}
      >
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Last updated: June 2025
        </p>

        <Section title="Introduction">
          ReImage (<span className="italic">"we", "us", or "our"</span>) is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and safeguard your information
          when you use our website and services.
        </Section>

        <Section title="Information We Collect">
          <ul
            className={`divide-y rounded-lg border 
              ${darkMode ? 'divide-gray-700 border-gray-700' : 'divide-gray-300 border-gray-300'}`}
          >
            <ListItem title="Personal Information">
              We may collect your email address or other contact details if you choose to provide them.
            </ListItem>
            <ListItem title="Usage Data">
              We collect information about how you use our site, such as pages visited and features used.
            </ListItem>
            <ListItem title="Uploaded Files">
              Images or files you upload for background removal are processed temporarily and not stored after processing.
            </ListItem>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and improve our services.</li>
            <li>To respond to your inquiries and support requests.</li>
            <li>To analyze usage and enhance user experience.</li>
          </ul>
        </Section>

        <Section title="Data Security">
          We implement reasonable security measures to protect your information.
          However, no method of transmission over the Internet is 100% secure.
        </Section>

        <Section title="Third-Party Services">
          We may use third-party services for analytics or hosting. These providers have their own privacy policies.
        </Section>

        <Section title="Your Rights">
          You may request to access, update, or delete your personal information by contacting us.
        </Section>

        <Section title="Changes to This Policy">
          We may update this Privacy Policy from time to time. Changes will be posted on this page.
        </Section>

        <Section title="Contact Us">
          If you have any questions about this Privacy Policy, please contact us at:{' '}
          <a
            href="mailto:support@trimbackground.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@ReImage.com
          </a>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <div className="text-gray-700 dark:text-gray-300">{children}</div>
  </section>
);

const ListItem = ({ title, children }) => {
  const { darkMode } = useContext(AppContext);
  return (
    <li
      className={`p-4 transition-colors ${
        darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
      }`}
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-gray-800 dark:text-gray-400">{children}</p>
    </li>
  );
};

export default PrivacyPolicy;
