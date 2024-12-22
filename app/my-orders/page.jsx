"use client";
import OrderCard from "@/components/order-card";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState(null);
  const [user, setUser] = useState({});
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
    userFetch();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "*, order_items(*, product:products (title, content, price, image_url)) ,billing_address(*)"
        )
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (!error) {
        console.log("data :>> ", data);
        setOrders(data);
      }
    };

    if (user?.id) {
      fetchOrder();
    }
  }, [user?.id]);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders?.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <p>You dont have an order yet.</p>
          <div className="startShop">
            <img src="/img/rightArrow.gif" alt="" />
            <Link href={"/"}>Start Shopping </Link>
          </div>
        </div>
      )}
    </div>
  );
}
