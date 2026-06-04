"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div id="contact" className="flex flex-col w-full relative pb-20">
      {/* Contact Header */}
      <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800" />
      <div className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[15px] text-[#cfcfcf] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-neutral-200 dark:border-neutral-800 justify-start px-3 flex items-center mb-6">
        contact me
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-[450px] flex flex-col gap-4">
        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-open text-xs uppercase tracking-wider text-neutral-400 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-open text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors disabled:opacity-50"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-open text-xs uppercase tracking-wider text-neutral-400 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-open text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors disabled:opacity-50"
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="font-open text-xs uppercase tracking-wider text-neutral-400 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            disabled={status === "loading"}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-open text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none disabled:opacity-50"
          />
        </div>

        {/* Action States Messages */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs text-green-600 dark:text-green-400 font-open mt-1"
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs text-red-600 dark:text-red-400 font-open mt-1"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
          whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
          type="submit"
          disabled={status === "loading"}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-[#dddddd] dark:bg-[#5a5a5a] text-black dark:text-white font-open text-[15px] font-medium hover:bg-neutral-850 dark:hover:bg-neutral-100 transition-colors cursor-pointer select-none flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white dark:text-neutral-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </form>
    </div>
  );
}