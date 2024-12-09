"use client";
import OrderReview from "@/components/order-review";
import { useParams } from "next/navigation";

export default function OrderDetail() {
  const { id } = useParams();

  return (
    <div className="ordersContainer">
      <OrderReview id={id} />
    </div>
  );
}
