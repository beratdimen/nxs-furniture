"use client";
import "./style.css";

import ProductItem from "../product-item";

export default function Categories({ title, products, isSearchPage = false }) {
  console.log("products :>> ", products);
  return (
    <div className="textureContainer">
      {isSearchPage ? "" : <h5> {title.toLowerCase()}</h5>}
      <h2>{isSearchPage && "Searched Term: " + title}</h2>
      <div className="productsGrid">
        {products?.map((x) => (
          <ProductItem key={x.id} product={x} />
        ))}
      </div>
    </div>
  );
}
