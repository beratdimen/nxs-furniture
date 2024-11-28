"use client";
import "./style.css";

import ProductItem from "../product-item";

export default function Categories({ title, products }) {
  console.log("products :>> ", products);
  return (
    <div className="textureContainer">
      <h5>{title.toLowerCase()}</h5>
      <h2>NEW {title.toUpperCase()}</h2>
      <div className="productsGrid">
        {products?.map((x) => (
          <ProductItem key={x.id} product={x} />
        ))}
      </div>
    </div>
  );
}
