import Image from "next/image";
import "./style.css";
export default function PastOrder() {
  return (
    <div className="pastOrderContainer">
      <div className="card">
        <Image width={85} height={85} src={"/img/9.jpg"} />
        <div className="cardText">
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
  );
}
