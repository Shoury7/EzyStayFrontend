import React, { useState, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const secretKey = useRef("");
  const role = isAdmin ? "admin" : "user";

  const handleRegister = async () => {
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const secretKeyValue = secretKey?.current.value;

    try {
      const response = await fetch(
        "https://ezystaybackend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            role: role,
            adminKey: isAdmin ? secretKeyValue : null,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        navigate("/login");
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isAdmin ? "Admin Registration" : "User Registration"}
          </h2>

          {/* Toggle Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                isAdmin ? "bg-blue-600" : "bg-yellow-500 text-black"
              }`}
            >
              Switch to {isAdmin ? "User" : "Admin"}
            </button>
          </div>

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                ref={name}
                type="text"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                ref={email}
                type="email"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                ref={password}
                type="password"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {isAdmin && (
              <div>
                <label className="block mb-1 text-sm">Secret Key</label>
                <input
                  ref={secretKey}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter secret key"
                />
              </div>
            )}

            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition"
            >
              Register
            </button>

            <p className="text-center text-sm mt-4 text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
