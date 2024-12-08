"use client";
import OrderReview from "@/components/order-review";
import { useParams } from "next/navigation";

export default function OrderDetail() {
  const { id } = useParams();

  return <OrderReview id={id} />;
}
