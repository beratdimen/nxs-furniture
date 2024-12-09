import { useState } from "react";
import "./style.css";
import DiscountSection from "../product/discount";
import DeliverySection from "../product/delivery";
import BankTable from "../product/payment";
import { MinusIcon, PlusIcon } from "@/helpers/icons";

const Accordion = ({ dizi }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="accordionContainer">
      <h1>Special Offers for the Product</h1>

      <div className="accordion">
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("detail")}
          >
            Product Features
          </button>
          {openSection === "detail" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "detail" && (
          <div className="accordion-content">
            <div className="productSpecs">
              <h2 className="specsTitle">Details:</h2>
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
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("offers")}
          >
            Special Offers for the Product
          </button>
          {openSection === "offers" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "offers" && (
          <div className="accordion-content">
            <DiscountSection />
          </div>
        )}
      </div>

      <div className="accordion">
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("delivery")}
          >
            Delivery and Installation
          </button>
          {openSection === "delivery" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "delivery" && (
          <div className="accordion-content">
            <DeliverySection />

            <p>
              This product is delivered by shipping. When the product is ready
              for shipment, our team will contact you to schedule the delivery
              during the week you are available.{" "}
              <a>Detailed Information {">"} </a>
            </p>
            <p>Delivery is free for orders of 30,000 TL and above.</p>
            <p>
              The product is delivered disassembled. All necessary parts along
              with the installation scheme are sent to make assembly easier.{" "}
              <a>Detailed Information {">"} </a>
            </p>
          </div>
        )}
      </div>

      <div className="accordion">
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("where-to-buy")}
          >
            Where Can I See It in a Showroom?
          </button>
          {openSection === "where-to-buy" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "where-to-buy" && (
          <div className="accordion-content">
            <p>
              ADANA Adana Real Boulevard, ANKARA Ankara Etlik Sales Point,
              Ankara Oran, Ankara Plevne Street Sales Point, Ankara Söğütözü,
              Istanbul Yolu Sales Point, ISTANBUL Bakırköy, Istanbul Esenyurt,
              Istanbul Pendik Homecity Outlet, ÇANAKKALE Çanakkale Sales Point,
              ÇORUM Çorum Sales Point, DIYARBAKIR Diyarbakir Sales Point, EDİRNE
              Edirne, ERZURUM Erzurum, ISPARTA Isparta, IZMIR İzmir Bornova
              Sales Point, İzmir-Bayraklı, İzmir-Karabağlar, KAHRAMANMARAŞ
              Kahramanmaraş Sales Point, KOCAELİ Kocaeli Outlet, MERSİN Mersin
              Erdemli Sales Point, RİZE Rize Sales Point, SAKARYA Sakarya Sales
              Point, SİVAS Sivas, TEKİRDAĞ Tekirdağ, Tekirdağ Çerkezköy, TRABZON
              Trabzon, ŞANLIURFA Urfa Sales Point, UŞAK Uşak, VAN Van Sales
              Point
            </p>
            <p>
              <a>
                Would you like to get to know our showrooms up close? {">"}{" "}
              </a>
            </p>
          </div>
        )}
      </div>

      <div className="accordion">
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("payment")}
          >
            Payment and Installment
          </button>
          {openSection === "payment" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "payment" && (
          <div className="accordion-content">
            <DeliverySection />

            <p>
              To learn more about our cancellation and return policies, please
              check the following article:
              <a>Cancellation and Return {">"} </a>
            </p>
            <p>
              This product comes with the Nexus Furniture warranty for 2 years,
              allowing you to use it with peace of mind.
            </p>

            <p>
              <a>Detailed Information {">"} </a>
            </p>
          </div>
        )}
      </div>

      <div className="accordion">
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("credit")}
          >
            Shopping Credit
          </button>

          {openSection === "credit" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "credit" && (
          <div className="accordion-content">
            <p>
              - Installment amounts and terms are calculated based on the listed
              product price. Any addition or removal of items in product sets
              will recalculate the final installment amount and terms at
              checkout.
            </p>
            <p>- Maximum term option is 36 months.</p>

            <BankTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
