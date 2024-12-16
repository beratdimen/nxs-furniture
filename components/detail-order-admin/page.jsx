import "./style.css";
import React, { useState } from "react";
import OrderReview from "../order-review";

export default function OrderDetailModal({ id, detailModal }) {
  const [isActive, setIsActive] = useState(false);

  const closeModal = () => {
    if (detailModal.current) {
      detailModal.current.close();
      setIsActive(false);
    }
  };

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={closeModal}
      ></div>

      <dialog ref={detailModal}>
        <OrderReview id={id} />
      </dialog>
    </>
  );
}
