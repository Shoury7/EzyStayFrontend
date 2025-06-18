// src/components/PaymentButton.jsx
import React from "react";

const PaymentButton = ({ amount, user, isAvailable, listingId }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Create Razorpay order from backend
      const res = await fetch(
        "https://ezystaybackend.onrender.com/api/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency: "INR",
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      // Step 2: Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use env var from frontend
          amount: data.amount,
          currency: data.currency,
          name: "Rentify",
          description: "Booking Payment",
          order_id: data.id,
          handler: async function (response) {
            // Step 3: Verify payment on backend
            const verifyRes = await fetch(
              "https://ezystaybackend.onrender.com/api/payments/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  email: user?.email,
                  listing: listingId,
                  amount: data.amount,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("Payment verified and successful!");
            } else {
              alert("Payment failed or could not be verified.");
            }
          },
          prefill: {
            name: user?.name || "Guest",
            email: user?.email,
          },
          theme: {
            color: "#1d4ed8",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className={`w-full py-2 rounded-md font-semibold mt-6 
    ${
      isAvailable
        ? "bg-green-600 hover:bg-green-700"
        : "bg-gray-500 cursor-not-allowed"
    }`}
      disabled={!isAvailable}
    >
      {isAvailable ? `Pay ₹${amount}` : "Not Available"}
    </button>
  );
};

export default PaymentButton;
