import "../style.css";

export default function DiscountSection() {
  return (
    <div className="discount-section">
      <div className="discount-card">
        <p className="title">
          15.000 TL ve üzeri Nexus Mobilya Koleksiyonları Alışverişinde %10
          İndirim!
        </p>
        <p className="price">
          Sepette: <span className="highlight">7.292 TL</span>
        </p>
      </div>
    </div>
  );
}
