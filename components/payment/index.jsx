import { useState } from "react";
import "./style.css";
import PaymentForm from "../payment-form";
export default function CreditCard({ totalPrice }) {
  const [cardDetails, setCardDetails] = useState({
    holderName: "berat dimen",
    cardNumber: "0000 0000 0000 0000",
    expMonth: "07",
    expYear: "29",
    cvv: "264",
  });
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
          <p id="cardNumber">{cardDetails.cardNumber}</p>
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
      />
    </div>
  );
}
