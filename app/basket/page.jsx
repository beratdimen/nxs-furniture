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
import { toast } from "sonner";
import OrderSummary from "@/components/order-summary";

export default function BasketPage() {
  const steps = ["Cart", "Shipping", "Payment", "Order Review"];
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const [orderState, setOrderState] = useState({});
  console.log("orderState :>> ", orderState);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

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
    if (activeStep == 0) {
      if (basketItems.length > 0) {
        setOrderState({ basketItems: basketItems, totalPrice: totalPrice });
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
      } else {
        toast.error("Product is not defined");
      }
    }
    if (activeStep == 1) {
      if (selectedAddress?.id) {
        setOrderState({
          ...orderState,
          selectedBilingAddress: selectedAddress?.id,
        });
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
      } else {
        toast.error("Please select address Bro");
      }
    }
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const updateQuantity = async (id, delta) => {
    const item = basketItems.find((item) => item.id === id);

    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const { data, error } = await supabase
        .from("basket")
        .update({ quantity: newQuantity })
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error updating quantity:", error);
        return;
      }

      setBasketItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      if (!error) {
        toast.success("Ürün arttırıldı");
      }
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  return (
    <div className="basketContainer">
      <div>
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
                        <button onClick={() => updateQuantity(id, -1)}>
                          -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => updateQuantity(id, 1)}>+</button>
                      </div>
                      <p>${product.price}</p>
                      <p className="productPrice">
                        {quantity} x ${product.price} = $
                        {product.price * quantity}
                      </p>
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
              <BillAdress
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
              <ProgressButton nextStep={nextStep} prevStep={prevStep} />
            </>
          ) : activeStep === 2 ? (
            <>
              <CreditCard totalPrice={totalPrice} />
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
      <OrderSummary basketItems={basketItems} setTotalPrice={setTotalPrice} />
    </div>
  );
}
