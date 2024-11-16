"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./style.css";
import ProgresStep from "@/components/progres-step";
import ProgressButton from "@/components/progres-step/button";
import BillAdress from "@/components/bill-adress";
import CreditCard from "@/components/payment";
import OrderReview from "@/components/order-review";
import ButtonGroup from "@/components/button-group";
import Empty from "@/components/empty";

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
            <Empty />
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
