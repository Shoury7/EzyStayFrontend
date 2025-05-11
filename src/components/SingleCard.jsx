import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const SingleCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchListingAndReviews = async () => {
      try {
        const listingResponse = await fetch(
          `http://localhost:5000/api/listings/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (!listingResponse.ok) throw new Error("Failed to fetch listing");
        const listingData = await listingResponse.json();
        setData(listingData);

        const reviewResponse = await fetch(
          `http://localhost:5000/api/listings/${id}/reviews`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (!reviewResponse.ok) throw new Error("Failed to fetch reviews");
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchListingAndReviews();
  }, [id, navigate, user]);

  const handleSubmitReview = async () => {
    if (!rating || !comment.trim()) return;

    setSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/listings/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Review submission error:", error);
    }

    setSubmitting(false);
  };

  if (!data) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <Header />
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <p className="text-gray-300 mb-4">{data.description}</p>

          <div className="grid grid-cols-2 gap-4 text-gray-400 mb-6">
            <div>
              <strong className="text-white">Location:</strong> {data.location}
            </div>
            <div>
              <strong className="text-white">Country:</strong> {data.country}
            </div>
            <div>
              <strong className="text-white">Price:</strong> ${data.price}
            </div>
            <div>
              <strong className="text-white">Posted by:</strong>{" "}
              {data.createdBy?.email}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {data.images.map((img, index) => (
              <div className="w-full aspect-video bg-black flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  key={index}
                  src={img.url}
                  alt={`Listing ${index + 1}`}
                  className="object-contain max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Review Submission Form */}
      <div className="mt-8 max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Leave a Review
        </h3>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Rating (1–5)</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
            placeholder="Write your thoughts here..."
          />
        </div>

        <button
          onClick={handleSubmitReview}
          disabled={submitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
      {/* Reviews Section */}
      {reviews.length > 0 ? (
        <div className="mt-8 max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-4 text-gray-200 shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-white">
                      Rating: ⭐ {review.rating}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="italic text-gray-300 mb-2">
                    "{review.comment}"
                  </p>
                  <p className="text-sm text-gray-500">
                    Posted by:{" "}
                    {review.user?.name || review.user?.email || "Unknown User"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-6 text-gray-400">No reviews yet.</div>
      )}
    </div>
  );
};

export default SingleCard;
