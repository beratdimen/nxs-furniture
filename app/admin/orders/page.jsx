"use client";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { listAllOrders } from "@/api/category";
import { toast } from "sonner";
import OrderDetailModal from "@/components/detail-order-admin/page";
import OrderStatusModal from "@/components/order-status-modal";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const detailModal = useRef(null);
  const statusModal = useRef(null);

  const ordersPerPage = 5;

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

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

          {currentOrders?.map((x) => (
            <tr key={x.id}>
              <td>#{shortenId(x.id)}</td>
              <td className={`status ${x.status}`}>{x.status}</td>
              <td>
                {new Date(x.created_at).getDate().toString().padStart(2, "0")}/
                {(new Date(x.created_at).getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}
                /{new Date(x.created_at).getFullYear()}
              </td>

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

      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <OrderDetailModal id={selectedOrder} detailModal={detailModal} />
      <OrderStatusModal
        order={selectedOrder}
        statusModal={statusModal}
        listOrders={listOrders}
      />
    </div>
  );
}
