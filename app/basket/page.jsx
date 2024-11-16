"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./style.css";
import ProgresStep from "@/components/progres-step";
import ProgressButton from "@/components/progres-step/button";
import BillAdress from "@/components/bill-adress";
import CreditCard from "@/components/payment";

export default function BasketPage() {
  const steps = ["Cart", "Shipping", "Payment", "Order Review"];
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="basketContainer">
      <h2>YOUR BASKET</h2>
      <ProgresStep activeStep={activeStep} steps={steps} />
      <div className="basketContent">
        {activeStep === 0 ? (
          <>
            <Image
              src={"/img/bag.png"}
              width={300}
              height={300}
              alt="Empty Cart"
            />
            <h3>Cart is Empty</h3>
            <p>You haven't added any products yet. Let's start shopping!</p>
          </>
        ) : activeStep === 1 ? (
          <BillAdress />
        ) : activeStep === 2 ? (
          <CreditCard />
        ) : (
          ""
        )}
        <ProgressButton nextStep={nextStep} prevStep={prevStep} />
      </div>
    </div>
  );
}
