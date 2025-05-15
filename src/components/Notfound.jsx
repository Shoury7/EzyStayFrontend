import { Link } from "react-router-dom";
import Header from "./Header";

const Notfound = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header stays at the top */}
      <Header />

      {/* Centered content below header */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-[8rem] font-extrabold text-red-600 drop-shadow-lg">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold mb-2">
          Page Not Found
        </p>
        <p className="text-gray-400 mb-6 max-w-md">
          Sorry, the page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 transition-all duration-200 text-white font-medium py-2 px-6 rounded-full shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
