import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const TermsOfUse = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-6 rounded-lg shadow-sm transition-colors duration-300 ${
          darkMode ? "bg-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Last updated: June 2024
        </p>

        <Section title="1. Acceptance of Terms">
          By accessing or using ReImage, you agree to comply with and be bound by
          these Terms of Use. If you do not agree to these terms, please do not
          use the service.
        </Section>

        <Section title="2. Use of Service">
          You may use ReImage for lawful purposes only. You agree not to use the
          service for any activity that is illegal, harmful, or violates the rights
          of others.
        </Section>

        <Section title="3. Intellectual Property">
          All content, trademarks, and intellectual property on ReImage are owned
          by their respective owners. You may not copy, modify, or distribute any
          part of the service without permission.
        </Section>

        <Section title="4. User Content">
          You retain ownership of any content you upload, but grant ReImage a
          license to use, display, and process your content as necessary to
          provide the service.
        </Section>

        <Section title="5. Disclaimer">
          ReImage is provided "as is" without warranties of any kind. We do not
          guarantee that the service will be error-free or uninterrupted.
        </Section>

        <Section title="6. Limitation of Liability">
          ReImage and its owners are not liable for any damages arising from your
          use of the service.
        </Section>

        <Section title="7. Changes to Terms">
          We may update these Terms of Use at any time. Continued use of the
          service after changes constitutes acceptance of the new terms.
        </Section>

        <Section title="8. Contact">
          If you have any questions about these Terms of Use, please contact us at{" "}
          <a
            href="mailto:support@ReImage.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@ReImage.com
          </a>
          .
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-6 pb-4 border-b last:border-b-0 border-gray-200 dark:border-gray-600">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-700 dark:text-gray-300">{children}</p>
  </section>
);

export default TermsOfUse;
