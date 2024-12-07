import { useState } from "react";
import "./style.css";

const Accordion = ({ dizi }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="accordionContainer">
      <h1>Ürüne Özel Fırsatlar</h1>

      <div className="accordion">
        <button
          className="accordion-btn"
          onClick={() => toggleSection("detail")}
        >
          Ürüne Özellikleri
        </button>
        {openSection === "detail" && (
          <div className="accordion-content">
            <div className="productSpecs">
              <h2 className="specsTitle">Detail:</h2>
              <div className="specsGrid">
                {dizi.map((detail) => (
                  <div key={detail.label} className="specItem">
                    <span className="specLabel">{detail.label}:</span>
                    <span className="specValue">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="accordion">
        <button
          className="accordion-btn"
          onClick={() => toggleSection("offers")}
        >
          Ürüne Özel Fırsatlar
        </button>
        {openSection === "offers" && (
          <div className="accordion-content">
            <p>
              15.000 TL ve üzeri Vivense Koleksiyonları Alışverişinde %10
              İndirim!
            </p>
            <p>Sepette 7.292 TL</p>
          </div>
        )}
      </div>

      <div className="accordion">
        <button
          className="accordion-btn"
          onClick={() => toggleSection("details")}
        >
          Ürün Özellikleri
        </button>
        {openSection === "details" && (
          <div className="accordion-content">
            <p>Ürünün detaylı özelliklerini buraya ekleyebilirsiniz.</p>
          </div>
        )}
      </div>

      <div className="accordion">
        <button
          className="accordion-btn"
          onClick={() => toggleSection("dimensions")}
        >
          Ürün Boyutları
        </button>
        {openSection === "dimensions" && (
          <div className="accordion-content">
            <p>Ürün boyutlarına dair açıklamalar burada olacak.</p>
          </div>
        )}
      </div>

      <div className="accordion">
        <button
          className="accordion-btn"
          onClick={() => toggleSection("delivery")}
        >
          Teslimat ve Kurulum
        </button>
        {openSection === "delivery" && (
          <div className="accordion-content">
            <p>Planlanan Teslimat: 13-20 Aralık</p>
            <p>
              Bu ürün nakliye ve teslimatla ilgili detaylı açıklamalara buradan
              ulaşabilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
