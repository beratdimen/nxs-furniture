"use client";

import { searchProducts } from "@/api/category";
import Categories from "@/components/categories-card";
import { useEffect, useState } from "react";
import "./style.css";
export default function SearchPage({ searchParams }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const listProducts = async () => {
      const response = await searchProducts(searchParams.s);
      console.log("response :>> ", response);
      setProducts(response);
    };

    listProducts();
  }, [searchParams.s]);
  return (
    <div className="categoryContainer">
      {products.length == 0 ? (
        <div className="notProducts">
          <img
            className="gif"
            src="/img/Searching-but-not-found-and-empty-folder.gif"
            alt=""
          />

          <p>There is no product {searchParams.s} you are searching.</p>
        </div>
      ) : (
        <Categories
          title={searchParams.s}
          isSearchPage={true}
          products={products}
        />
      )}
    </div>
  );
}
