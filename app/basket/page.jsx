"use client";

import BillAdress from "@/components/bill-adress";
import ButtonGroup from "@/components/button-group";
import Empty from "@/components/empty";
import OrderReview from "@/components/order-review";
import OrderSummary from "@/components/order-summary";
import CreditCard from "@/components/payment";
import ProgresStep from "@/components/progres-step";
import ProgressButton from "@/components/progres-step/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "./style.css";

export default function BasketPage() {
  const steps = ["Cart", "Shipping", "Payment", "Order Review"];
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const [orderState, setOrderState] = useState({});
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
            `id, quantity, product:products (id,title, content, price, image_url)`
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
    if (activeStep === 0) {
      if (basketItems.length > 0) {
        setOrderState({
          basketItems: basketItems,
          totalPrice: totalPrice,
          user_id: user?.id,
        });
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
      } else {
        toast.error("Product is not defined");
      }
    }
    if (activeStep === 1) {
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

  const deleteItem = async (id) => {
    try {
      const { data, error } = await supabase
        .from("basket")
        .delete()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error deleting item:", error);
        return;
      }

      setBasketItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Ürün sepetten silindi");
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  return (
    <div
      className="basketContainer"
      style={{
        gridTemplateColumns:
          activeStep === 3 || basketItems.length === 0 ? "1fr" : "4fr 1fr",
      }}
    >
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
                      <p>Estimated Shipping Delivery: Within 2 days</p>
                    </div>

                    <div className="priceSection">
                      <div className="quantityControls">
                        <button onClick={() => updateQuantity(id, -1)}>
                          -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => updateQuantity(id, 1)}>+</button>
                      </div>
                      <p className="productPrice">
                        {quantity} x ${product.price} = $
                        {product.price * quantity}
                      </p>
                      <p className="discount">Kazancınız: 500 TL</p>

                      <button
                        className="deleteButton"
                        onClick={() => deleteItem(id)}
                      >
                        Sil
                      </button>
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
              <CreditCard
                setActiveStep={setActiveStep}
                totalPrice={totalPrice}
                orderState={orderState}
                setOrderState={setOrderState}
              />
            </>
          ) : activeStep === 3 ? (
            <>
              <OrderReview id={orderState?.orderId} />
              <ButtonGroup />
            </>
          ) : null}
        </div>
      </div>
      {activeStep === 3 || basketItems.length === 0 ? (
        <></>
      ) : (
        <OrderSummary basketItems={basketItems} setTotalPrice={setTotalPrice} />
      )}
    </div>
  );
}
