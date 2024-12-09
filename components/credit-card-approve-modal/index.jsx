"use client";
import { useRef, useState } from "react";
import "./style.css";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/supabase/client";

export default function CreditCardModal({
  creditRef,
  totalPrice,
  cardDetails,
  orderState,
  setActiveStep,
  setOrderState,
}) {
  const [isActive, setIsActive] = useState(false);
  const [password, setPassword] = useState();

  const supabase = createClient();

  const closeCreditModal = () => {
    if (creditRef.current) {
      creditRef.current.close();
      setIsActive(false);
    }
  };

  const formatCardNumber = (cardNumber) => {
    return cardNumber
      .replace(/\d(?=\d{4})/g, "*")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  const handleSubmit = async () => {
    if (password == 123456) {
      try {
        const orderId = uuidv4();
        const { data: orderResponse, error: orderError } = await supabase
          .from("orders")
          .insert([
            {
              id: orderId,
              user_id: orderState?.user_id,
              total_price: orderState?.totalPrice,
              status: "pending",
              billing_id: orderState?.selectedBilingAddress,
            },
          ])
          .select()
          .single();

        if (orderError) {
          toast.error("Error while adding to the orders table.");
        }

        const orderItemsInsert = orderState?.basketItems.map((item) => ({
          order_id: orderId,
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }));

        const { error: orderItemsError } = await supabase
          .from("order_items")
          .insert(orderItemsInsert);

        if (orderItemsError) {
          toast.error("Error while adding to the order_items table.");
        }

        if (!orderItemsError) {
          toast.success("Order created and products added successfully.");
          closeCreditModal();
          setActiveStep(3);
          setOrderState({ ...orderState, orderId: orderId });
          const { error } = await supabase
            .from("basket")
            .delete()
            .match({ user_id: orderState?.user_id });
        }
      } catch (error) {
        toast.error("Server error:", error);
        console.log("Server error:", error);
      }
    } else {
      toast.error("Your password is incorrect.");
    }
  };

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={closeCreditModal}
      ></div>
      <dialog className="dialogCredit" ref={creditRef} open={isActive}>
        <header className="header">
          <span className="time">{formatDate()}</span>
          <button className="closeButton" onClick={closeCreditModal}>
            Close
          </button>
        </header>

        <main className="main">
          <p className="instruction">
            To complete your purchase securely with 3D security using your card,
            please enter the 6-digit code sent to your phone below.
          </p>

          <div className="cardInfo">
            <img
              src="img/garanti.png"
              alt="Garanti BBVA"
              className="bankLogo"
            />
            <h3>3D SECURE PAYMENT VERIFICATION</h3>
            <div className="paymentDetails">
              <p>
                <strong>Amount:</strong> ${totalPrice}
              </p>
              <p>
                <strong>Store:</strong> Nexus Furniture
              </p>
              <p>
                <strong>Card Number:</strong>
                {formatCardNumber(cardDetails.cardNumber)}
              </p>
              <p>
                <strong>Date:</strong> {formatDate()}
              </p>
            </div>
          </div>

          <div className="verification">
            <p>
              Enter the verification code sent to your phone ending in{" "}
              <strong>XXXX</strong>. The default code is (123456).
            </p>
            <input
              type="text"
              placeholder="Enter the 6-digit code"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="submitButton" onClick={handleSubmit}>
              SUBMIT
            </button>
            <button className="newPasswordButton">SEND NEW PASSWORD</button>
          </div>
        </main>
      </dialog>
    </>
  );
}
