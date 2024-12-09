import Image from "next/image";
import "./style.css";

export default function PastOrder() {
  return (
    <div className="pastOrderContainer">
      <div className="status">
        <p>
          <span>●</span> delivered on June 26
        </p>
      </div>
      <div className="grid">
        <div className="card">
          <Image width={85} height={85} src={"/img/9.jpg"} alt="product" />
          <div className="cardText">
            <h4>Product Name</h4>
            <h5>Estimated Delivery</h5>
            <p>Time Slot</p>
          </div>
        </div>
        <div className="btn">
          <button>Cancel</button>
          <button>Detail</button>
          <button>Return</button>
        </div>
      </div>
    </div>
  );
}
