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
      <Categories title={category} products={products} />
    </div>
  );
}
