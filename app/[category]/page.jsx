"use client";

import Categories from "@/components/categories-card";
import "./style.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listProductsForCategory } from "@/api/category";

export default function CategoriesPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const listProducts = async () => {
      const response = await listProductsForCategory(category);

      console.log("response :>> ", response);
      setProducts(response);
    };

    listProducts();
  }, [category]);

  return (
    <div className="categoryContainer">
      {products.length == 0 ? (
        <div className="notProducts">
          <img
            className="gif"
            src="/img/Searching-but-not-found-and-empty-folder.gif"
            alt=""
          />

          <p>Products İs Not Found</p>
        </div>
      ) : (
        <Categories title={category} products={products} />
      )}
    </div>
  );
}
