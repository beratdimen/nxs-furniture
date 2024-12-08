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
    return uuid.slice(0, 6); // UUID'den ilk 6 karakteri alır
  }

  return (
    <div className="order-card">
      <div className="order-header">
        <p>Sipariş ID: {shortenId(order.id)}</p>
        <p>Tutar: ${order.total_price.toFixed(2)}</p>
        <p className={`status ${order.status}`}>{order.status}</p>
        <button className="details-button" onClick={toggleDetails}>
          {showDetails ? "Gizle" : "Özet Göster"}
        </button>
        <button
          className="details-button"
          onClick={() => router.push(`/my-orders/${order?.id}`)}
        >
          Detaya Git
        </button>
      </div>
      {showDetails && (
        <div className="order-details">
          <p>
            <strong>Durum:</strong> {order.status}
          </p>
          <p>
            <strong>Tutar:</strong> ${order.total_price.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
