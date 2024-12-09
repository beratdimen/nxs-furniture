"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./style.css";
import { createClient } from "@/utils/supabase/client";

export default function OrderReview({ id }) {
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  const userFetch = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user && !error) {
      setUser(data.user);
    } else {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "*, order_items(*, product:products (title, content, price, image_url)) ,billing_address(*)"
        )
        .eq("id", id)
        .single();

      if (!error) {
        console.log("data :>> ", data);
        setOrder(data);
      }
    };

    fetchOrder();
    userFetch();
  }, [id]);

  function shortenId(uuid) {
    return uuid.slice(0, 6);
  }

  return (
    <div className="reviewContainer">
      <h2>Order Summary</h2>
      {order ? (
        <div className="orderContent">
          <p>Order No.: #{shortenId(order.id)}</p>
          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
          <p>Customer: {user?.user_metadata?.firstName}</p>
          <p>Email: {user?.email || "No information available"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h3>Products</h3>
      {order && order.order_items ? (
        order.order_items.map((item) => (
          <div className="basketCard" key={item.id}>
            <Image
              width={100}
              height={100}
              src={item.product.image_url}
              alt={item.title}
            />
            <div className="basketCardContent">
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Unit Price: {item.price} TL</p>
              <p>Total: {item.quantity * item.price} TL</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}

      <h3>Price Summary</h3>
      {order ? (
        <div className="summaryContent">
          <p>
            Products Total: <span>${order?.total_price.toFixed(2)}</span>
          </p>
          <p>
            Shipping Fee: <span>$20</span>
          </p>
          <p>
            Discount: <span>$0</span>
          </p>
          <h6>
            Grand Total: <span>${order?.total_price.toFixed(2)}</span>
          </h6>
        </div>
      ) : (
        <p>Loading summary...</p>
      )}

      <h3>Delivery & Invoice Information</h3>
      <div className="deliveryInformation">
        <p>
          Delivery Address:{" "}
          <strong>{order?.billing_address?.address_line1}</strong>
          {" - "}
          {order?.billing_address?.city}, {order?.billing_address?.country}
        </p>
        <p>Courier: Ali Kargo - Estimated Delivery: October 21, 2024</p>
        <p>Payment Method: Credit Card</p>
      </div>
    </div>
  );
}
