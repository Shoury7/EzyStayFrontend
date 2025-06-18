import React, { useRef } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    try {
      const response = await fetch("https://ezystaybackend.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { role, token, userid, username, email } = data;

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: username,
            access_token: token,
            role: role,
            uid: userid,
            email: email,
          })
        );

        dispatch(
          addUser({
            uid: userid,
            name: username,
            role: role,
            access_token: token,
          })
        );

        console.log("Login successful:", data);
        toast.success(`Welcome back ! You've logged in successfully.`);
        navigate("/listings");
      } else {
        console.error("Login failed:", data.message);
        toast.error("Oops! That email or password doesn't match.");
      }
    } catch (error) {
      console.error("Error making request:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                ref={email}
                type="email"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                ref={password}
                type="password"
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleButtonClick}
              className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition"
            >
              Login
            </button>

            <p className="text-center text-sm mt-4 text-gray-400">
              No account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Register here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
