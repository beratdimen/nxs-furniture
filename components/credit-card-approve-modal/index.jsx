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
          toast.error("Orders tablosuna eklerken hata:");
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
          toast.error("Order_items tablosuna eklerken hata");
        }

        if (!orderItemsError) {
          toast.success("Sipariş oluşturuldu ve ürünler başarıyla eklendi");
          closeCreditModal();
          setActiveStep(3);
          setOrderState({ ...orderState, orderId: orderId });
          const { error } = await supabase
            .from("basket")
            .delete()
            .match({ user_id: orderState?.user_id });
        }
      } catch (error) {
        toast.error("Sunucu hatası:", error);
        console.log("Sunucu hatası:", error);
      }
    } else {
      toast.error("Your Password is Wrong");
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
          <button className="closeButton">Kapat</button>
        </header>

        <main className="main">
          <p className="instruction">
            Kartınızı kullanarak 3D güvenlik ile alışverişinizi tamamlamak için
            lütfen cep telefonunuza gelen şifreyi aşağıdaki alana giriniz.
          </p>

          <div className="cardInfo">
            <img
              src="img/garanti.png"
              alt="Garanti BBVA"
              className="bankLogo"
            />
            <h3>3D SECURE ÖDEME DOĞRULAMA</h3>
            <div className="paymentDetails">
              <p>
                <strong>Tutar:</strong> ${totalPrice}
              </p>
              <p>
                <strong>Mağaza:</strong> Nexus Furniture
              </p>
              <p>
                <strong>Kart No:</strong>
                {formatCardNumber(cardDetails.cardNumber)}
              </p>
              <p>
                <strong>Tarih:</strong> {formatDate()}
              </p>
            </div>
          </div>

          <div className="verification">
            <p>
              Sonu <strong>XXXX</strong> ile biten telefon numaranıza gönderilen
              doğrulama (123456) şifresini giriniz.
            </p>
            <input
              type="text"
              placeholder="6 haneli şifreyi girin"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="submitButton" onClick={handleSubmit}>
              GÖNDER
            </button>
            <button className="newPasswordButton">YENİ ŞİFRE GÖNDER</button>
          </div>
        </main>
      </dialog>
    </>
  );
}
