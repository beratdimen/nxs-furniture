import {
  CustomerSatisfactionIcon,
  DeliverysIcon,
  FreeShipIcon,
  SecureShopIcon,
} from "@/helpers/icons";
import "./style.css";

export default function OrderKnowladge() {
  return (
    <div className="features">
      <div className="feature-item">
        <DeliverysIcon />
        <h3>Fast Delivery</h3>
        <p>
          Your orders are prepared and shipped in the shortest possible time.
        </p>
      </div>
      <div className="feature-item">
        <SecureShopIcon />
        <h3>100% Secure Shopping</h3>
        <p>
          Your information is safe with 256-bit SSL certification and 3D Secure
          payment.
        </p>
      </div>
      <div className="feature-item">
        <FreeShipIcon />
        <h3>Free Shipping</h3>
        <p>Enjoy free delivery across Turkey for all products!</p>
      </div>
      <div className="feature-item">
        <CustomerSatisfactionIcon />
        <h3>Customer Satisfaction</h3>
        <p>
          We are dedicated to providing 100% customer satisfaction with reliable
          service.
        </p>
      </div>
    </div>
  );
}
