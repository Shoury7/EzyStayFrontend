import React from "react";
import Header from "./Header";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

          <div className="mb-8 text-sm text-gray-300">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Request Admin Access
            </h3>
            <p>
              Admin privileges are reserved for authorized users. If you're
              eligible and wish to register as an admin, please send an email to{" "}
              <a
                href="mailto:admin@yourdomain.com"
                className="text-blue-400 underline"
              >
                admin@yourdomain.com
              </a>{" "}
              with your full name, organization ID (if applicable), and reason
              for admin access.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Your Message</label>
              <textarea
                rows="4"
                placeholder="Enter your message"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
