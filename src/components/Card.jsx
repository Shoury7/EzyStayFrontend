// Card.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, description, price, location, country, image }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/listings/${id}`)}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 text-white">
        <h2 className="text-xl font-semibold text-yellow-300">{title}</h2>
        <p className="text-gray-300 text-sm">{description}</p>
        <div className="mt-2 text-sm text-gray-400">
          <span>
            {location}, {country}
          </span>
        </div>
        <div className="mt-2 font-bold text-green-400">₹ {price}/night</div>
      </div>
    </div>
  );
};

export default Card;
