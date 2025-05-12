import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

const UpdateListing = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listing = state?.listing;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!listing) {
      navigate("/");
    }
  }, [listing, navigate]);

  const [formData, setFormData] = useState({
    title: listing?.title || "",
    description: listing?.description || "",
    price: listing?.price || "",
    location: listing?.location || "",
    country: listing?.country || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/listings/${listing._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate(`/manageproperties`);
      } else {
        console.error("Update failed:", await response.text());
      }
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Update Listing</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg"
        >
          <div>
            <label
              className="block mb-2 font-medium text-gray-300"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium text-gray-300"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              rows={4}
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium text-gray-300"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium text-gray-300"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium text-gray-300"
              htmlFor="country"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateListing;
