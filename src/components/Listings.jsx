import React, { useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";

const Listings = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/listings");
        if (!response.ok) throw new Error("Network response was not ok");

        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Next Stay Awaits</h1>
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((listing) => (
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
        ) : (
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
