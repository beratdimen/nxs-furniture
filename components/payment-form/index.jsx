import React, { useRef, useState } from "react";
import "./style.css";
import CreditCardModal from "../credit-card-approve-modal";

export default function PaymentForm({
  totalPrice,
  setCardDetails,
  cardDetails,
  orderState,
  setActiveStep,
  setOrderState,
}) {
  const creditRef = useRef();
  
  const [formState, setFormState] = useState({
    holderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  function handleCreditModal() {
    if (creditRef.current) {
      creditRef.current.showModal();
    }
  }



  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formState.holderName.trim()) {
      newErrors.holderName = "Cardholder's name is required.";
    }

    if (!formState.cardNumber || !/^\d{16}$/.test(formState.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (
      !formState.expiryMonth ||
      !(formState.expiryMonth >= 1 && formState.expiryMonth <= 12)
    ) {
      newErrors.expiryMonth = "Please enter a valid month (01-12).";
    }

    if (
      !formState.expiryYear ||
      !(formState.expiryYear >= 23 && formState.expiryYear <= 99)
    ) {
      newErrors.expiryYear = "Please enter a valid year (23-99).";
    }

    if (!formState.cvc || !/^\d{3}$/.test(formState.cvc)) {
      newErrors.cvc = "CVC must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));

    if (validateForm()) {
      handleCreditModal();
      console.log("Form Data:", formState);
    }

    setCardDetails({
      holderName: formObj.holderName,
      cardNumber: formObj.cardNumber,
      expMonth: formObj.expiryMonth,
      expYear: formObj.expiryYear,
      cvv: formObj.cvc,
    });
    console.log(formObj);
  };

  return (
    <div className="cardDetail">
      <form id="form" name="paymentForm" onSubmit={handleSubmit}>
        <div className="holderName">
          <h6>Cardholders Name</h6>
          <input
            type="text"
            name="holderName"
            id="holderInput"
            placeholder="e.g. John Doe"
            autoComplete="off"
            value={formState.holderName}
            onChange={handleInputChange}
          />
          {errors.holderName && (
            <span className="error">{errors.holderName}</span>
          )}
        </div>

        <div className="holderNumber">
          <h6>Card Number</h6>
          <input
            type="text"
            name="cardNumber"
            id="numberInput"
            maxLength="16"
            autoComplete="off"
            placeholder="e.g. 0000 0000 0000 0000"
            value={formState.cardNumber}
            onChange={handleInputChange}
          />
          {errors.cardNumber && (
            <span className="error">{errors.cardNumber}</span>
          )}
        </div>

        <div className="generalInputs">
          <div className="expDate">
            <h6>Expiration Date</h6>
            <label id="aayy">
              <input
                type="text"
                name="expiryMonth"
                id="aa"
                maxLength="2"
                placeholder="MM"
                value={formState.expiryMonth}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="expiryYear"
                id="yy"
                maxLength="2"
                placeholder="YY"
                value={formState.expiryYear}
                onChange={handleInputChange}
              />
            </label>
            {errors.expiryMonth && (
              <span className="error">{errors.expiryMonth}</span>
            )}
            {errors.expiryYear && (
              <span className="error">{errors.expiryYear}</span>
            )}
          </div>

          <div className="cvc">
            <h6>CVC</h6>
            <input
              type="text"
              name="cvc"
              id="cvInput"
              maxLength="3"
              placeholder="e.g. 123"
              value={formState.cvc}
              onChange={handleInputChange}
            />
            {errors.cvc && <span className="error">{errors.cvc}</span>}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>

      <CreditCardModal
        creditRef={creditRef}
        totalPrice={totalPrice}
        cardDetails={cardDetails}
        orderState={orderState}
        setActiveStep={setActiveStep}
        setOrderState={setOrderState}
      />
    </div>
  );
}
