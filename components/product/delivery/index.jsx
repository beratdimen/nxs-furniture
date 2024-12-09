import { DeliveryIcon } from "@/helpers/icons";
import "../style.css";

export default function DeliverySection() {
  return (
    <div className="delivery-section">
      <p className="delivery-title">
        <DeliveryIcon /> Fast Delivery: December 13-20
      </p>
      <p className="delivery-subtitle">Delivery and Installation</p>
    </div>
  );
}
