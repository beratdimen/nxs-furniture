import Image from "next/image";
import "./style.css";

export default function OrderReview() {
  return (
    <div className="reviewContainer">
      <h2>Order Summary</h2>
      <div className="orderContent">
        <p>Order No.: #12345</p>
        <p>Date: 28 Eylğl 2024</p>
        <p>Customer: Berat Dimen</p>
        <p>Email: berat@gmail.com</p>
      </div>

      <h3>Ürünler</h3>

      <div className="basketCard">
        <Image width={100} height={100} src={"/img/9.jpg"} />

        <div className="basketCardContent">
          <h4>Ürün Adı</h4>
          <p>Miktar: 1</p>
          <p>Birim Fiyat: 1500Tl</p>
          <p>Toplam: 15000</p>
        </div>
      </div>

      <h3>Fiyat Özeti</h3>
      <div className="summaryContent">
        <p>
          Ürünler Toplamı: <span>1500 TL</span>
        </p>

        <p>
          Kargo Ücreti: <span>1500 TL</span>
        </p>

        <p>
          İndirim: <span>1500 TL</span>
        </p>

        <p>
          KDV: <span>1500 TL</span>
        </p>

        <h6>
          Genel Toplam : <span>1500 TL</span>
        </h6>
      </div>
      <h3>Teslimat & Fatura Bilgileri</h3>

      <div className="deliveryInformation">
        <p>Teslimat Adresi: İstanbul ,Türkiye</p>
        <p>Kargo:Ali Kargo - Tahmini Teslim: 21 Ekim 2024</p>
        <p>Ödeme Yöntemi: Kredi Kartı</p>
      </div>
    </div>
  );
}
