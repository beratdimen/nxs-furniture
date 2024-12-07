"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import ProgresStep from "@/components/progres-step";
import ProgressButton from "@/components/progres-step/button";
import BillAdress from "@/components/bill-adress";
import CreditCard from "@/components/payment";
import OrderReview from "@/components/order-review";
import ButtonGroup from "@/components/button-group";
import Empty from "@/components/empty";
import { createClient } from "@/utils/supabase/client";

export default function BasketPage() {
  const steps = ["Cart", "Shipping", "Payment", "Order Review"];
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
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
    if (user?.id) {
      const fetchBasketItems = async () => {
        const { data, error } = await supabase
          .from("basket")
          .select(
            `id, quantity, product:products (title, content, price, image_url)`
          )
          .eq("user_id", user?.id);

        if (data) {
          setBasketItems(data);
        } else {
          console.error("Error fetching basket items:", error);
        }
      };

      fetchBasketItems();
    }
  }, [user?.id]);

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const updateQuantity = (id, delta) => {
    setBasketItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  return (
    <div className="basketContainer">
      <h2>YOUR BASKET</h2>
      <ProgresStep activeStep={activeStep} steps={steps} />
      <div className="basketContent">
        {activeStep === 0 ? (
          <>
            {basketItems.length > 0 ? (
              basketItems.map(({ id, quantity, product }) => (
                <div key={id} className="basketItem">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="productImage"
                  />
                  <div className="productDetails">
                    <h3>{product.title}</h3>
                    <p>{product.content}</p>
                    <div className="quantityControls">
                      <button onClick={() => updateQuantity(id, -1)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(id, 1)}>+</button>
                    </div>
                    <p className="productPrice">${product.price * quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <Empty />
            )}
            <ProgressButton nextStep={nextStep} prevStep={prevStep} />
          </>
        ) : activeStep === 1 ? (
          <>
            <BillAdress />
            <ProgressButton nextStep={nextStep} prevStep={prevStep} />
          </>
        ) : activeStep === 2 ? (
          <>
            <CreditCard />
            <ProgressButton nextStep={nextStep} prevStep={prevStep} />
          </>
        ) : activeStep === 3 ? (
          <>
            <OrderReview />
            <ButtonGroup />
          </>
        ) : null}
      </div>
    </div>
  );
}
