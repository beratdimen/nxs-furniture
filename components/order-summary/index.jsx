"use client";
import "./style.css";
import React, { useEffect, useState } from "react";

export default function OrderSummary({ basketItems, setTotalPrice }) {
  const calculateOrderSummary = () => {
    const subtotal = basketItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    const taxRate = 0.08;
    const kargo = 20;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + kargo;
    setTotalPrice(total);

    return {
      subtotal,
      tax,
      kargo,
      total,
    };
  };

  const orderSummary = calculateOrderSummary();

  return (
    <div className="orderSummaryContainer">
      <h2>Order Summary</h2>

      <div className="summary">
        <p>
          <strong>Subtotal:</strong> ${orderSummary.subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax (8%):</strong> ${orderSummary.tax.toFixed(2)}
        </p>
        <p>
          <strong>Kargo:</strong> ${orderSummary.kargo.toFixed(2)}
        </p>
        <p>
          <strong>Total:</strong> ${orderSummary.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
