import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { BarLoader } from "react-spinners";
const UpdateListing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    isAvailable: listing?.isAvailable ?? true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://ezystaybackend.onrender.com/api/listings/${listing._id}`,
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
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <BarLoader color="#3b82f6" width={150} height={4} />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Update Listing</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg"
        >
          {/* Title */}
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

          {/* Description */}
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

          {/* Price */}
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

          {/* Location */}
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

          {/* Country */}
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

          {/* Availability Toggle */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-gray-300 font-medium">Available</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          {/* Submit Button */}
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
