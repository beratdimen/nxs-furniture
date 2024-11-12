import Image from "next/image";
import "./style.css";
import { NextIvon, PrevIvon } from "@/helpers/icons";
export default function Detail() {
  const dizi = [
    { label: "Category", value: "Sofas" },
    { label: "Material", value: "Fabric" },
    { label: "Style", value: "Modern" },
    { label: "Color", value: "Beige" },
    { label: "Width", value: "266 cm" },
    { label: "Depth", value: "113 cm" },
    { label: "Height", value: "85 cm" },
    { label: "Seat Height", value: "45 cm" },
  ];
  return (
    <div className="detailContainer">
      <div className="productImages">
        <div className="mainImage">
          <Image
            src="/img/9.jpg"
            alt="SOFTBAY CHAISE LOUNGE"
            width={600}
            height={600}
          />
          <button className="navButton prev">
            <PrevIvon />
          </button>
          <button className="navButton next">
            <NextIvon />
          </button>
        </div>
        <div className="thumbnail-container">
          {[9, 10, 11].map((i) => (
            <div key={i} className="thumbnail">
              <Image
                src={`/img/${i}.jpg`}
                alt={`Thumbnail ${i}`}
                width={96}
                height={96}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="productDetails">
        <div className="productHeader">
          <h1 className="productTitle">Modular sofa SOFTBAY CHAISE LOUNGE</h1>
          <button className="favoriteButton">♡</button>
        </div>
        <div className="productPrice">
          <span className="price">$344</span>
          <span className="priceTag">Lowest price</span>
        </div>

        <div className="actionButtons">
          <button className="buyButton">Buy</button>
          <button className="downloadButton">Free Download</button>
        </div>

        <div className="infoCard">
          <button className="infoButton">Request Catalogue &gt;</button>
          <button className="infoButton">Request The Price List &gt;</button>
          <button className="infoButton">Where to Buy 📍</button>
        </div>

        <div className="productSpecs">
          <h2 className="specsTitle">Product Detail:</h2>
          <div className="specsGrid">
            {dizi.map((detail) => (
              <div key={detail.label} className="specItem">
                <span className="specLabel">{detail.label}</span>
                <span className="specValue">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
