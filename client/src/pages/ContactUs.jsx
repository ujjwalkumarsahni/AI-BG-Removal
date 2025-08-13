// src/pages/ContactUs.jsx
import React, { useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";

const ContactUs = () => {
  const { darkMode } = useContext(AppContext); // get darkMode from context

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-800 text-gray-100" : " text-gray-900"}`}>    <div
      className={`h-[100vh] max-w-md mx-auto p-6 rounded-lg shadow-md transition-colors duration-300
        ${darkMode ? "bg-gray-600 text-gray-100" : "text-black"}`}
    >
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

      {submitted ? (
        <div className="text-green-500 dark:text-green-400">
          ✅ Thanks! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full mt-1 px-3 py-2 border rounded outline-none
                ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            />
          </div>

          <div>
            <label className="block">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full mt-1 px-3 py-2 border rounded outline-none
                ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            />
          </div>

          <div>
            <label className="block">Message</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className={`w-full mt-1 px-3 py-2 border rounded outline-none
                ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            />
          </div>

          <button
            type="submit"
            className={`px-4 py-2 rounded transition 
              ${darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            disabled={loading}
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </div></div>

  );
};

export default ContactUs;
