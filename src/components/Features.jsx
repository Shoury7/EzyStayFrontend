import React from "react";
import {
  FaHome,
  FaUserCheck,
  FaMoneyBillWave,
  FaShieldAlt,
  FaCalendarCheck,
  FaGlobeAsia,
} from "react-icons/fa";
import Header from "./Header";

const features = [
  {
    icon: <FaHome size={30} />,
    title: "Host Your Property",
    description:
      "Easily list your apartment, villa, or even a spare room and start earning from unused space.",
  },
  {
    icon: <FaUserCheck size={30} />,
    title: "Verified Guests & Hosts",
    description:
      "Both hosts and users are verified to ensure a safe and trustworthy experience for all.",
  },
  {
    icon: <FaMoneyBillWave size={30} />,
    title: "Secure Payments",
    description:
      "Protected and fast online payments with instant booking confirmations.",
  },
  {
    icon: <FaCalendarCheck size={30} />,
    title: "Flexible Booking",
    description:
      "Guests can filter and book stays based on budget, amenities, and availability.",
  },
  {
    icon: <FaGlobeAsia size={30} />,
    title: "Pan-India Access",
    description:
      "Explore stays across major Indian cities starting with Hyderabad.",
  },
  {
    icon: <FaShieldAlt size={30} />,
    title: "Privacy First",
    description:
      "No hidden data sharing. User profiles and booking history are safe and secure.",
  },
];

const Features = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <div className="bg-gray-900 min-h-screen text-white px-4 ">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">
            Why Choose Ezy Stay?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 text-blue-400">{feature.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
