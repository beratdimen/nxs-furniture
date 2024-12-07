import { DeliveryIcon } from "@/helpers/icons";
import "../style.css";

export default function DeliverySection() {
  return (
    <div className="delivery-section">
      <p className="delivery-title">
        <DeliveryIcon /> Hızlı Teslimat: 13-20 Aralık
      </p>
      <p className="delivery-subtitle">Teslimat ve Kurulum</p>
    </div>
  );
}
