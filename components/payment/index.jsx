import { useState } from "react";
import "./style.css";
import PaymentForm from "../payment-form";
export default function CreditCard({
  totalPrice,
  orderState,
  setActiveStep,
  setOrderState,
}) {
  const [cardDetails, setCardDetails] = useState({
    holderName: "berat dimen",
    cardNumber: "0000 0000 0000 0000",
    expMonth: "07",
    expYear: "29",
    cvv: "264",
  });

  const formatCardNumber = (cardNumber) => {
    return cardNumber
      .replace(/\d(?=\d{4})/g, "*")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };
  
  return (
    <div className="cardContainer">
      <div className="card">
        <div className="card-back">
          <div className="card-back-black"></div>
          <div className="card-back-gray">
            <p id="cardCvv">{cardDetails.cvv}</p>
          </div>
        </div>
        <div className="card-front">
          <div className="oval"></div>
          <p id="cardNumber">{formatCardNumber(cardDetails.cardNumber)}</p>
          <div className="cardName">
            <p id="name">{cardDetails.holderName}</p>
            <div className="f">
              <p id="date">{cardDetails.expMonth}</p>
              <p id="date2">/{cardDetails.expYear}</p>
            </div>
          </div>
        </div>
      </div>
      <PaymentForm
        setCardDetails={setCardDetails}
        cardDetails={cardDetails}
        totalPrice={totalPrice}
        orderState={orderState}
        setActiveStep={setActiveStep}
        setOrderState={setOrderState}
      />
    </div>
  );
}
