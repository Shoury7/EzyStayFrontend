import React, { useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";

const Listings = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          "https://ezystaybackend.onrender.com/api/listings"
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Your Next Stay Awaits</h1>

        {data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((listing) => (
                <Card
                  key={listing._id}
                  id={listing._id}
                  title={listing.title}
                  description={listing.description}
                  price={listing.price}
                  location={listing.location}
                  country={listing.country}
                  image={listing.images[0]?.url}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md border cursor-pointer ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                Previous
              </button>

              <span className="text-sm text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === totalPages
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                } cursor-pointer`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-gray-400">
              Loading listings...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
