"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function OrderStatusModal({ statusModal, listOrders, order }) {
  const supabase = createClient();
  const [isActive, setIsActive] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);
  const statusList = [
    {
      key: "pending",
      value: "Pending",
    },
    {
      key: "completed",
      value: "Completed",
    },
    {
      key: "canceled",
      value: "Canceled",
    },
    {
      key: "shipped",
      value: "Shipped",
    },
  ];

  useEffect(() => {
    if (order) {
      setIsActive(true);
    }
  }, [order]);

  const close = () => {
    if (statusModal.current) {
      statusModal.current.close();
      setIsActive(false);
    }
  };

  async function handleChangeStatus(id, status) {
    const { error } = await supabase
      .from("orders")
      .update({ status: status || "pending" })
      .eq("id", id);

    if (!error) {
      listOrders();
      close();
      toast.success("Status is Changed");
    } else {
      toast.error("Status change is not completed");
    }
  }

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={close}
      ></div>

      <dialog ref={statusModal} open={isActive}>
        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          required
        >
          {statusList.map((status) => (
            <option key={status.key} value={status.key}>
              {status.value}
            </option>
          ))}
        </select>
        <button onClick={() => handleChangeStatus(order, orderStatus)}>
          Save
        </button>
        <button onClick={close}>Close</button>
      </dialog>
    </>
  );
}
