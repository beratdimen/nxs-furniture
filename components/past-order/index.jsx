import Image from "next/image";
import "./style.css";
export default function PastOrder() {
  return (
    <div className="pastOrderContainer">
      <div className="status">
        <p>
          <span>●</span> delivered on june 26
        </p>
      </div>
      <div className="grid">
        <div className="card">
          <Image width={85} height={85} src={"/img/9.jpg"} alt="product" />
          <div className="cardText">
            <h4>Ürün Adı</h4>
            <h5>Tahmini Teslim</h5>
            <p>Saat aralığı</p>
          </div>
        </div>
        <div className="btn">
          <button>İptal Et</button>
          <button>Detay</button>
          <button>İade Et</button>
        </div>
      </div>
    </div>
  );
}
