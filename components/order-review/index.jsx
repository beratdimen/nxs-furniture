"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./style.css";
import { createClient } from "@/utils/supabase/client";

export default function OrderReview({ id }) {
  const [order, setOrder] = useState(null);
  const supabase = createClient();

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
  }, [id]);

  return (
    <div className="reviewContainer">
      <h2>Order Summary</h2>
      {order ? (
        <div className="orderContent">
          <p>Order No.: #{order.id}</p>
          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
          <p>Customer: {order.user_id}</p>
          <p>Email: {order.email || "Bilgi mevcut değil"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h3>Ürünler</h3>
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
              <p>Miktar: {item.quantity}</p>
              <p>Birim Fiyat: {item.price} TL</p>
              <p>Toplam: {item.quantity * item.price} TL</p>
            </div>
          </div>
        ))
      ) : (
        <p>Ürünler yükleniyor...</p>
      )}

      <h3>Fiyat Özeti</h3>
      {order ? (
        <div className="summaryContent">
          <p>
            Ürünler Toplamı: <span>${order?.total_price.toFixed(2)} </span>
          </p>
          <p>
            Kargo Ücreti: <span>$20</span>
          </p>
          <p>
            İndirim: <span>$0</span>
          </p>
          <h6>
            Genel Toplam : <span>${order?.total_price.toFixed(2)} </span>
          </h6>
        </div>
      ) : (
        <p>Özet yükleniyor...</p>
      )}

      <h3>Teslimat & Fatura Bilgileri</h3>
      <div className="deliveryInformation">
        <p>
          Teslimat Adresi:{" "}
          <strong>{order?.billing_address?.address_line1}</strong>
          {" - "}
          {order?.billing_address?.city}, {order?.billing_address?.country}
        </p>
        <p>Kargo:Ali Kargo - Tahmini Teslim: 21 Ekim 2024</p>
        <p>Ödeme Yöntemi: Kredi Kartı</p>
      </div>
    </div>
  );
}
