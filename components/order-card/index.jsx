"use client";
import React, { useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";

export default function OrderCard({ order }) {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  function shortenId(uuid) {
    return uuid.slice(0, 6); // Get the first 6 characters of the UUID
  }

  const statusLabels = {
    pending: "Pending",
    completed: "Completed",
    canceled: "Canceled",
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <p>
          <strong>Order ID:</strong> #{shortenId(order.id)}
        </p>
        <p>
          <strong>Amount:</strong> ${order.total_price.toFixed(2)}
        </p>
        <p className={`status ${order.status}`}>
          {statusLabels[order.status] || "Unknown"}
        </p>
        <div className="button-group">
          <button className="details-button" onClick={toggleDetails}>
            {showDetails ? "Hide" : "Show Summary"}
          </button>
          <button
            className="details-button"
            onClick={() => router.push(`/my-orders/${order?.id}`)}
          >
            Go to Details
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="order-details">
          <p>
            <strong>Status:</strong> {statusLabels[order.status]}
          </p>
          <p>
            <strong>Amount:</strong> ${order.total_price.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
