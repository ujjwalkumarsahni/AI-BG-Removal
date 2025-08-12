// src/pages/ContactUs.jsx
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactUs = () => {
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
    <div className="h-[100vh] max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

      {submitted ? (
        <div className="text-green-600">✅ Thanks! We'll get back to you soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange}
                   required className="w-full mt-1 px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
                   required className="w-full mt-1 px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                      required className="w-full mt-1 px-3 py-2 border rounded" />
          </div>

          <button type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
