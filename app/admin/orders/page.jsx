"use client";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { listAllOrders } from "@/api/category";
import AddModal from "@/components/add-product-modal";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { AddProductsIcon, DeleteIcon, EditIcon } from "@/helpers/icons";
import ProductsEditModal from "@/components/edit-product-modal";
import OrderDetailModal from "@/components/detail-order-admin/page";
import OrderStatusModal from "@/components/order-status-modal";

export default function OrdersPage() {
  const supabase = createClient();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const detailModal = useRef(null);
  const statusModal = useRef(null);

  const listOrders = async () => {
    const response = await listAllOrders();
    setOrders(response);
    console.log("response :>> ", response);
  };

  useEffect(() => {
    listOrders();
  }, []);

  function handleClick(id) {
    setSelectedOrder(id);
    if (detailModal.current) {
      detailModal.current.showModal();
    }
  }

  function handleClickStatus(id) {
    setSelectedOrder(id);
    if (statusModal.current) {
      statusModal.current.showModal();
    }
  }

  function shortenId(uuid) {
    return uuid.slice(0, 6);
  }
  return (
    <div className="addProductContainer">
      <div className="head">
        <h1>Orders Page</h1>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Created At</th>

            <th colSpan={2}>Actions</th>
          </tr>

          {orders?.map((x) => (
            <tr key={x.id}>
              <td>#{shortenId(x.id)}</td>
              <td className={`status ${x.status}`}>{x.status}</td>
              <td>{x.created_at}</td>

              <td>
                <button onClick={() => handleClickStatus(x.id)}>
                  Change Status
                </button>
              </td>
              <td>
                <button onClick={() => handleClick(x.id)}>Go Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OrderDetailModal id={selectedOrder} detailModal={detailModal} />
      <OrderStatusModal
        order={selectedOrder}
        statusModal={statusModal}
        listOrders={listOrders}
      />
    </div>
  );
}
