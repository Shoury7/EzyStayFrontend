import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { BarLoader } from "react-spinners";
import { Send, Delete, Edit } from "lucide-react";
import { toast } from "react-toastify";
const ManageProperties = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    images: [],
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/not-allowed");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fetch all listings owned by the user (admin)
    const fetchListings = async () => {
      try {
        const res = await fetch(
          "https://ezystaybackend.onrender.com/api/listings/me",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`, // Adding the Bearer token in the header
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setListings(data);
        } else {
          alert("Failed to fetch listings.");
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user.role === "admin") {
      fetchListings();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("country", formData.country);
    formData.images.forEach((file) => {
      data.append("images", file);
    });

    try {
      const res = await fetch(
        "https://ezystaybackend.onrender.com//api/listings",
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${user.access_token}`, // Adding the Bearer token in the header
          },
        }
      );
      const result = await res.json();
      if (res.ok) {
        toast.success("Listing created successfully!");

        setListings((prevListings) => [...prevListings, result.listing]);
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          country: "",
          images: [],
        });
      } else {
        toast.error("Failed to create listing.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (listingId) => {
    try {
      const res = await fetch(
        `https://ezystaybackend.onrender.com/api/listings/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.access_token}`, // Adding the Bearer token in the header
          },
        }
      );

      if (res.ok) {
        toast.success("Listing deleted successfully!");
        setListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
      } else {
        toast.error("Failed to delete listing.");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Something went wrong while deleting listing.");
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
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto p-6 mt-10 text-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-yellow-300 italic text-center">
          Manage Properties
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full text-white file:bg-blue-700 file:hover:bg-blue-800 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none"
            required
          />
          <button
            type="submit"
            className="cursor-pointer flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-2 px-4 rounded-md"
          >
            <Send className="w-5 h-5" />
            Submit Listing
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-yellow-300 text-center mb-5">
            Your Listings
          </h3>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : listings.length > 0 ? (
            <ul className="space-y-4">
              {listings.map((listing) => (
                <li
                  key={listing._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-semibold text-white">
                    {listing.title}
                  </h4>
                  <p className="text-white mt-2">{listing.description}</p>
                  <p className="text-white mt-2">Price: ${listing.price}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() =>
                        navigate("/update", {
                          state: { listing },
                        })
                      }
                      className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                    >
                      <Edit size={20} className="mr-2" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="cursor-pointer bg-red-600 text-white py-2 px-4 rounded-md flex items-center"
                    >
                      <Delete size={20} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-white">No listings available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
