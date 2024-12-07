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
      <h1>Ürüne Özel Fırsatlar</h1>

      <div className="accordion">
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("detail")}
          >
            Ürün Özellikleri
          </button>
          {openSection === "where-to-buy" ? <MinusIcon /> : <PlusIcon />}
        </div>
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
        <div className="accordion-div">
          <button
            className="accordion-btn"
            onClick={() => toggleSection("offers")}
          >
            Ürüne Özel Fırsatlar
          </button>
          {openSection === "where-to-buy" ? <MinusIcon /> : <PlusIcon />}
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
            Teslimat ve Kurulum
          </button>
          {openSection === "where-to-buy" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "delivery" && (
          <div className="accordion-content">
            <DeliverySection />

            <p>
              Bu ürün nakliyeyle teslim edilir. Ürün gönderime hazır olduğunda,
              ekibimiz seninle iletişime geçer ve müsait olduğun hafta için
              teslimatı planlar. <a>Detaylı bilgi {">"} </a>
            </p>
            <p>
              30.000 TL ve üzeri siparişlerde bu ürünün teslimatı ücretsizdir.
            </p>
            <p>
              Ürün demonte olarak teslim edilir. Kurulumunu kolayca yapabilmen
              için de ihtiyacın olan tüm parçalar kurulum şemasıyla birlikte
              gönderilir. <a>Detaylı bilgi {">"} </a>
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
            Hangi Showroomda Görebilirim?
          </button>
          {openSection === "where-to-buy" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "where-to-buy" && (
          <div className="accordion-content">
            <p>
              ADANA Adana Real Bulvarı, ANKARA Ankara Etlik Satış Noktası,
              Ankara Oran, Ankara Plevne Caddesi Satış Noktası, Ankara Söğütözü,
              İstanbul Yolu Satış Noktası, İSTANBUL Bakırköy, İstanbul Esenyurt,
              İstanbul Pendik Homecity Outlet, ÇANAKKALE Çanakkale Satış
              Noktası, ÇORUM Çorum Satış Noktası, DİYARBAKIR Diyarbakır Satış
              Noktası, EDİRNE Edirne, ERZURUM Erzurum, ISPARTA Isparta, İZMİR
              İzmir Bornova Satış Noktası, İzmir-Bayraklı, İzmir-Karabağlar,
              KAHRAMANMARAŞ Kahramanmaraş Satış Noktası, KOCAELİ Kocaeli Outlet,
              MERSİN Mersin Erdemli Satış Noktası, RİZE Rize Satış Noktası,
              SAKARYA Sakarya Satış Noktası, SİVAS Sivas, TEKİRDAĞ Tekirdağ,
              Tekirdağ Çerkezköy, TRABZON Trabzon, ŞANLIURFA Urfa Satış Noktası,
              UŞAK Uşak, VAN Van Satış Noktası
            </p>
            <p>
              <a>Showroomlarımızı yakından tanımak ister misin? {">"} </a>
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
            Ödeme ve Taksit
          </button>
          {openSection === "where-to-buy" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "payment" && (
          <div className="accordion-content">
            <DeliverySection />

            <p>
              İptal ve iade şartlarımız hakkında daha fazla bilgi almak için
              aşağıdaki makaleye göz atabilirsiniz:
              <a>İptal ve İade {">"} </a>
            </p>
            <p>
              Bu ürünü 2 yıl boyunca Vivense garantisi altında gönül
              rahatlığıyla kullanabilirsin.
            </p>

            <p>
              <a>Detaylı bilgi {">"} </a>
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
            Alışveriş Kredisi
          </button>

          {openSection === "where-to-buy" ? <MinusIcon /> : <PlusIcon />}
        </div>
        {openSection === "credit" && (
          <div className="accordion-content">
            <p>
              - Vade ve taksit tutarları ürünün listeleme fiyatına göre
              hesaplanmıştır. Takım ürünlerinde yapılacak ürün ekleme/çıkarma
              işlemleri sonrasında nihai taksit tutarı ve vade sepette yeniden
              hesaplanacaktır.
            </p>
            <p>- Maksimum vade seçeneği 36 Ay'dır.</p>

            <BankTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
